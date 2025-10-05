# README.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **WeChat Official Account Markdown Editor** - a Vue.js 3 web application that converts Markdown text into WeChat-formatted rich text. The tool provides real-time preview and copy functionality specifically designed for WeChat Official Account publishing.

## Development Commands

```bash
# Start development server (runs on port 3000, auto-opens browser)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture Overview

### Core Components
- **MarkdownEditor.vue**: Main editor component with split-pane layout (input/preview)
- **markdownConverter.js**: Custom Markdown-to-HTML converter with WeChat-specific styling
- **clipboard.js**: Rich text clipboard utility supporting both modern and legacy browsers
- **style.css**: Global WeChat-specific CSS styles including custom styled components

### Key Technical Details

**Markdown Processing Pipeline:**
1. Raw Markdown input → Custom marked.js renderer with inline styles
2. Links automatically converted to footnotes for WeChat compatibility
3. Code blocks get line numbers and dark theme styling
4. All styling applied as inline CSS (required for WeChat)

**Theme System:**
The app includes 4 built-in themes with distinct styling approaches:
- `default` - WeChat-optimized with green accents and macOS-style code blocks
- `spring` - Clean, modern styling
- `juejin` - Gray theme inspired by Juejin platform
- `github` - GitHub-style markdown rendering

Each theme applies different colors, typography, and formatting while maintaining WeChat compatibility.

**Custom Styled Components:**
The app supports several custom HTML components that can be directly embedded in Markdown:
- `<div class="highlight-box">` - Green recommendation boxes with emoji support
- `<div class="info-box">` - Blue information boxes
- `<div class="warning-box">` - Yellow warning boxes
- `<div class="success-box">` - Green success boxes
- `<div class="code-block">` - Professional dark-themed code blocks with titles

**Clipboard Strategy:**
- Primary: Modern Clipboard API with rich text support
- Fallback: document.execCommand for older browsers
- Preserves HTML formatting for direct paste into WeChat editor

### File Structure Context

```
src/
├── components/
│   └── MarkdownEditor.vue     # Main UI component
├── utils/
│   ├── markdownConverter.js   # Core conversion logic
│   └── clipboard.js           # Copy functionality
├── style.css                  # WeChat-optimized global styles
├── App.vue                    # Root component
└── main.js                    # Entry point
```

## Styling System

The application uses a **dual styling approach**:

1. **Inline Styles** (in markdownConverter.js): Applied during Markdown conversion for WeChat compatibility
2. **CSS Classes** (in style.css): For preview rendering and custom components

All colors, fonts, and spacing are optimized for WeChat's rendering engine. The `.wx-content` class provides the base WeChat styling context.

## Development Notes

**Technology Stack:**
- Vue.js 3 with Composition API
- Vite 4.3.0 for build tooling
- marked.js 5.1.0 for Markdown parsing
- highlight.js 11.11.1 for syntax highlighting

**When modifying the Markdown converter:**
- All styles must be inline (WeChat strips external CSS)
- Test link footnote generation with multiple links
- Verify code block line numbering works correctly
- Maintain theme compatibility across all 4 themes

**When adding new styled components:**
- Add CSS classes to style.css with `.wx-content` prefix
- Ensure components work in both preview and copied output
- Test mobile responsiveness (WeChat is primarily mobile)

**When modifying the editor UI:**
- Maintain the split-pane layout for usability
- Test clipboard functionality across browsers
- Ensure toolbar buttons provide clear visual feedback

## WeChat Specific Constraints

- External CSS links are stripped - all styling must be inline
- JavaScript is not executed - output must be pure HTML
- Font choices are limited to system fonts
- Images must be uploaded separately to WeChat's media library
- Link handling is restricted - footnotes are the recommended approach
