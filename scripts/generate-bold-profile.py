from pathlib import Path
from io import BytesIO
import subprocess
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches, Pt

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "roz - Company Profile - Teal.pptx"
PAPER = "F8F8F3"
INK = "20241F"
CORAL = "E85F4C"
TEAL = "087F83"
GREY = "777B74"
WHITE = "FFFFFF"
SANS = "Arial"
DISPLAY = "Impact"
SERIF = "Georgia"

deck = Presentation()
deck.slide_width = Inches(13.333333)
deck.slide_height = Inches(7.5)
deck.core_properties.title = "roz | Company Profile"
deck.core_properties.author = "roz"
deck.core_properties.subject = "Independent digital studio company profile"


def color(value):
    return RGBColor.from_string(value)


def shape(slide, kind, x, y, width, height, fill, rotation=0):
    item = slide.shapes.add_shape(kind, Inches(x), Inches(y), Inches(width), Inches(height))
    item.fill.solid()
    item.fill.fore_color.rgb = color(fill)
    item.line.fill.background()
    item.shadow.inherit = False
    item.rotation = rotation
    return item


def rect(slide, x, y, width, height, fill):
    return shape(slide, MSO_SHAPE.RECTANGLE, x, y, width, height, fill)


def text(slide, value, x, y, width, height, size, fill=INK, font=SANS, bold=False, italic=False, align=PP_ALIGN.LEFT, valign=MSO_ANCHOR.TOP):
    item = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(width), Inches(height))
    frame = item.text_frame
    frame.clear()
    frame.word_wrap = True
    frame.margin_left = frame.margin_right = 0
    frame.margin_top = frame.margin_bottom = 0
    frame.vertical_anchor = valign
    for index, line in enumerate(value.split("\n")):
        paragraph = frame.paragraphs[0] if index == 0 else frame.add_paragraph()
        paragraph.text = line
        paragraph.alignment = align
        paragraph.font.name = font
        paragraph.font.size = Pt(size)
        paragraph.font.bold = bold
        paragraph.font.italic = italic
        paragraph.font.color.rgb = color(fill)
        paragraph.space_after = Pt(0)
    return item


def slide(fill):
    page = deck.slides.add_slide(deck.slide_layouts[6])
    page.background.fill.solid()
    page.background.fill.fore_color.rgb = color(fill)
    return page


def top(page, section, number, dark=False):
    foreground = PAPER if dark else INK
    text(page, "roz.", 0.48, 0.3, 0.75, 0.32, 19, foreground, SANS, True)
    text(page, section.upper(), 1.57, 0.38, 7.4, 0.2, 9, foreground, SANS, True)
    text(page, f"{number:02d} / 11", 11.98, 0.38, 0.85, 0.2, 9, foreground, SANS, True, align=PP_ALIGN.RIGHT)


def badge(page, x, y, size, fill, label, label_color=INK):
    shape(page, MSO_SHAPE.STAR_16_POINT, x, y, size, size, fill)
    text(page, label, x + size * .14, y + size * .3, size * .72, size * .45, 10, label_color, SANS, True, align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE)


def svg_image(path):
    result = subprocess.run(
        ["node", "-e", "require('sharp')(process.argv[1]).resize({width:1800}).png().toBuffer().then(data => process.stdout.write(data))", str(path)],
        cwd=ROOT, check=True, capture_output=True,
    )
    return BytesIO(result.stdout)


