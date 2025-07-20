# TinyPNG Image Optimizer

This project compresses and optionally resizes `.jpg` and `.png` images using the [TinyPNG API](https://tinypng.com/developers). You can run it from the command line and configure it via constants in the script.

## ✅ Features

- Recursively scans folders for `.jpg` and `.png` files
- Optionally resizes images to a max width before compression
- Sends files to TinyPNG for compression
- Replaces original files or outputs to a `minified/` folder

---

## 🔧 Setup

Make sure you have [Node.js v20](https://nodejs.org/en) installed.

Install dependencies:

```bash
npm install
```

## 🚀 Usage

```bash
npm run tinify
```
