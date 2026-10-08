# BHU-DRISHTI Public Website Codebase

The public, informational project for BHU-DRISHTI. This is codebase 2 of 2; the internal dashboard and its data services live separately in `../bhu-drishti-dashboard/`.

## Purpose and boundary

The website is for explaining the project to the public. Its planned content includes:

- Project introduction and overview.
- How the sensor, gateway, cloud, and dashboard architecture fits together.
- Demo video or demonstration material.
- Team and references.
- Contact form handled by this website's own API route or store.

It must not show named-site risk, per-node readings, internal alerts, operator data, or authenticated dashboard content. The one permitted dashboard API call is the public aggregate `GET /public/stats` endpoint for a node-count display. Never call `/internal/*` or `/auth/*` from this codebase, and do not share dashboard cookies, tokens, database access, or source code.

## Current status

The website implements its informational pages, responsive design, interactive four-layer architecture diagram, scroll reveals, and aggregate public node counter. It contains no per-node or authenticated dashboard data.

The contact form validates and saves inquiries to a website-owned JSON Lines file. It does not send email. Configure a private persistent `CONTACT_STORE_PATH`, access controls, retention, backups, and a team review process before public launch. In production, the route returns 503 when the store is not configured.

Visible TODOs remain for prototype media, team biographies, references from the project presentation, and pilot regions because approved source material was not supplied.

## Planned project shape

```text
bhu-drishti-website/
├── app/                 Public pages and website-owned contact API
├── components/          Shared UI within this website only
├── lib/                 Public stats fetcher and other website-only helpers
├── public/              Static brand assets
├── design-tokens.ts     Website-owned copy of shared visual values
└── package.json         Website dependencies and run scripts
```

The UI specification calls for a light theme, consistent risk colors when risk terms are used in informational diagrams, restrained scroll reveals, an interactive architecture diagram, and animated public-safe counters. Do not use these effects to imply live monitoring or real site risk.

## Starting the website

From this directory, install and start the site:

```powershell
npm ci
$env:CLOUD_API_URL = "http://127.0.0.1:8000"
$env:CONTACT_STORE_PATH = "D:\BHU DHRISTI\development_files\website-contact-inquiries.jsonl"
npm run dev
```

Open `http://localhost:3000`. Set `CLOUD_API_URL` to the dashboard API origin for the public aggregate count. The site calls only `GET /public/stats` from a server component. Set `CONTACT_STORE_PATH` to an absolute private persistent file path; never place it under `public/`. Production requires an HTTPS API origin. See [the start and demo guide](../development_files/START_AND_DEMO.md) for the dashboard and gateway.

## Public data and contact handling

The public stats client is restricted to the dashboard's open `GET /public/stats` endpoint. It validates the aggregate response and times out safely. The endpoint excludes illustrative `MOCK-NODE-*` records. No internal or authenticated endpoint is called from this codebase.

Contact submissions stay in this codebase and do not go to the dashboard API. The local file store is a starter stand-in; before public launch, provide durable protected storage, retention/access policies, ingress abuse controls, and an inbox workflow. No mail credentials are implemented or required by the current local handler.

## Specifications

The source specifications are in `../bhu-drishti-dashboard/docs/`. The dashboard and website are independent projects; maintain the website's own token file and package setup when its implementation begins.
