"""Build the portfolio's one-page PDF resume from verified profile details."""

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "VinodhKumar_Resume_Professional.pdf"
SITE_COPY = ROOT / "frontend" / "public" / "VinodhKumar_Resume.pdf"
FONT_DIR = Path("/System/Library/Fonts/Supplemental")

pdfmetrics.registerFont(TTFont("ArialCustom", str(FONT_DIR / "Arial.ttf")))
pdfmetrics.registerFont(TTFont("ArialCustom-Bold", str(FONT_DIR / "Arial Bold.ttf")))
pdfmetrics.registerFontFamily(
    "ArialCustom", normal="ArialCustom", bold="ArialCustom-Bold"
)

INK = colors.HexColor("#192B3D")
MUTED = colors.HexColor("#4B5B6A")
ACCENT = colors.HexColor("#116C82")
RULE = colors.HexColor("#CBD7DE")

styles = {
    "name": ParagraphStyle(
        "Name", fontName="ArialCustom-Bold", fontSize=20.5, leading=23,
        textColor=INK, alignment=TA_CENTER, spaceAfter=3,
    ),
    "tagline": ParagraphStyle(
        "Tagline", fontName="ArialCustom-Bold", fontSize=9.6, leading=12,
        textColor=ACCENT, alignment=TA_CENTER, spaceAfter=4,
    ),
    "contact": ParagraphStyle(
        "Contact", fontName="ArialCustom", fontSize=8.5, leading=11.2,
        textColor=MUTED, alignment=TA_CENTER,
    ),
    "section": ParagraphStyle(
        "Section", fontName="ArialCustom-Bold", fontSize=9.2, leading=11,
        textColor=ACCENT, spaceBefore=9, spaceAfter=4.2,
    ),
    "body": ParagraphStyle(
        "Body", fontName="ArialCustom", fontSize=8.55, leading=11.25,
        textColor=INK, spaceAfter=2.2,
    ),
    "bullet": ParagraphStyle(
        "Bullet", fontName="ArialCustom", fontSize=8.45, leading=11.0,
        textColor=INK, leftIndent=11, firstLineIndent=-9, spaceAfter=3,
    ),
    "job": ParagraphStyle(
        "Job", fontName="ArialCustom-Bold", fontSize=9.4, leading=11.5,
        textColor=INK,
    ),
    "meta": ParagraphStyle(
        "Meta", fontName="ArialCustom", fontSize=8.3, leading=10.5,
        textColor=MUTED,
    ),
    "skill_label": ParagraphStyle(
        "SkillLabel", fontName="ArialCustom-Bold", fontSize=8.4, leading=10.8,
        textColor=INK,
    ),
    "skill_value": ParagraphStyle(
        "SkillValue", fontName="ArialCustom", fontSize=8.35, leading=10.8,
        textColor=INK,
    ),
    "cert": ParagraphStyle(
        "Certification", fontName="ArialCustom", fontSize=8.35, leading=10.7,
        textColor=INK,
    ),
}

story = []


def section(title):
    story.append(Paragraph(escape(title.upper()), styles["section"]))
    story.append(HRFlowable(width="100%", thickness=0.6, color=RULE, spaceAfter=5))


def bullet(text):
    return Paragraph("&#8226;  " + escape(text), styles["bullet"])


def job(title, company, location, dates, bullets):
    header = Table(
        [[Paragraph(escape(title), styles["job"]), Paragraph(escape(dates), styles["meta"])]],
        colWidths=[408, 97],
    )
    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(KeepTogether([
        header,
        Paragraph(f"{escape(company)}  |  {escape(location)}", styles["meta"]),
        Spacer(1, 4),
        bullet(bullets[0]),
    ]))
    story.extend(bullet(item) for item in bullets[1:])
    story.append(Spacer(1, 4))


story.append(Paragraph("VINODH KUMAR R", styles["name"]))
story.append(Paragraph("CLOUD &amp; AI ENGINEER  |  AWS DATA ENGINEERING  |  APPLIED AI", styles["tagline"]))
story.append(Paragraph("Bengaluru, India  |  +91 99444 38823  |  vinodhkumar142002@gmail.com", styles["contact"]))
story.append(Paragraph("linkedin.com/in/vinodhkumar-r  |  vinodhkumar.netlify.app", styles["contact"]))
story.append(Spacer(1, 4))

section("Professional Summary")
story.append(Paragraph(
    "Cloud and AI engineer with two years of enterprise experience delivering AWS and GCP data pipelines, "
    "security analytics, retrieval-augmented generation, and LLM fine-tuning. At Oracle, built telemetry tooling "
    "and fine-tuned Qwen3 for SQL optimization; at Deloitte, delivered OCSF-aligned AWS Security Lake pipelines, "
    "Bedrock retrieval, and automated remediation.",
    styles["body"],
))

