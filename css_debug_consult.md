# CSS Rendering Mystery - External Consult Request

## The Problem
We have a GitHub Pages site where CSS changes deploy successfully but don't render in any browser. This has persisted through multiple debugging attempts.

## Site Details
- URL: https://co-determined.github.io/uncommon-contexts/
- Repository: https://github.com/co-determined/uncommon-contexts
- Built with: Eleventy (11ty) static site generator
- Hosted on: GitHub Pages via GitHub Actions

## The Mystery
1. CSS files are accessible and contain correct styles:
   - `curl https://co-determined.github.io/uncommon-contexts/css/gwern-inspired.css` shows:
     ```css
     body {
       background-color: #FAF8F5;  /* warm cream */
       color: #2B2B2B;             /* charcoal */
     }
     h1, h2, h3, h4, h5, h6 {
       color: #8B2635;             /* burgundy */
     }
     ```

2. But browsers show:
   - White background (not cream)
   - Blue links (not burgundy)
   - Black text (not charcoal)

## What We've Tried
1. ✅ Removed conflicting `background: #fff` from main.css
2. ✅ Applied colors directly (not just CSS variables)
3. ✅ Added cache-busting query params (?v=2)
4. ✅ Verified files deploy correctly (GitHub Actions succeeds)
5. ✅ Tested in incognito mode, different browsers
6. ✅ Hard refresh, cleared cache

## Current CSS Load Order
```html
<link rel="stylesheet" href="/css/main.css?v=2">
<link rel="stylesheet" href="/css/gwern-inspired.css?v=2">
<link rel="stylesheet" href="/css/theme.css?v=2">
```

## The Question
Why would CSS files be served correctly (verified via curl) but not apply in ANY browser? What are we missing about GitHub Pages, browser caching, or CSS loading that could cause this?

## Specific Things to Check
1. Is there a GitHub Pages CDN/caching layer we're not accounting for?
2. Could the issue be with how Eleventy generates the site vs how GitHub Pages serves it?
3. Is there a specificity or cascade issue we're blind to?
4. Are the paths wrong in some subtle way?

Please help us solve this mystery! The CSS is beautiful but invisible.