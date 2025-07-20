# TinyPNG Image Optimizer

A Node.js command-line tool that compresses and optionally resizes `.jpg`, `.jpeg`, and `.png` images and more using the [TinyPNG API](https://tinypng.com/developers). Supports recursive folder scanning and flexible configuration options.

## ✨ Features

- 🔍 **Recursive Scanning**: Automatically finds all images in folders and subfolders
- 📐 **Smart Resizing**: Optional image resizing before compression using macOS `sips`
- 🗜️ **TinyPNG Compression**: Leverages TinyPNG's advanced compression algorithms
- 💾 **Flexible Output**: Replace original files or output to a separate `minified/` folder
- ⚙️ **Configurable**: Customize behavior via environment variables
- 📁 **Custom Target Folders**: Process any directory on your system

## 🔧 Requirements

- **Node.js**: Version 20 or higher
- **Operating System**: macOS (uses `sips` command for resizing)
- **TinyPNG API Key**: Get one free at [tinypng.com/developers](https://tinypng.com/developers)

## 📦 Installation

1. **Clone or download** this project
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up configuration**:
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env`** and add your TinyPNG API key:
   ```bash
   TINIFY_API_KEY=your_real_api_key_here
   ```

## ⚙️ Configuration

Edit the `.env` file to customize behavior:

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `TINIFY_API_KEY` | Your TinyPNG API key | **Required** | `abc123def456` |
| `TARGET_FOLDER` | Absolute path to process | Current directory | `/Users/you/Pictures` |
| `FILE_EXTENSIONS` | File types to include | `png\|jpg` | `png\|jpg\|jpeg` |
| `INCLUDE_SUB_FOLDER` | Process subfolders recursively | `true` | `false` |
| `REPLACE_EXISTING_FILE` | Overwrite original files | `true` | `false` |
| `SHOULD_RESIZE` | Resize before compressing | `true` | `false` |
| `RESIZE_MAX_WIDTH` | Maximum width in pixels | `1920` | `1200` |
| `RESIZE_MAX_HEIGHT` | Maximum height in pixels | `null` | `1080` |

### Configuration Examples

**Process a specific folder without overwriting:**
```env
TARGET_FOLDER=/Users/you/Desktop/photos
REPLACE_EXISTING_FILE=false
```

**Only compress, don't resize:**
```env
SHOULD_RESIZE=false
```

**Include JPEG files:**
```env
FILE_EXTENSIONS=png|jpg|jpeg
```

## 🚀 Usage

Run the optimizer:

```bash
npm run tinify
```

The script will:

1. Scan the target folder for supported image files
2. Optionally resize images to specified dimensions
3. Compress images using TinyPNG API
4. Either replace originals or save to `minified/` folder

## 📁 Output Structure

**When `REPLACE_EXISTING_FILE=true` (default):**

- Original files are overwritten with compressed versions

**When `REPLACE_EXISTING_FILE=false`:**

- Compressed images are saved to a `minified/` folder
- Original files remain unchanged

## 🎯 Example Output

```
Compressing /path/to/image1.png → /path/to/image1.png… done
Compressing /path/to/image2.jpg → /path/to/image2.jpg… done
Compressing /path/to/subfolder/image3.png → /path/to/subfolder/image3.png… done
```

## 📝 Notes

- **API Limits**: Free TinyPNG accounts have a monthly limit of 500 compressions
- **macOS Only**: Image resizing uses the `sips` command, which is macOS-specific
- **File Safety**: Always backup important images before running with `REPLACE_EXISTING_FILE=true`
- **Performance**: Images are processed sequentially to respect API rate limits

## 🔗 Links

- [TinyPNG API Documentation](https://tinypng.com/developers)
- [Get your TinyPNG API Key](https://tinypng.com/developers)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
