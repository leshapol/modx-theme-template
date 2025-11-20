# MODX Front-End Template Project

## 📦 Overview
This repository contains a front-end development structure for **MODX template building** using **Gulp** and **SCSS**.  
It supports **SweetCSS**, **MinifyX**, and modular **HTML assembly** from chunks (`@@include`), although HTML compilation and BrowserSync are disabled for day-to-day MODX work.

The setup allows you to develop locally, preview live changes, and later move all files into MODX templates and ContentBlocks.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start local development
```bash
npm run dev
```

- Compiles SCSS → `/assets/build/style.css`
- Combines JS → `/assets/build/main.js`
- Watches SCSS and JS files for changes (refresh your MODX preview manually)
- Skips HTML assembly and BrowserSync (templates now live directly in MODX)

### 3. Build production-ready files
```bash
npm run build
```

---

## 🧱 Project Structure

```
html/
 ├── index.html            # Source HTML with @@include directives
 ├── chanks/               # Header, footer, meta, reusable elements
 └── contentblocks/        # Section-based layout blocks

assets/
 ├── scss/                 # SCSS files (BEM + modular structure)
 ├── js/                   # JS modules
 └── build/                # Compiled CSS and JS files

index.html                 # Compiled result for local preview
gulpfile.js                # Gulp configuration
package.json               # Scripts and dependencies
.gitignore
README.md
```

---

## ⚙️ Integration with MODX

When development is finished:

1. Move `/html/chanks/` and `/html/contentblocks/` into MODX chunks and ContentBlocks.  
2. SCSS and JS remain in `/assets/` — these will be handled by **SweetCSS** (for config-based SCSS variables) and **MinifyX** (for merging/minifying).  
3. The compiled `/index.html` is **only for local preview** — not used in production.

---

## 🧰 Gulp Commands

| Command | Description |
|----------|-------------|
| `npm run dev` | Builds CSS/JS and watches those sources (BrowserSync disabled) |
| `npm run build` | Builds CSS/JS only; HTML compilation is commented out |
| `npm run build:css` | Compiles only SCSS into `/assets/build/style.css` |

---

## 🧩 HTML Assembly Logic

- **Source:** `html/index.html`  
- **Includes:** via `@@include('chanks/head.html')` etc.  
- **Output:** compiled `index.html` at project root (**task disabled by default; re-enable the commented `html` task in `gulpfile.js` if you still need a static preview**)  
- **BrowserSync:** disabled while developing directly inside MODX  

Original files inside `/html/` are never overwritten; they now serve as references for MODX chunks/content blocks.

---

## 🧾 .gitignore Example

```gitignore
node_modules/
package-lock.json

assets/build/
index.html   # Compiled preview file, not needed in repo

.vscode/
.idea/
.DS_Store
Thumbs.db
*.log
.env
```

---

## 🧠 Notes

- Built with `gulp-sass`; `gulp-file-include` is available but commented out, and `browser-sync` is intentionally disabled
- SCSS structured with BEM naming and modular imports
- Fully compatible with MODX workflow via SweetCSS and MinifyX
