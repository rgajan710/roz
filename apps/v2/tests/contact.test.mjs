import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "app", "api", "contact", "route.ts"), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;

function loadRoute({ env = {}, send = async () => ({ error: null }), log = () => {} } = {}) {
  const routeModule = { exports: {} };
  class Resend {
    constructor(key) { this.emails = { send: (message) => send(message, key) }; }
  }
  vm.runInNewContext(compiled, {
    module: routeModule,
    exports: routeModule.exports,
    process: { env },
    console: { error: log },
    require(name) {
      if (name === "next/server") return { NextResponse: { json: (body, init) => Response.json(body, init) } };
      if (name === "resend") return { Resend };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return routeModule.exports.POST;
}

function request(body) {
  return new Request("http://localhost/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
}

const valid = { name: "Alex", email: "alex@example.com", message: "We would like a new website.", service: "Website design", budget: "Not sure yet" };

test("rejects invalid input and explicitly reports missing email configuration", async () => {
  const post = loadRoute();
  const invalid = await post(request({ ...valid, email: "invalid" }));
  assert.equal(invalid.status, 400);
  const unconfigured = await post(request(valid));
  assert.equal(unconfigured.status, 503);
  assert.match((await unconfigured.json()).error, /email us directly/i);
});

test("sends a validated enquiry to the configured recipient", async () => {
  let sent;
  const post = loadRoute({
    env: { RESEND_API_KEY: "test-key", CONTACT_FROM_EMAIL: "sender@example.com", CONTACT_TO_EMAIL: "team@example.com" },
    send: async (message, key) => { sent = { message, key }; return { error: null }; },
  });
  const response = await post(request(valid));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(sent.key, "test-key");
  assert.equal(sent.message.to, "team@example.com");
  assert.equal(sent.message.replyTo, valid.email);
  assert.match(sent.message.text, /We would like a new website/);
});

test("reports and logs delivery errors", async () => {
  let logged = false;
  const post = loadRoute({
    env: { RESEND_API_KEY: "test-key", CONTACT_FROM_EMAIL: "sender@example.com" },
    send: async () => ({ error: { message: "delivery failed" } }),
    log: () => { logged = true; },
  });
  const response = await post(request(valid));
  assert.equal(response.status, 502);
  assert.equal(logged, true);
  assert.match((await response.json()).error, /email us directly/i);
});