page = slide(PAPER)
text(page, "INDEPENDENT DIGITAL STUDIO", 0.57, 0.43, 6, 0.25, 10, INK, SANS, True)
text(page, "COMPANY PROFILE / 2026", 9.0, 0.43, 3.75, 0.25, 10, INK, SANS, True, align=PP_ALIGN.RIGHT)
text(page, "roz", 0.38, 0.82, 9.3, 3.3, 220, INK, SANS, True)
shape(page, MSO_SHAPE.OVAL, 4.97, 3.15, 0.5, 0.5, CORAL)
badge(page, 10.36, 1.18, 2.14, TEAL, "GOOD\nTHINGS\nAHEAD", PAPER)
text(page, "THOUGHTFUL WEBSITES.\nREMARKABLE RESULTS.", 0.63, 4.65, 10.9, 1.05, 29, INK, DISPLAY)
rect(page, 0, 6.46, 13.333, 1.04, TEAL)
text(page, "GOOD IDEAS DESERVE GREAT WEBSITES.", 0.58, 6.69, 11.85, 0.56, 32, PAPER, DISPLAY)
text(page, "01", 12.35, 6.79, 0.45, 0.27, 11, PAPER, SANS, True, align=PP_ALIGN.RIGHT)

page = slide(PAPER)
rect(page, 0, 0, 5.2, 7.5, "EFEFE8")
top(page, "Who we are", 2)
text(page, "WHO\nARE\nWE", 0.5, 1.0, 4.2, 5.1, 100, TEAL, DISPLAY)
text(page, "?", 3.16, 2.02, 1.9, 2.8, 151, CORAL, DISPLAY)
text(page, "GOOD THINKING.\nBOLD DESIGN.\nREAL PURPOSE.", 5.85, 1.3, 6.8, 2.12, 49, INK, DISPLAY)
rect(page, 5.9, 4.16, 0.11, 1.68, CORAL)
text(page, "roz is an independent digital studio making thoughtful websites for good businesses.", 6.25, 4.12, 5.83, 0.9, 20, INK, SANS, True)
text(page, "Strategy, design and development, working together to make your business feel unmistakably you.", 6.25, 5.24, 5.7, 0.88, 16, INK)
text(page, "MADE WITH THOUGHT, FROM START TO FINISH.", 5.91, 6.81, 6.5, 0.25, 10, INK, SANS, True)

page = slide(PAPER)
top(page, "Our point of view", 3)
text(page, "GOOD IDEAS", 0.48, 0.92, 9.2, 1.04, 71, INK, DISPLAY)
text(page, "DESERVE", 0.48, 1.88, 9.2, 1.04, 71, CORAL, DISPLAY)
text(page, "GREAT", 0.48, 2.84, 9.2, 1.04, 71, INK, DISPLAY)
text(page, "WEBSITES.", 0.48, 3.8, 9.9, 1.04, 71, CORAL, DISPLAY)
rect(page, 9.42, 1.2, 3.45, 4.82, TEAL)
text(page, "THE\nROZ\nAPPROACH", 9.7, 1.55, 2.8, 1.55, 31, PAPER, DISPLAY)
text(page, "A clear idea. A distinctive identity. An experience that works beautifully across screens.", 9.72, 4.0, 2.72, 1.58, 17, PAPER)
text(page, "STRATEGY  /  DESIGN  /  DEVELOPMENT", 0.57, 6.65, 8.5, 0.27, 11, INK, SANS, True)

page = slide(PAPER)
top(page, "What we do / Part 01", 4)
text(page, "THE GOOD\nSTUFF.", 0.53, 1.15, 4.8, 2.1, 66, CORAL, DISPLAY)
text(page, "Thoughtful from the first spark to the finishing touches.", 0.59, 4.15, 4.0, 1.0, 19, INK, SERIF, italic=True)
badge(page, 0.72, 5.64, 1.05, CORAL, "+", PAPER)
service_rows = [
    ("01", "BRAND & STRATEGY", "Positioning and creative direction that make your story clear."),
    ("02", "WEBSITE DESIGN", "Distinctive digital experiences designed for real people."),
    ("03", "DEVELOPMENT", "Responsive, accessible websites built with care."),
]
for index, (number, title, description) in enumerate(service_rows):
    y = 1.13 + index * 1.86
    rect(page, 5.42, y, 7.34, 0.025, GREY)
    text(page, number, 5.48, y + .24, .45, .27, 11, CORAL, SANS, True)
    text(page, title, 6.08, y + .13, 6.55, .55, 32, INK, DISPLAY)
    text(page, description, 6.11, y + .82, 6.08, .73, 16, GREY)

