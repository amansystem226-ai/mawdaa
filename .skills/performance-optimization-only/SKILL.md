---
name: performance-optimization-only
description: Guidelines and critical rules for optimizing website performance, loading speed, and mobile smoothness without altering design, layout, fonts, colors, or functionality.
---

# Performance Optimization Only

Improve the existing website's performance and loading speed ONLY.

## CRITICAL RULE
DO NOT change the existing website's:
- Design
- Layout
- Colors
- Fonts
- Typography
- Spacing
- Content
- Images appearance
- Buttons
- Components
- Animations appearance
- User experience
- Routes
- Functionality

The website must look and behave exactly the same after optimization.

## Mobile Performance
- Make the existing website perform smoothly on mobile devices.
- Do NOT redesign the mobile layout.
- Do NOT change responsive breakpoints unless absolutely required to fix a performance issue.
- Do NOT change element sizes or positions.
- Prevent horizontal overflow only if it is caused by a technical issue.

## Loading Speed
- Optimize loading performance without changing the visual result.
- Lazy-load images that are below the fold.
- Preload only critical assets.
- Compress existing images without visibly changing their quality.
- Use modern image formats when they preserve the same visual appearance.
- Remove unused JavaScript and CSS only when it is truly unused.
- Minimize unnecessary network requests.
- Avoid loading resources that are not required for the current page.

## JavaScript
- Reduce unnecessary re-renders.
- Optimize expensive calculations.
- Use code splitting only where it does not affect the current UI.
- Do not remove functionality.
- Do not replace existing libraries unless absolutely necessary.

## CSS
- Optimize CSS delivery.
- Remove only genuinely unused CSS.
- Do not change existing styles.
- Do not change animations or transitions visually.
- Do not introduce new design styles.

## Images & Videos
- Optimize file sizes while preserving their current appearance.
- Lazy-load non-critical images/videos.
- Do not replace or remove media unless it is unused.
- Keep the same aspect ratios and visual dimensions.

## Fonts
- Keep the existing fonts exactly as they are.
- Optimize font loading only.
- Do not change font family, weight, size, or appearance.

## SEO
- Do not modify existing SEO content.
- Do not change titles, descriptions, headings, or visible text.
- Only improve technical performance-related SEO if it has zero visual/content impact.

## Code Quality
- Keep the existing architecture.
- Make the smallest possible changes.
- Do not rewrite components unnecessarily.
- Do not refactor working code just for style.
- Preserve all existing functionality.

## GitHub
- Keep the project fully compatible with its current GitHub repository.
- Do not change the repository structure unless required for performance.
- Do not delete existing important files.

## Before Making Changes
1. Inspect the entire project.
2. Identify actual performance bottlenecks.
3. Make only performance-related changes.
4. Verify that the UI is visually unchanged.
5. Verify mobile responsiveness.
6. Verify all existing functionality.
7. Check for console errors.

## Final Rule
If a change could alter the website's appearance, layout, content, functionality, or user experience, DO NOT make that change.

The goal is:

SAME WEBSITE + SAME DESIGN + SAME FUNCTIONALITY
BUT
FASTER + LIGHTER + SMOOTHER + BETTER ON MOBILE.
