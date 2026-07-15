# My personal portfolio site

[![Netlify Status](https://api.netlify.com/api/v1/badges/d3e8cb77-96d5-4dbd-8b47-f4ae77088eba/deploy-status)](https://app.netlify.com/sites/jacobfm/deploys)

Created with Vite and React.

## Adding a new project page

Run the scaffolding script with the project's title in quotes:

```bash
node scripts/new-project.mjs "My Cool Project"
```

This creates `src/routes/projects/MyCoolProject.jsx`, registers a `/my-cool-project` route in `src/app/main.jsx`, and appends an entry to the thumbnails array in `src/app/App.jsx`. Afterwards, fill in the page content and set the thumbnail image and badges (marked with `TODO` comments).

The component name and route are derived from the title, or can be overridden:

```bash
node scripts/new-project.mjs "My Cool Project" --name CoolProj --route cool
```