page = slide(PAPER)
top(page, "What we do / Part 02", 5)
rect(page, 0, 1.0, 5.0, 5.9, "EFEFE8")
text(page, "MADE\nTO\nMOVE.", 0.5, 1.32, 4.0, 3.25, 76, TEAL, DISPLAY)
text(page, "Websites that look the part and work hard for your business.", 0.55, 5.21, 3.75, 1.02, 17, INK, SERIF, italic=True)
service_rows = [
    ("04", "E-COMMERCE", "A smoother path from browsing to buying."),
    ("05", "SEO & CONTENT", "Help the right people find you and connect with your story."),
    ("06", "CARE & SUPPORT", "Updates and improvements for whatever comes next."),
]
for index, (number, title, description) in enumerate(service_rows):
    y = 1.26 + index * 1.82
    rect(page, 5.55, y, 7.1, .025, INK)
    text(page, number, 5.58, y + .23, .48, .25, 11, CORAL, SANS, True)
    text(page, title, 6.23, y + .12, 6.2, .55, 33, INK, DISPLAY)
    text(page, description, 6.25, y + .82, 5.85, .65, 16, INK)

page = slide(PAPER)
top(page, "The process", 6)
text(page, "GOOD THINGS", 0.5, 0.95, 8.6, 1.0, 65, INK, DISPLAY)
text(page, "TAKE TEAMWORK.", 0.5, 1.88, 10.9, 1.05, 65, CORAL, DISPLAY)
text(page, "NO DISAPPEARING ACTS. JUST A CLEAR, COLLABORATIVE PROCESS.", 0.56, 3.09, 11.9, .3, 11, INK, SANS, True)
steps = [
    ("01", "TALK", "Get to know the business and the brief."),
    ("02", "THINK", "Find the direction and visual world."),
    ("03", "MAKE", "Design and build, together."),
    ("04", "LAUNCH", "Test, refine and go live."),
    ("05", "GROW", "Support the next chapter."),
]
for index, (number, label, description) in enumerate(steps):
    x = 0.5 + index * 2.54
    rect(page, x, 3.85, 2.35, 2.64, TEAL if index % 2 == 0 else "EFEFE8")
    foreground = PAPER if index % 2 == 0 else INK
    text(page, number, x + .18, 4.04, 1.0, .6, 31, PAPER if index % 2 == 0 else CORAL, DISPLAY)
    text(page, label, x + .18, 4.75, 2.0, .5, 27, foreground, DISPLAY)
    text(page, description, x + .18, 5.47, 1.97, .72, 13, foreground)

page = slide(PAPER)
top(page, "Selected client work", 7)
text(page, "SCENT", 0.47, 0.98, 5.0, 1.0, 70, INK, DISPLAY)
text(page, "VAULT", 0.47, 1.9, 5.0, 1.0, 70, CORAL, DISPLAY)
text(page, "A SEARCHABLE VISUAL CATALOGUE FOR AN INDEPENDENT FRAGRANCE BUSINESS.", 0.55, 3.29, 4.15, 1.12, 19, INK, SANS, True)
rect(page, 0.56, 5.04, 4.1, .025, CORAL)
text(page, "447", 0.52, 5.24, 1.65, .72, 44, CORAL, DISPLAY)
text(page, "68", 2.68, 5.24, 1.35, .72, 44, CORAL, DISPLAY)
text(page, "FRAGRANCES", .56, 6.16, 1.8, .25, 10, INK, SANS, True)
text(page, "PERFUME HOUSES", 2.72, 6.16, 2.3, .25, 10, INK, SANS, True)
rect(page, 5.24, 1.07, 7.53, 5.63, TEAL)
page.shapes.add_picture(str(ROOT / "public/work/scent-vault/cover.png"), Inches(5.47), Inches(1.3), width=Inches(7.07))
text(page, "REAL CLIENT PROJECT  /  LIVE CATALOGUE", 5.47, 6.43, 6.6, .23, 10, PAPER, SANS, True)

