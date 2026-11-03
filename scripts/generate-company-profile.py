from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches, Pt


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "roz - Company Profile.pptx"
PAPER = "F8F8F3"
INK = "20241F"
MUTED = "656B63"
LINE = "D7DAD0"
CORAL = "E85F4C"
LIME = "DCE99A"
WHITE = "FFFFFF"
SOFT = "EFF0E9"
SANS = "DM Sans"
DISPLAY = "Georgia"

presentation = Presentation()
presentation.slide_width = Inches(13.333333)
presentation.slide_height = Inches(7.5)
presentation.core_properties.title = "roz | Company Profile"
presentation.core_properties.subject = "A company profile for an independent digital studio"
presentation.core_properties.author = "roz"


def color(value):
    return RGBColor.from_string(value)


def box(slide, x, y, width, height, fill, line=None):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(width), Inches(height))
    shape.fill.solid()
    shape.fill.fore_color.rgb = color(fill)
    shape.line.fill.background() if line is None else None
    if line:
        shape.line.color.rgb = color(line)
    return shape


def text(slide, value, x, y, width, height, size=16, fill=INK, font=SANS, bold=False, italic=False, align=PP_ALIGN.LEFT, valign=MSO_ANCHOR.TOP):
    shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(width), Inches(height))
    frame = shape.text_frame
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
    return shape


def slide(background=PAPER):
    page = presentation.slides.add_slide(presentation.slide_layouts[6])
    page.background.fill.solid()
    page.background.fill.fore_color.rgb = color(background)
    return page


def footer(page, number, dark=False):
    foreground = PAPER if dark else INK
    rule = "50574D" if dark else LINE
    box(page, 0.62, 7.05, 12.09, 0.012, rule)
    text(page, "roz.", 0.62, 7.13, 0.9, 0.22, size=11, fill=foreground, bold=True)
    text(page, "COMPANY PROFILE", 1.65, 7.14, 2.8, 0.18, size=8, fill=foreground, bold=True)
    text(page, f"{number:02d}", 12.1, 7.12, 0.6, 0.2, size=10, fill=foreground, bold=True, align=PP_ALIGN.RIGHT)


def kicker(page, label, dark=False):
    text(page, label, 0.64, 0.48, 9, 0.24, size=10, fill=LIME if dark else CORAL, bold=True)


page = slide(INK)
text(page, "INDEPENDENT DIGITAL STUDIO  /  COMPANY PROFILE", 0.72, 0.62, 9, 0.25, size=10, fill=LIME, bold=True)
text(page, "roz", 0.62, 1.34, 7.3, 2.1, size=115, fill=PAPER, bold=True)
text(page, ".", 2.75, 1.34, 0.65, 2.1, size=115, fill=CORAL, bold=True)
box(page, 8.82, 1.45, 3.8, 0.035, LIME)
text(page, "GOOD IDEAS\nDESERVE GREAT\nWEBSITES.", 8.82, 1.73, 3.8, 1.55, size=20, fill=PAPER, bold=True)
text(page, "Thoughtful websites.\nRemarkable results.", 0.72, 4.65, 8.6, 1.1, size=33, fill=PAPER, font=DISPLAY)
text(page, "MADE WITH THOUGHT, FROM START TO FINISH.", 0.73, 6.42, 8, 0.25, size=10, fill=LIME, bold=True)
footer(page, 1, True)

page = slide()
kicker(page, "01  /  WHO WE ARE")
text(page, "Good ideas deserve\ngreat websites.", 0.64, 1.12, 8.0, 1.65, size=46, font=DISPLAY)
box(page, 9.02, 1.13, 3.65, 4.92, LIME)
text(page, "GOOD WORK,\nGOOD PEOPLE.", 9.36, 1.52, 2.95, 1.15, size=24, bold=True)
text(page, "A little more thought\nin every detail.", 9.36, 4.6, 2.95, 0.86, size=17, font=DISPLAY, italic=True)
text(page, "roz is an independent digital studio making thoughtful websites for good businesses.", 0.67, 3.35, 7.3, 1.0, size=24, bold=True)
text(page, "We bring strategy, design and development together to create digital experiences that look the part, work hard and feel unmistakably you.", 0.67, 4.75, 7.0, 1.15, size=17, fill=MUTED)
footer(page, 2)

