# Image Replacement Plan

Every placeholder photograph on the site is centralized in
`src/content/placeholder-images.ts` — this document is the human-readable
version of that file: what's a placeholder, where it's used, and what real
photograph needs to replace it.

Each one below was individually verified against the live Unsplash listing
(photographer, license, location) rather than assumed — see `BRAND_EXTRACT.md`
§8 for how. All are free, Unsplash License (no attribution legally required,
credited anyway as good practice).

| Used for | Current placeholder | Photographer | Replace with |
|---|---|---|---|
| **Homepage hero** | Community gathering, Kargi, Kenya | Ian Macharia | A real TrueGems program photo — ideally tied to whichever family's story ends up on the homepage (see `CONTENT_TODO.md` §1), so the hero and the story chapter feel like one narrative rather than a stock photo followed by real content |
| **Food relief program** | People carrying water containers, African community (unspecified) | Jeff Ackley | A real photo from a TrueGems food distribution — Maryland or Nigeria |
| **Health & medical outreach program** | Doctor–patient consultation, Angola | Francisco Venâncio | A real photo from a TrueGems health outreach event, once one has been documented with consent |
| **Child welfare & orphanage support program** | School boys, Nakaseke, Uganda | bill wegener | A real photo from TrueGems' actual child welfare work — **guardian consent required**, never an identifiable child without it on file |
| **Women & girl-child empowerment program** | Businesswoman at her shop, Dar es Salaam, Tanzania | Ali Mkumbwa | A real photo from a TrueGems women's empowerment program, once one has run |
| **Economic empowerment program** + **Where we work: Nigeria** | Market vendor, Bodija Market, Ibadan, Nigeria | Tunde Buremo | A real photo from TrueGems' actual Nigeria program work |
| **Where we work: Maryland** | Baltimore Inner Harbor skyline | ActionVance | A real photo of TrueGems' actual Maryland base of operations, or a local program moment |
| **Where we work: partner organisations across Africa** + **Community development program** | Reused from child welfare (Uganda) / hero (Kenya) images above | — | A real photo from wherever TrueGems' partner organisations actually operate — depends on naming the real partners first (`CONTENT_TODO.md` §5) |
| **Inner-city children's support program** | **None** — deliberately left blank rather than using an out-of-context photo (see `src/content/placeholder-images.ts`, `pendingPlaceholderImages`) | — | A real photo from TrueGems' Maryland-based inner-city work. This is the one placeholder gap on the whole site — every other program has a stand-in image, this one has nothing, because every sourced candidate was African context and this program is specifically Maryland |

## Also worth checking

- **`public/og-image.jpg`** — carried over from the legacy repo's `public/`
  folder as-is. Not verified as part of this rebuild; confirm it's either a
  real TrueGems photo/graphic or replace it before launch, since it's what
  shows up when the site is shared on social media.
- **Team photos** (`public/profile-images/*.jpeg`, used in `src/content/team.ts`)
  — these are **not placeholders**. They're the real team's actual photos,
  carried over from the legacy repo's `data/members.ts`. No action needed.
- **Logo/icon files** (`public/logo.png`, `public/icon*.png`, `public/icon.svg`)
  — real brand assets, not placeholders. No action needed.

## When replacing an image

Update the corresponding entry in `src/content/placeholder-images.ts` — swap
`src`, `alt`, and drop the `photographer`/`license`/`sourceUrl` fields (or
repurpose the same shape for the real photo's own credit line, if the
photographer wants one). Everything importing from that file — the homepage
chapters, `/programs`, `/where-we-work` — updates automatically; no component
changes needed.
