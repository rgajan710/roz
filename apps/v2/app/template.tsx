"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { motionConfig } from "@/lib/motion";

export default function Template({ children }: { children: ReactNode }) {
  return <motion.div className="page-transition" initial={false} animate={{ opacity: 1 }} transition={{ duration: motionConfig.pageDuration, ease: motionConfig.ease }}>{children}</motion.div>;
}