page = slide()
kicker(page, "02  /  WHAT GUIDES US")
text(page, "Thoughtful by design.", 0.64, 1.05, 11.6, 0.78, size=42, font=DISPLAY)
text(page, "A clear idea, carefully made and ready for what comes next.", 0.67, 1.98, 10.9, 0.5, size=18, fill=MUTED)
principles = [
    ("01", "Clarity", "Make the message easy to understand and the next step easy to find."),
    ("02", "Character", "Build an experience that feels distinctive to the business behind it."),
    ("03", "Usability", "Design for real people, across screens, with accessibility in mind."),
    ("04", "Partnership", "Work collaboratively, from the first conversation through launch and beyond."),
]
for index, (number, title, description) in enumerate(principles):
    x = 0.66 + index * 3.1
    box(page, x, 3.02, 2.75, 0.025, CORAL if index == 0 else LINE)
    text(page, number, x, 3.25, 0.5, 0.25, size=10, fill=CORAL, bold=True)
    text(page, title, x, 3.78, 2.75, 0.5, size=23, bold=True)
    text(page, description, x, 4.55, 2.7, 1.3, size=15, fill=MUTED)
footer(page, 3)

page = slide(INK)
kicker(page, "03  /  OUR SERVICES", True)
text(page, "Big picture.\nLittle details.", 0.64, 1.05, 7.8, 1.55, size=45, fill=PAPER, font=DISPLAY)
text(page, "From the first spark to the finishing touches.", 8.52, 1.36, 3.8, 0.8, size=18, fill="C1C6BB")
services = [
    ("01", "Brand & strategy", "Positioning and creative direction."),
    ("02", "Website design", "Distinctive, intuitive digital experiences."),
    ("03", "Development", "Responsive, accessible websites."),
    ("04", "E-commerce", "A smoother path from browsing to buying."),
    ("05", "SEO & content", "Help the right people find you."),
    ("06", "Care & support", "Updates and improvements after launch."),
]
for index, (number, title, description) in enumerate(services):
    column, row = index % 3, index // 3
    x, y = 0.67 + column * 4.18, 3.05 + row * 1.63
    box(page, x, y, 3.72, 0.015, "50574D")
    text(page, number, x, y + 0.16, 0.5, 0.22, size=10, fill=LIME, bold=True)
    text(page, title, x, y + 0.5, 3.75, 0.35, size=20, fill=PAPER, bold=True)
    text(page, description, x, y + 0.95, 3.75, 0.45, size=13, fill="C1C6BB")
footer(page, 4, True)

page = slide()
kicker(page, "04  /  WHAT WE MAKE")
text(page, "Built around your business.", 0.64, 1.05, 11.9, 0.78, size=40, font=DISPLAY)
offerings = [
    ("01", "A digital home", "A considered website that brings your story, services and identity together."),
    ("02", "A better storefront", "E-commerce experiences that make exploring and purchasing feel straightforward."),
    ("03", "Room to grow", "Content tools, search foundations and ongoing improvements shaped around your needs."),
]
for index, (number, title, description) in enumerate(offerings):
    y = 2.35 + index * 1.22
    box(page, 0.67, y, 11.99, 0.015, LINE)
    text(page, number, 0.67, y + 0.24, 0.55, 0.28, size=11, fill=CORAL, bold=True)
    text(page, title, 1.5, y + 0.2, 4.3, 0.45, size=23, bold=True)
    text(page, description, 6.62, y + 0.18, 5.8, 0.7, size=16, fill=MUTED)
footer(page, 5)

page = slide()
kicker(page, "05  /  OUR PROCESS")
text(page, "Good things take teamwork.", 0.64, 1.05, 12, 0.75, size=40, font=DISPLAY)
text(page, "A clear, collaborative process from first conversation to launch.", 0.67, 1.95, 10.8, 0.42, size=17, fill=MUTED)
steps = [
    ("01", "A good conversation", "Listen, ask questions and understand the business."),
    ("02", "A clear direction", "Turn the ideas into a thoughtful strategy and visual world."),
    ("03", "The exciting bit", "Design and build, sharing progress and making space for input."),
    ("04", "Ready for the world", "Test, refine and launch with a considered handover."),
    ("05", "Here for what's next", "Continue with maintenance and improvements as needed."),
]
for index, (number, title, description) in enumerate(steps):
    y = 2.67 + index * 0.75
    box(page, 0.67, y, 11.99, 0.012, LINE)
    text(page, number, 0.68, y + 0.19, 0.55, 0.25, size=11, fill=CORAL, bold=True)
    text(page, title, 1.52, y + 0.14, 4.1, 0.32, size=17, bold=True)
    text(page, description, 6.1, y + 0.14, 6.3, 0.44, size=14, fill=MUTED)
