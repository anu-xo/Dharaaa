# Dharaa AI Dashboard

A clean, static prototype dashboard for sustainable farming workflows. The interface includes four core views:

- **Dashboard** (score, metrics, activity, streak)
- **Florra AI** (chat-based farming assistant)
- **Verify Practice** (image verification simulation)
- **Leaderboard** (community sustainability ranking)

## Project Structure

```text
.
├── index.html
├── assets
│   ├── css
│   │   └── dashboard.css
│   └── js
│       └── dashboard.js
└── README.md
```

## What Was Improved

- Separated mixed code into dedicated files with clear names.
- Moved all styling to `assets/css/dashboard.css`.
- Moved all behavior and page rendering logic to `assets/js/dashboard.js`.
- Added a professional README with setup and structure details.

## Run Locally

This is a static front-end project, so no build step is required.

1. Clone the repository.
2. Open `index.html` in a browser.

## Customization

- Update colors, layout spacing, and UI tokens in `dashboard.css`.
- Update page content and interactions in `dashboard.js`.
- Replace sample farmer data/messages with real backend/API integration as needed.

## Notes

- The Florra chat UI currently calls an external API endpoint directly from the browser as part of the prototype logic.
- For production use, route AI/API calls through a secure backend.
