# Copilot Instructions for My Portfolio Website

## Project Overview
This is a personal portfolio website for Abhi Sarkar, built as a static HTML/CSS/JS project. It showcases major projects, skills, and downloadable resources. The site is organized for clarity and modularity, with assets and project data separated by type and purpose.

## Key Structure
- `index.html`: Main entry point. Contains all navigation, hero, about, skills, project, and CV sections.
- `Assets/`
  - `Css_file/style.css`: All custom styles for layout, responsiveness, and visual effects.
  - `Js_file/script.js`: Handles interactive behaviors (if any).
  - `Image_file/`: Icons and project images, organized by type.
  - `Project_data/`: Contains subfolders for each major project, each with its own HTML, CSS, and JS files.

## Patterns & Conventions
- **Sectioning**: Each major section (About, Skills, Projects, CV) is a `<section>` in `index.html` with a clear heading and content block.
- **Project Cards**: Big projects use a two-column layout (`project1` class), while small projects use a grid layout (see `.Project-2` CSS).
- **Asset Paths**: All asset references are relative and use the `Assets/` directory. Example: `Assets/Image_file/picture/VA2.jpg`.
- **Styling**: All custom styles are in `Assets/Css_file/style.css`. Use CSS Grid and Flexbox for layouts. Responsive design is expected.
- **Navigation**: Internal links use anchor tags with section IDs. External links (e.g., resume download) use full URLs.

## Developer Workflow
- **No build step**: This is a static site. Edit HTML/CSS/JS directly and refresh in browser to view changes.
- **Add new projects**: Place new project files in `Assets/Project_data/{ProjectName}/` and link from `index.html`.
- **Update images/icons**: Add to `Assets/Image_file/` and reference in HTML/CSS as needed.
- **Custom CSS**: Extend or modify `Assets/Css_file/style.css` for new layouts or effects. Follow existing grid/flexbox patterns.

## Examples
- To add a new small project image grid, use the `.Project-2` HTML structure and apply grid-based CSS as shown in `style.css`.
- For a new major project, copy the `project1` block and update image, description, and links.

## External Dependencies
- Font Awesome is loaded via CDN for icons.
- No frameworks (React, Vue, etc.) are used.

## Integration Points
- All project pages (e.g., `DA.html`, `EW.html`, `VA.html`) are linked from the main page and reside in their respective subfolders.

## File References
- Main: `index.html`
- Styles: `Assets/Css_file/style.css`
- Scripts: `Assets/Js_file/script.js`
- Images: `Assets/Image_file/`
- Projects: `Assets/Project_data/`

---

If any section is unclear or missing, please provide feedback so instructions can be improved for future AI agents.
