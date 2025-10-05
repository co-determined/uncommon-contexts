# UncommonContexts - Enhanced Reading Experience Guide

Your website now has coffee-table-book-quality reading experience. Here's everything that's new:

## 🎯 Live Site
https://co-determined.github.io/uncommon-contexts/

## ✨ New Features You Can Use

### 1. Sidenotes (Tufte-style margin notes)
Instead of footnotes that break reading flow, use sidenotes that appear in the margin:

```markdown
This is main text<span class="sidenote-number"></span><span class="sidenote">This appears in the margin, keeping related info spatially close.</span> and reading continues smoothly.
```

### 2. Pull Quotes
For emphasis that breaks the column:

```markdown
<div class="pull-quote">
The best design is felt as an absence—the absence of confusion.
</div>
```

### 3. Drop Caps
First paragraph of any post automatically gets an illuminated first letter.

### 4. Focus Mode
Press 'f' while reading - everything fades except the current paragraph. Perfect for deep reading.

### 5. Keyboard Navigation
- `j` / `k` - Scroll down/up
- `g` / `G` - Jump to top/bottom  
- `f` - Toggle focus mode
- `d` - Toggle dark mode
- `?` - Show keyboard shortcuts
- `ESC` - Close any overlay

### 6. Smart Typography
The site automatically converts:
- "Straight quotes" → "Smart quotes"
- -- → — (em dashes)
- ... → … (ellipsis)
- 10x10 → 10×10 (multiplication sign)

### 7. Image Lightbox
Click any image to view fullscreen. Click again or press ESC to close.

### 8. Reading Progress
- Subtle bar at top shows reading progress
- Estimated reading time on each post
- Smooth scrolling between sections

### 9. Dark Mode
- Automatic based on system preference
- Or press 'd' to toggle manually
- "Reading by candlelight" aesthetic with warm tones

### 10. Performance Features
- Links prefetch on hover for instant navigation
- Progressive image loading with blur-up effect
- Optimized font loading
- Print stylesheet for beautiful PDFs

## 📝 Writing in Prose.io

### Adding a New Post
1. Go to: http://prose.io/#co-determined/uncommon-contexts
2. Navigate to `content/posts/`
3. Click "New File"
4. Name it: `YYYY-MM-DD-title.md` (e.g., `2025-10-05-consciousness-notes.md`)

### Post Template
```markdown
---
title: "Your Essay Title"
date: 2025-10-05
author: Skylar Deture
tags: ["consciousness", "AI", "philosophy"]
description: "Brief description for SEO and previews"
---

Your opening paragraph automatically gets a drop cap.

## Section Heading

Regular paragraph with a sidenote<span class="sidenote-number"></span><span class="sidenote">This appears in the margin on desktop, inline on mobile.</span> that doesn't interrupt flow.

<div class="pull-quote">
A powerful statement that deserves emphasis.
</div>

More content continues...
```

### Publishing Workflow
1. Write in prose.io
2. Click "Save" (commits to GitHub)
3. GitHub Actions automatically builds and deploys
4. Live in ~1 minute at https://co-determined.github.io/uncommon-contexts/

## 🎨 Design Philosophy

The design follows three principles:

**Jobs (Simplicity)**: Interface disappears into content
**Tufte (Information Density)**: Maximum content, minimum chrome  
**Wright (Organic Architecture)**: Design grows from content naturally

The warm academic aesthetic (cream, burgundy, sage) creates a "special collections reading room at golden hour" feeling. Typography uses Source Serif for that Gwern-inspired scholarly elegance.

## 🛠 Technical Architecture

```
/css/
  main.css             - Base structure
  gwern-inspired.css   - Typography foundation
  theme.css            - Color palette
  refinements.css      - Reading enhancements
  ui-elements.css      - Interactive components

/js/
  reading-experience.js - All interactive features

/_layouts/
  base.njk             - Main template with all enhancements
```

## 🚀 What Makes This Special

1. **Invisible Excellence**: The design recedes completely. Readers remember ideas, not interface.

2. **Spatial Intelligence**: Related information stays close (sidenotes vs footnotes).

3. **Reading Rhythm**: Mathematical spacing creates natural reading flow.

4. **Progressive Enhancement**: Works without JavaScript, enhanced with it.

5. **Responsive Philosophy**: Not just mobile-friendly but reading-optimized for every screen.

## 📚 Example Posts to Try

1. View the design philosophy essay showing all features:
   `/posts/2025-10-04-design-philosophy/`

2. Your welcome post is still there:
   `/posts/2025-10-04-welcome/`

## 💡 Tips for Best Results

- Keep paragraphs focused (3-5 sentences)
- Use headings to create natural breaks
- Add sidenotes for asides and citations
- Let the design handle the beauty—focus on ideas
- Trust the typography—don't override fonts or colors

## 🎯 The Result

A website where:
- Reading feels effortless
- Ideas take center stage
- Design serves content invisibly
- Every detail has been considered
- Nothing unnecessary remains

This is your platform for AI consciousness research that defies categorization. Write freely—the design will make it beautiful.

---

*"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs*

*This reading experience IS how it works.*