section("Professional Experience")
job(
    "Associate Advanced Services Engineer", "Oracle", "Bengaluru, India", "May 2026 - Present",
    [
        "Fine-tuned Qwen3-1.7B with LoRA/PEFT on 5,000 Oracle SQL training and evaluation examples spanning execution plans, schemas, indexes, joins, subqueries, and rewrite safety; merged and quantized the model to Ollama-compatible GGUF.",
        "Validated generated SQL syntax and compared optimizer plan costs; 40% of evaluated rewrites had a lower estimated plan cost than the original queries.",
        "Built a Python telemetry analytics platform with parsers for AIX, Oracle Database, network, storage, and application data; delivered ingestion pipelines, forecasts, REST APIs, and vulnerability risk scoring with remediation recommendations.",
        "Developed an OCI VCN flow-log validator that matches traffic to microsegmentation NSG rules by CIDR/IP, protocol, and port range; enriched flows and generated compliance reports.",
    ],
)
job(
    "Analyst - Cyber Enterprise Security (Cloud Security Engineer)",
    "Deloitte", "Bengaluru, India", "Oct 2024 - Apr 2026",
    [
        "Engineered AWS Glue and Lambda pipelines ingesting findings from AWS Config, Inspector, Prisma Cloud, and Qualys; normalized events to OCSF and stored them in AWS Security Lake for Athena analysis.",
        "Implemented enterprise RAG with Amazon Bedrock Knowledge Bases and OpenSearch vector search; integrated retrieval context into NVIDIA Morpheus threat-alert summaries and resolved ControlMessage bottlenecks.",
        "Built an Athena-backed React and Tailwind CSS dashboard for centralized asset, vulnerability, and ITSM visibility.",
        "Built a GCP security data pipeline with Pub/Sub, Cloud Functions, and BigQuery; supported Terraform deployments and configured VPCs, subnets, and Cloud NAT.",
        "Automated Windows EC2 vulnerability remediation with AWS Systems Manager runbooks, standardizing fleet patch workflows.",
        "Migrated assurance and runtime policies from AquaSec to Prisma Cloud against CIS benchmarks; developed Bash regression tests.",
    ],
)

section("Technical Skills")
skill_rows = [
    ("Cloud & data", "AWS: Glue, Lambda, Security Lake, S3, Athena, EC2, Systems Manager, IAM, CloudWatch, EventBridge; GCP: Pub/Sub, Cloud Functions, BigQuery, VPC; OCI, Azure"),
    ("AI & analytics", "Qwen3, LoRA/PEFT, PyTorch, Hugging Face Transformers, GGUF, Ollama, Amazon Bedrock, OpenSearch, RAG, forecasting"),
    ("Engineering & security", "Python, SQL, Bash, JavaScript, React, Tailwind CSS, REST APIs, Terraform, Docker, Git; Prisma Cloud, AquaSec, Snyk, Qualys, OCSF"),
]
for label, value in skill_rows:
    row = Table([[Paragraph(escape(label), styles["skill_label"]), Paragraph(escape(value), styles["skill_value"])]], colWidths=[105, 400])
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    story.append(row)

section("Certifications")
certifications = [
    "AWS Certified Machine Learning - Specialty",
    "Google Associate Cloud Engineer",
    "AWS Certified AI Practitioner",
    "Microsoft Certified: Azure Administrator Associate",
    "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
    "Prisma Certified Cloud Security Engineer (PCCSE)",
    "Snyk Certified Implementation Professional",
]
cert_rows = []
for index in range(0, len(certifications), 2):
    left = Paragraph(escape(certifications[index]), styles["cert"])
    right = Paragraph(escape(certifications[index + 1]), styles["cert"]) if index + 1 < len(certifications) else ""
    cert_rows.append([left, right])
cert_table = Table(cert_rows, colWidths=[252.5, 252.5])
cert_table.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
]))
story.append(cert_table)

section("Education")
education = Table(
    [[Paragraph("<b>Bachelor's Degree in Computer Science</b>  |  SNS College of Technology  |  CGPA 9.37/10", styles["body"]), Paragraph("2020 - 2024", styles["meta"])]],
    colWidths=[408, 97],
)
education.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ALIGN", (1, 0), (1, 0), "RIGHT"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
]))
story.append(education)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(
    str(OUTPUT), pagesize=A4, rightMargin=45, leftMargin=45,
    topMargin=31, bottomMargin=31, title="Vinodh Kumar R - Resume",
    author="Vinodh Kumar R", pageCompression=1,
)
doc.build(story)
SITE_COPY.write_bytes(OUTPUT.read_bytes())
print(OUTPUT)
print(SITE_COPY)