page = slide(PAPER)
top(page, "Scent Vault / The experience", 8)
rect(page, 0, 1.0, 8.1, 6.05, CORAL)
page.shapes.add_picture(str(ROOT / "public/work/scent-vault/detail.png"), Inches(.42), Inches(1.25), width=Inches(7.25))
text(page, "SEARCH.\nFILTER.\nDISCOVER.", 8.56, 1.34, 4.25, 2.58, 54, INK, DISPLAY)
text(page, "An editorial catalogue that brings the collection together and makes it easy to explore.", 8.61, 4.35, 3.95, 1.2, 17, INK)
text(page, "PRODUCT IMAGERY  /  BOOKMARKS\nHTML  /  CSS  /  JAVASCRIPT  /  NETLIFY", 8.62, 6.25, 4.0, .48, 9, CORAL, SANS, True)

page = slide(PAPER)
top(page, "Explorations / Concept work", 9)
text(page, "MORE GOOD IDEAS.", .5, .88, 10.1, .9, 59, INK, DISPLAY)
text(page, "FICTIONAL CONCEPTS  /  NOT CLIENT PROJECTS", .54, 1.91, 8.0, .24, 10, CORAL, SANS, True)
page.shapes.add_picture(svg_image(ROOT / "public/work/stillwell/cover.svg"), Inches(.52), Inches(2.4), width=Inches(5.85))
page.shapes.add_picture(svg_image(ROOT / "public/work/northstar/cover.svg"), Inches(6.96), Inches(2.4), width=Inches(5.85))
text(page, "STILLWELL", .56, 6.78, 4.7, .37, 19, INK, DISPLAY)
text(page, "NORTHSTAR", 7.0, 6.78, 4.7, .37, 19, INK, DISPLAY)

page = slide(PAPER)
top(page, "Client words", 10)
text(page, "GOOD\nWORK.\nGOOD\nPEOPLE.", 0.48, 1.08, 4.5, 4.55, 72, INK, DISPLAY)
rect(page, 4.96, 1.15, .06, 5.12, CORAL)
text(page, '"', 5.38, .82, 1.0, 1.3, 90, CORAL, SERIF)
text(page, "Work done was quick and easy, process was very effective, very professional group of people working together to provide me a great experience for my business", 5.52, 2.02, 6.9, 3.14, 25, INK, SERIF)
text(page, "VIDHUSHI SHARMA", 5.56, 5.64, 6.1, .3, 14, INK, SANS, True)
text(page, "SCENT VAULT  /  CLIENT", 5.56, 6.05, 6.1, .25, 10, INK, SANS, True)

page = slide(PAPER)
top(page, "Let's work together", 11)
text(page, "LET'S MAKE", 0.49, 1.05, 10.7, 1.05, 76, INK, DISPLAY)
text(page, "SOMETHING", 0.49, 2.05, 11.7, 1.05, 76, CORAL, DISPLAY)
text(page, "GOOD.", 0.49, 3.05, 8.1, 1.05, 76, INK, DISPLAY)
badge(page, 10.58, 3.55, 1.95, TEAL, "GOOD\nTHINGS\nAHEAD", PAPER)
rect(page, .56, 5.0, 8.8, .035, INK)
text(page, "Have an idea or a question? Let's start a conversation.", .57, 5.35, 8.15, .65, 20, INK, SERIF)
text(page, "CONTACT DETAILS TO BE CONFIRMED", .58, 6.73, 6.8, .22, 10, INK, SANS, True)
text(page, "roz.", 11.27, 6.42, 1.5, .52, 30, INK, SANS, True, align=PP_ALIGN.RIGHT)

deck.save(OUTPUT)
print(f"Created {OUTPUT} ({len(deck.slides)} slides)")