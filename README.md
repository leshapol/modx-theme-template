# MODX Front-End Template Project

## 📦 Overview
This repository contains a front-end development structure for **MODX template building** using **Gulp**, **SCSS**, and **BrowserSync**.  
It supports **SweetCSS**, **MinifyX**, and modular **HTML assembly** from chunks (`@@include`).

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
- Builds `index.html` from `/html/index.html`
- Opens it automatically in the browser via BrowserSync
- Watches all SCSS, JS, and HTML changes in real-time

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
| `npm run dev` | Builds all assets, runs BrowserSync, and watches for changes |
| `npm run build` | Builds all assets and compiles the HTML for preview |
| `npm run build:css` | Compiles only SCSS into `/assets/build/style.css` |

---

## 🧩 HTML Assembly Logic

- **Source:** `html/index.html`  
- **Includes:** via `@@include('chanks/head.html')` etc.  
- **Output:** compiled `index.html` at project root  
- **BrowserSync:** automatically refreshes the browser on save  

Original files inside `/html/` are never overwritten.

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

- Built with `gulp-file-include`, `gulp-sass`, and `browser-sync`
- SCSS structured with BEM naming and modular imports
- Fully compatible with MODX workflow via SweetCSS and MinifyX
