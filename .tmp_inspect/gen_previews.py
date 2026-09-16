"""One-off utility: reorganize uploaded certificate files and generate optimized previews.

- Moves the 10 single-certificate PDFs into public/certificates/pdf/ with clean names.
- Renders page 1 of each PDF (200 dpi), trims near-white margins, downscales to a
  1500px long edge and saves an optimized JPEG into public/certificates/previews/.
- The sideways "Navigating AI Tools" page is rendered in both rotations for visual check.
"""
import os
import shutil

import pymupdf
from PIL import Image

ROOT = os.path.join("public", "certificates")
PDF_DIR = os.path.join(ROOT, "pdf")
PREV_DIR = os.path.join(ROOT, "previews")
TMP = ".tmp_inspect"
os.makedirs(PDF_DIR, exist_ok=True)
os.makedirs(PREV_DIR, exist_ok=True)
os.makedirs(TMP, exist_ok=True)


def autocrop(img: Image.Image, thresh: int = 240, pad: int = 12) -> Image.Image:
    """Trim near-white margins so previews show the certificate, not the paper margins."""
    g = img.convert("L")
    bw = g.point(lambda p: 255 if p < thresh else 0)
    bbox = bw.getbbox()
    if not bbox:
        return img
    x0, y0, x1, y1 = bbox
    return img.crop(
        (max(0, x0 - pad), max(0, y0 - pad), min(img.width, x1 + pad), min(img.height, y1 + pad))
    )


def long_edge(img: Image.Image, edge: int = 1500) -> Image.Image:
    w, h = img.size
    m = max(w, h)
    if m <= edge:
        return img
    r = edge / m
    return img.resize((round(w * r), round(h * r)), Image.LANCZOS)


def render_page(src: str, page: int = 0, dpi: int = 200) -> Image.Image:
    doc = pymupdf.open(src)
    pix = doc[page].get_pixmap(dpi=dpi)
    png = os.path.join(TMP, "_render.png")
    pix.save(png)
    doc.close()
    return Image.open(png).convert("RGB")


def save_jpg(img: Image.Image, path: str, q: int = 88) -> None:
    img.save(path, "JPEG", quality=q, optimize=True, progressive=True)


PDF_JOBS = [
    ("Machine Learning Using Python.pdf", "ibm-machine-learning-using-python"),
    ("Exploring Data Transformation with Google Cloud.pdf", "google-cloud-exploring-data-transformation"),
    ("AWS Application Migration Service (AWS-MGN).pdf", "aws-application-migration-service"),
    ("be10x.pdf", "be10x-ai-tools-chatgpt-workshop"),
    ("CertificateOfCompletion_What Is Generative AI.pdf", "linkedin-what-is-generative-ai"),
    ("Linkedin Learning.pdf", "linkedin-top-ai-questions-answered"),
    ("GenAI Powered Data Analytics Job Simulation.pdf", "forage-tata-genai-data-analytics"),
    ("Deloitte Data Analytics Job Simulation.pdf", "forage-deloitte-data-analytics"),
    ("The Linux foudation.pdf", "linux-foundation-github-open-standards"),
]

for src, base in PDF_JOBS:
    s = os.path.join(ROOT, src)
    img = long_edge(autocrop(render_page(s)))
    save_jpg(img, os.path.join(PREV_DIR, base + ".jpg"))
    shutil.move(s, os.path.join(PDF_DIR, base + ".pdf"))
    print("done:", base, img.size)

# --- Sideways IBM "Navigating AI Tools" page: render both rotations for visual check ---
nav_src = os.path.join(ROOT, "Navigating AI Tools A Selection Framework.pdf")
img0 = render_page(nav_src)
cw = autocrop(img0.transpose(Image.Transpose.ROTATE_270))   # rotate 90 deg clockwise
ccw = autocrop(img0.transpose(Image.Transpose.ROTATE_90))   # rotate 90 deg counter-clockwise
save_jpg(long_edge(cw), os.path.join(PREV_DIR, "ibm-navigating-ai-tools-selection-framework.jpg"))
save_jpg(cw.resize((600, round(600 * cw.height / cw.width)), Image.LANCZOS), os.path.join(TMP, "nav_cw_check.jpg"))
save_jpg(ccw.resize((600, round(600 * ccw.height / ccw.width)), Image.LANCZOS), os.path.join(TMP, "nav_ccw_check.jpg"))
shutil.move(nav_src, os.path.join(PDF_DIR, "ibm-navigating-ai-tools-selection-framework.pdf"))
print("navigating cw:", cw.size, "ccw:", ccw.size)

# --- IBM "Exploring Artificial Intelligence" (already a JPG upload) ---
j = os.path.join(ROOT, "IBM SkillsBuild Exploring Artificial Intelligence.jpg")
im = Image.open(j)
print("IBM JPG original:", im.size, im.mode)
shutil.copy2(j, os.path.join(PREV_DIR, "ibm-exploring-artificial-intelligence.jpg"))
chk = im.convert("RGB")
save_jpg(chk.resize((600, round(600 * chk.height / chk.width)), Image.LANCZOS), os.path.join(TMP, "ibm_jpg_check.jpg"))

print("\nPDF originals:", sorted(os.listdir(PDF_DIR)))
print("\nPreviews:")
total = 0
for f in sorted(os.listdir(PREV_DIR)):
    sz = os.path.getsize(os.path.join(PREV_DIR, f))
    total += sz
    print(f"  {f}  {sz/1024:.0f} KB")
print(f"  TOTAL: {total/1024/1024:.2f} MB")
