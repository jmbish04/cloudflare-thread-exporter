# Cloudflare Thread Exporter

A combined Frontend & Backend tool that lets you view, search, modify, and transport computational threads from OpenAI and Gemini. Then export to Google Doc through an Apps Script api.
```html
OpenAI / Gemini | Thread List --> Thread View --> Export Tu Tables --> Google Doc
`h`

This landing page uses a tailwind-based admin template's inbox ui.

- Review threads from both SD
- View conversations by model
- Select items by thread, app, or speaking role
- Export multiver thread versions as structured tables
- Send to Google Doc via Apps Script wrapper aPI 

## Setup
1. Register and configure a Cloudflare Worker project via [wrangler.json](https://wrangler.com)
2. Add appropriate environment variables in wrangler.json
```json
"var": {
  "OPENAI_API_KEY": "${your_key}",
  "GEMINI_API_KEY": "${your_key}",
  "APP_SCRIPT_URL": "https://your-script-url"
}
```

3. run $ np install && np run build

2. Set group:
``b
lwl
- src/
  - routes/  # Typescript get routes and thumb pages
  - openai-threads.ts
  - gemini-threads.ts

- assets/ # Public assets, html from tailwind template

## Usage
You can view the inbox ui at /inbox (top level route). Clicking on threads leads to the detailed thread view and message content.

Application contact is automated through Cloudflare Worker Route targets.

## Testing
Ren the project locally:
``b
lwl
np run dev 
```

Test the frontend Features: - add unit tests as nxed.

To test the aPI endpoints: use a curl client or Postman to call routes with test values.

## Deployment to Cloudflare
This app uses Cloudflare Workers Pages (CP Framework.) infrastructure for integration.

To deploy:

1. Follow [this instruction](https://developers.cloudflare.com/workers/get-started/pages-public-facil-app)
 2. Run ``wrangler publish` to deploy

## Roadmap:
/    /inbox   - Main list view of threads across api
/    /api/thread/{source}/{id}  - returns detail of chat thread