footer(page, 6)

page = slide()
kicker(page, "06  /  SELECTED CLIENT WORK")
text(page, "Scent Vault", 0.64, 1.05, 5.2, 0.75, size=44, font=DISPLAY)
text(page, "A searchable visual catalogue for an independent fragrance business.", 0.68, 2.02, 4.6, 1.0, size=20, bold=True)
text(page, "Designed around visual discovery, the catalogue brings a large fragrance collection together in a responsive, organized experience.", 0.68, 3.35, 4.55, 1.25, size=16, fill=MUTED)
box(page, 0.68, 5.31, 4.42, 0.015, LINE)
text(page, "447 FRAGRANCES  /  68 HOUSES", 0.68, 5.57, 4.7, 0.35, size=12, fill=CORAL, bold=True)
text(page, "LIVE CATALOGUE  /  CLIENT PROJECT", 0.68, 6.1, 4.7, 0.25, size=10, bold=True)
page.shapes.add_picture(str(ROOT / "public/work/scent-vault/cover.png"), Inches(5.72), Inches(1.35), width=Inches(6.96))
footer(page, 7)

page = slide(SOFT)
kicker(page, "07  /  SCENT VAULT IN DETAIL")
text(page, "Made for discovery.", 0.64, 1.05, 7.5, 0.72, size=42, font=DISPLAY)
page.shapes.add_picture(str(ROOT / "public/work/scent-vault/detail.png"), Inches(0.67), Inches(2.03), width=Inches(6.65))
text(page, "THE SOLUTION", 8.25, 2.12, 3.9, 0.25, size=10, fill=CORAL, bold=True)
text(page, "Explore the collection, your way.", 8.25, 2.57, 4.25, 0.85, size=25, bold=True)
text(page, "Search and category filters make the catalogue easier to browse, while product imagery and bookmarks support visual discovery.", 8.25, 3.77, 4.15, 1.45, size=16, fill=MUTED)
text(page, "HTML  /  CSS  /  JAVASCRIPT  /  NETLIFY", 8.25, 5.77, 4.2, 0.4, size=10, bold=True)
footer(page, 8)

page = slide(LIME)
kicker(page, "08  /  KIND WORDS")
text(page, "Good work.\nGood people.", 0.64, 1.05, 5.2, 1.4, size=40, font=DISPLAY)
text(page, '"', 6.21, 0.98, 1.0, 1.4, size=85, fill=CORAL, font=DISPLAY)
text(page, "Work done was quick and easy, process was very effective, very professional group of people working together to provide me a great experience for my business", 6.35, 2.25, 5.75, 2.9, size=23, font=DISPLAY)
box(page, 6.35, 5.55, 5.75, 0.015, INK)
text(page, "VIDHUSHI SHARMA", 6.35, 5.78, 4.8, 0.3, size=12, bold=True)
text(page, "SCENT VAULT  /  CLIENT", 6.35, 6.13, 4.8, 0.25, size=10, fill=MUTED, bold=True)
footer(page, 9)

page = slide(INK)
kicker(page, "09  /  LET'S WORK TOGETHER", True)
text(page, "Let's make\nsomething good.", 0.64, 1.22, 10.5, 2.1, size=53, fill=PAPER, font=DISPLAY)
box(page, 0.7, 4.13, 1.1, 0.04, CORAL)
text(page, "Have an idea or a question?\nLet's start a conversation.", 0.7, 4.55, 7.5, 1.0, size=22, fill=PAPER)
text(page, "roz.", 10.52, 4.82, 2.0, 0.9, size=44, fill=LIME, bold=True, align=PP_ALIGN.RIGHT)
text(page, "Contact details to be confirmed.", 0.72, 6.49, 6.5, 0.25, size=10, fill="C1C6BB")
footer(page, 10, True)

presentation.save(OUTPUT)
print(f"Created {OUTPUT} ({len(presentation.slides)} slides)")