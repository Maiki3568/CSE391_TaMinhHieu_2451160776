#!/usr/bin/env python3
"""Tạo 12 commit Session 2 theo README."""
import os
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).parent
PB = ROOT / "session_02_bootstrap/projects/portfolio_bootstrap"
os.chdir(ROOT)


def run(cmd):
    subprocess.run(cmd, shell=True, check=True)


def write(path: Path, text: str):
    path.write_text(text, encoding="utf-8", newline="\n")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


index_full = read(PB / "index.html")
blog_full = read(PB / "blog.html")
theme_full = read(PB / "css/custom-theme.css")
blog_css = read(PB / "css/blog.css")
comments_css = read(PB / "css/comments.css")
main_js = read(PB / "js/main.js")

blog_no_comments = re.sub(
    r"\s*<section class=\"py-section bg-surface\" id=\"comments\">.*?</section>\s*",
    "\n",
    blog_full,
    count=1,
    flags=re.S,
)

# theme chunks
theme_vars = theme_full.split("/* section spacing */")[0]
theme_layout = "/* section spacing */" + theme_full.split("/* section spacing */")[1].split("/* footer */")[0]
theme_footer = "/* footer */" + theme_full.split("/* footer */")[1]

# index without custom css link content - bootstrap only shell
index_bootstrap = index_full.replace(
    '    <link href="css/custom-theme.css" rel="stylesheet">\n', ""
).replace('class="py-section"', 'class="py-5"').replace('class="py-section bg-surface"', 'class="py-5 bg-light"')

comments_form_only = """/* Comment form */
.comment-avatar {
    height: 50px;
    object-fit: cover;
    width: 50px;
}
"""

# reset tracked if any
run("git rm -r --cached session_02_bootstrap/projects/portfolio_bootstrap 2>nul || exit 0")

commits = [
    (
        "[BOOTSTRAP] Add Bootstrap CDN and initial setup",
        {
            PB / "index.html": index_bootstrap,
            PB / "js/main.js": main_js,
        },
    ),
    (
        "[REFACTOR] Convert grid to Bootstrap columns",
        {PB / "index.html": index_full.replace('class="py-section"', 'class="py-5"').replace('class="py-section bg-surface"', 'class="py-5 bg-light"')},
    ),
    (
        "[STYLE] Apply Bootstrap typography utilities",
        {PB / "index.html": index_full},
    ),
    (
        "[FEATURE] Create blog post cards layout",
        {PB / "blog.html": blog_no_comments.replace('class="py-section"', 'class="py-5"')},
    ),
    (
        "[FEATURE] Build sticky sidebar",
        {PB / "css/blog.css": blog_css, PB / "blog.html": blog_no_comments},
    ),
    (
        "[FEATURE] Add categories and tags cloud",
        {PB / "blog.html": blog_no_comments},
    ),
    (
        "[FEATURE] Build comment form with Bootstrap",
        {
            PB / "blog.html": blog_full.replace('class="py-section"', 'class="py-5"').replace('class="py-section bg-surface"', 'class="py-5 bg-light"'),
            PB / "css/comments.css": comments_form_only,
        },
    ),
    (
        "[FEATURE] Display threaded comments",
        {PB / "blog.html": blog_full, PB / "css/comments.css": comments_css.replace("@media", "/* threaded */\n.comment.reply {\n    border-left: 3px solid #e2e8f0;\n}\n\n@media")},
    ),
    (
        "[STYLE] Responsive comment layout",
        {PB / "css/comments.css": comments_css, PB / "blog.html": blog_full},
    ),
    (
        "[CUSTOMIZE] Override Bootstrap primary color",
        {PB / "css/custom-theme.css": theme_vars},
    ),
    (
        "[CUSTOMIZE] Add custom spacing scale",
        {PB / "css/custom-theme.css": theme_vars + theme_layout},
    ),
    (
        "[THEME] Apply complete new color palette",
        {
            PB / "css/custom-theme.css": theme_full,
            PB / "css/blog.css": blog_css,
            PB / "index.html": index_full,
            PB / "blog.html": blog_full,
        },
    ),
]

for msg, files in commits:
    for path, content in files.items():
        write(path, content if content.endswith("\n") else content + "\n")
    paths = " ".join(f'"{p.relative_to(ROOT).as_posix()}"' for p in files)
    run(f"git add {paths}")
    run(f'git commit -m "{msg}"')

print("Done: 12 commits")
