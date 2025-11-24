## Quick context

- This is a tiny static website used to test chatbot embed/versions (no backend). The site lives at the repository root and is comprised of plain HTML/CSS with a few external chat widgets loaded from CDN.
- Primary pages: `index.html`, `chat1.html`, `chat2.html`. Shared styles are in `styles.css`. Static assets are under `icons/`.

## High-level architecture (what an AI agent needs to know)

- Static site only: there are no build steps, bundlers, or server-side code in the tree. Changes are live by editing HTML/CSS/asset files.
- Chat widget integration: both `chat1.html` and `chat2.html` include an external OpenWidget/ChatBot embed (look for `window.__ow` and `__ow.template_id`). Those are independent widget configurations (different `template_id`).
- Repeated header/navigation code: each page contains a near-identical header block (logo, hamburger, `toggleMenu()` script). Editing the header or the menu behavior requires updating every page that contains the same markup.

## Files to inspect / touch first

- `index.html` — home page and site navigation. Contains `toggleMenu()` implementation used across pages.
- `chat1.html`, `chat2.html` — demo pages. Each contains the ChatBot/OpenWidget snippet and an inline placeholder where chat UI is shown.
- `styles.css` — global styling (hamburger, nav overlay, hero, color palette). Look for `.hamburger`, `.nav-menu`, `.nav-overlay` and `.hero`.
- `icons/` — favicons and social icons; pages reference these with absolute paths like `/icons/favicon.ico` (serve from repo root).
- `README.md` — brief repo description.

## Common patterns and conventions to preserve

- Navigation JS is duplicated inline in each HTML file. If you modify `toggleMenu()` or menu CSS, update all pages that include the same script.
- Chat widget blocks are self-contained script embeds inserted near the bottom of the page (search for `window.__ow` or `__ow.template_id`). Each page may use a different `template_id` — treat those as independent widget configurations.
- Asset paths use root-relative paths for icons (e.g. `/icons/...`). When running a local server, serve from the repository root so those links resolve.

## Useful, concrete commands (how to run / test locally)

Serve the folder and open the site in a browser. Any simple static server will work; examples (PowerShell):

```powershell
# If you have Python 3 installed (recommended simple option):
python -m http.server 8000

# Or use Node's http-server if installed:
npx http-server -p 8000

# Then open http://localhost:8000/index.html in your browser.
```

Note: the HTML uses `/icons/...` root-relative paths; ensure the server serves from the repository root so those resolve correctly.

## Quick code-search shortcuts (examples)

- Find chat widget blocks: search for `__ow.template_id` or `window.__ow` in `chat1.html` and `chat2.html`.
- Find duplicated header/menu code: search for `toggleMenu()` or `.nav-overlay` to locate all pages that need synchronized updates.

## Safety / integration notes

- External dependencies: the chat widget loads scripts from `https://cdn.openwidget.com/openwidget.js` and then loads ChatBot UI. Treat those network calls as external integration points. When testing offline, the widget will not load.
- The widget configuration values (organizationId, template_id) are present in the HTML; these appear to be public embed IDs — do not assume they are secrets. If you plan to swap or test private API keys, do not commit secrets into the repo.

## Small implementation tips for contributors / agents

- If you need to change the header or nav markup, refactor into a single partial or add a shared JS file and update the pages to include it — but note: currently pages are independent files; a change must be applied across all pages.
- When adding a new chat demo page, copy `chat1.html` and update the `__ow.template_id` for the new widget. Place the chat UI inside the `.hero` section to match layout.

## Where to open a PR / verification steps

- Keep changes small: update one page or component at a time, and manually verify in browser at `http://localhost:8000/`.
- For nav/menu changes, verify menu open/close on mobile width (<=768px) because the mobile nav uses fixed positioning and overlay.

---

If anything is unclear or you'd like me to include more examples (grep snippets, small refactor to centralize header, or a sample local dev script), tell me which area and I'll update this file.
