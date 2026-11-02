# Property Auction Wala — Static Website

A premium, fully static website (HTML5, CSS3, vanilla JavaScript). No backend, no build step, no npm, no database.

## Structure

```
property-auction-wala/
├── index.html
├── css/style.css
├── js/script.js
├── assets/images/        (placeholder.svg, favicon.svg)
└── README.md
```

## Deploy on GitHub Pages

1. Create a new GitHub repository and upload **the contents** of this folder (so `index.html` sits at the repository root).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/<repository-name>/`.

All local paths are relative, so it works under a repository sub-path.

## WhatsApp

- Number 1: https://wa.me/918875515555
- Number 2: https://wa.me/918561088777

Every WhatsApp button (navigation, hero, floating button, gateway section) opens a small chooser so the visitor can pick a number. The message is prefilled: "Hello Property Auction Wala, I would like to learn more about your property opportunities."

The contact form has no backend. It validates the fields, builds a message and opens WhatsApp with the number the visitor selects. Nothing is stored.

## Editing content

- **Numbers:** edit `NUMBERS` at the top of `js/script.js`, plus the `wa.me` links in `index.html` (contact section and footer).
- **Hero photograph:** the hero is a CSS background (`background-size: cover`) set on `#hero-bg`. The photo is a free Unsplash image. `HERO_SOURCES` in `js/script.js` lists candidates and the first one that loads is used. To use your own photo, save it as `assets/images/hero.jpg` (1920x1080 or larger), then put `'assets/images/hero.jpg'` first in `HERO_SOURCES` and change the `--hero-img` value in the `#hero-bg` style attribute in `index.html`.
- **Other photos:** the two editorial photos in `index.html` are Unsplash links. Replace the `src` values with files in `assets/images/` if you prefer. If a remote image fails, `assets/images/placeholder.svg` is shown.
- **Overlay strength:** edit `.hero-overlay` in `css/style.css`.
- **Colors and fonts:** CSS variables at the top of `css/style.css`.

There are no property listings on this site; all enquiries go to WhatsApp.

## External resources

- Google Fonts (Cormorant Garamond, Manrope)
- Unsplash images
