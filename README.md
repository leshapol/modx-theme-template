# MODX HTML Template Project

## 📦 Overview
This repository contains a ready-to-deploy structure for **MODX template development** with SCSS and JS build pipeline via **Gulp**, supporting **SweetCSS**, **MinifyX**, and **HTML assembly** from chunks.

## 🚀 Quick Start
1. Install dependencies
```bash
npm install
```
2. Start local development
```bash
npm run dev
```
3. Build production-ready files
```bash
npm run build
```

## 🧱 Project Structure
```
html/
 ├── templates/
 ├── chanks/
 ├── contentblocks/
assets/
 ├── scss/
 ├── js/
 ├── build/
build/
```

## ⚙️ Integration with MODX
Move `/html/templates`, `/html/chanks`, `/html/contentblocks`, `/assets/`, and `/config/` to MODX project.
SweetCSS and MinifyX handle SCSS and JS on the server.

## 🧰 Gulp Commands
| Command | Description |
|----------|-------------|
| `npm run dev` | Watches SCSS, JS, and HTML for changes |
| `npm run build` | Builds all assets and compiles preview HTML |
