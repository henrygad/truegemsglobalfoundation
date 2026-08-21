# TrueGems — Phase 0 Report

Source: `../truegemsglobalfoundation` (legacy repo, sibling directory — reference only).
Everything below is read from that repo's committed code; nothing is invented.

---

## 1 · Brand — colour inventory

### 1.1 Token layer (`app/globals.css`, OKLCH)

| Token | Light | ≈ hex | Dark | ≈ hex |
|---|---|---|---|---|
| `--primary` | `oklch(0.34 0.103 155)` | `#00461e` | `oklch(0.55 0.095 155)` | `#3e8259` |
| `--secondary` | `oklch(0.81 0.058 54)` | `#e0b89e` | `oklch(0.65 0.052 54)` | `#a98772` |
| `--accent` | `oklch(0.63 0.108 54)` | `#bb7646` | `oklch(0.72 0.098 54)` | `#d59469` |
| `--background` | `oklch(0.98 0 0)` | ~`#fafafa` | `oklch(0.16 0 0)` | — |
| `--muted` | `oklch(0.92 0 0)` | ~`#e8e8e8` | `oklch(0.35 0 0)` | — |

### 1.2 Hardcoded hex actually rendered (`components/sections/*`, `app/donate/*`)

| Hex | Count | Files | Role in UI |
|---|---|---|---|
| `#488010` | 15 | Hero, About, Programs, Quote, Testimonials, HowItWorks, GetInvolved, Events (×3), Impact (×2), Marquee, DonationProgress | **The** working green — icons, headings, CTAs, section text |
| `#F38E22` | 17 | About, Programs, Partners (×2), Testimonials (×2), HowItWorks, GetInvolved, Events (×2), Impact, DonationProgress (×3) | **The** working orange — consistent everywhere, essentially already canonical |
| `#F9F9F9` | 3 | About, Testimonials, HowItWorks | Section alt-background (off-white, warm not grey) |
| `#528811` | 2 | `donate/success`, `donate/failed` only | A second green, used nowhere else — drift, not a deliberate variant |
| `#2d5a08` | 1 | DonationProgressSection (paired with `#488010` in a gradient) | Darker end of the working green, functions as a natural "text/shadow" shade |
| `#013B6A` | 2 | `donate/success` only | A blue with **no token, no other usage anywhere in the codebase** — orphan |

### 1.3 The actual finding

The token layer and the hardcoded hex are **not the same brand** — this isn't just "three greens that need merging," it's a token file that was scaffolded (default shadcn-style palette, nudged toward a green hue) and then never adopted by the hand-built section components. Converting the tokens back to hex makes this obvious:

- `--primary` → `#00461e`, a dark forest green. The green users actually see everywhere is `#488010` — a lighter, more yellow olive (OKLCH hue **134**, vs. the token's hue **155**). Different hue family, not just different lightness.
- `--accent` → `#bb7646`, a muted terracotta-brown. The orange users actually see is `#F38E22` — a bright, saturated orange (hue **60** vs. the token's hue **54**, and far higher chroma: `0.163` vs `0.108`).
- `--secondary` (tan, `#e0b89e`) is the **one** color with no hardcoded duplicate anywhere — it's the only piece of the palette actually expressed exclusively through the token layer today. Worth preserving as-is.

So: `--primary` and `--accent` in the current token file are dead code — nobody's eyes have been calibrated to them, because no component uses them. The real brand is `#488010` green + `#F38E22` orange, arrived at by hand in the components and then diverging slightly (`#528811`, `#2d5a08`) as more pages got built without a shared source of truth.

### 1.4 Recommendation

**Canonical green — `#488010`** (fill/large use) with **`#2d5a08`** as its paired dark shade for small text and links.

Contrast check against white:
- `#488010` on white ≈ **4.81:1** — clears AA (4.5:1) for normal text, but only just. Fine for buttons, icon washes, section bands, large headings. Not the shade to lean on for 14px body copy at scale.
- `#2d5a08` on white ≈ **8.14:1** — comfortably AA/AAA. Use for links, small labels, anywhere green sits under ~18px.

This mirrors how the legacy repo already uses these two values together in `DonationProgressSection` (`#488010` → `#2d5a08` gradient) — the "two-step green" already exists in practice, it's just never been formalized as a token. Convert both to OKLCH and retire the current `--primary`:

```
--primary       ≈ oklch(0.54 0.148 134)   /* #488010, fill */
--primary-dark  ≈ oklch(0.42 0.118 135)   /* #2d5a08, small text */
```

**Canonical orange — `#F38E22`** (`oklch(0.74 0.163 60)`). Already consistent everywhere; just point `--accent` at it instead of the current unused terracotta.

**Retire `#528811`** (2 occurrences, both on the donate result pages) — replace with `#488010`. No evidence it's an intentional variant, reads as drift from whoever built those two pages last.

**Retire `#013B6A`** (the orphan blue, `donate/success` only) — the brand is green/tan/orange per the brief; blue isn't in it. Replace with the primary green or a neutral for the "official/receipt" moment it's currently used for. If a genuine need for a fourth, non-brand "info" color turns up later (e.g., a receipt/confirmation accent distinct from the CTA orange), formalize it as a real token then — don't carry an unnamed hex forward.

**Keep `--secondary` (tan)** as the canonical tan — `oklch(0.81 0.058 54)` / `#e0b89e`. It's the one color already living correctly in the token layer.

**Fold `#F9F9F9`** into a named surface token — it's a warm off-white, not the same as the current flat-grey `--muted` (`#e8e8e8`). Recommend a new `--surface` token at `oklch(0.98 0 90)` for section alt-backgrounds, distinct from `--muted` (which should stay reserved for disabled/quiet UI states).

**Net result:** every component-level `bg-[#488010]` / `text-[#F38E22]` etc. becomes `bg-primary` / `text-accent`, and the token file's values finally match what the brand has actually looked like in the browser all along.

---

## 2 · Typography

**Confirmed:** Geist + Geist Mono, loaded via `next/font/google` (`app/layout.tsx`), referenced in `@theme inline` as `--font-sans` / `--font-mono`. Carries forward as specified.

**Proposed editorial serif: Newsreader**

- Purpose-built by Production Type specifically for long-form reading on screens — has both a **display** optical-size cut (for large headlines, more contrast and character) and a **text** cut (for body prose, calmer and more legible at 16–20px) on the same variable font. That dual-purpose range is exactly what the brief asks for: one serif for display headings *and* long-form story prose.
- Reads as editorial/institutional (closer to a newspaper or foundation annual report) rather than the high-contrast "wedding invitation" register of something like Playfair Display, and rather than the generic-safe register of Lora — appropriate for a young, honest, non-flashy nonprofit that still wants to look like an institution, not a landing page.
- Pairs cleanly against Geist's neutral grotesque without competing for attention — Geist stays the workhorse (nav, buttons, labels, form fields, data), Newsreader is reserved for moments that carry emotional weight (chapter headlines, the pull quote, story prose at ~34rem measure).
- Free, Google Fonts, loads the same way via `next/font/google` — no new infrastructure.

Runner-up: **Source Serif 4** — more neutral/less "newspaper," a safer choice if Newsreader's italic character feels too editorial in practice. Worth a side-by-side check on the actual hero headline before committing, but Newsreader is the recommendation to start from.

---

## 3 · Integrations to carry over

| Integration | File(s) | State |
|---|---|---|
| **Firebase** | `lib/firebase/config.ts`, `lib/firebase/controler.ts` | Config reads 7 `NEXT_PUBLIC_FIREBASE_*` env vars. `Controller` is a generic typed CRUD wrapper (`createData`/`getData`/`getAllData`/`updateData`/`deleteData`/`getDataby`) over 8 named collections: `messages`, `volunteers`, `newsletter`, `testimonials`, `gallery`, `donors`, `admins`, `visitors`. Reusable as-is. **No `firestore.rules` file exists anywhere in the repo** — rules live only in the Firebase console and can't be audited from code. Flagging now because Phase 0 (§10.2 of the brief) asks for a rules audit — that audit has to happen against the live console, not this repo. |
| **Stripe** | `lib/stripe.ts`, `app/api/checkout/route.ts` | Server-only `Stripe` client. Checkout route builds a Checkout Session (one-time or subscription), builds `success_url`/`cancel_url` from `NEXT_PUBLIC_BASE_URL` — confirms the brief's bug: nothing in this repo enforces the `https://` scheme on that env var, so a bare-domain value silently breaks the redirect. Only `card` payment methods, USD hardcoded regardless of the `currency` field accepted from the client. **No webhook route exists anywhere under `app/api`.** Donations are never written to Firestore server-side; the client builds a "potential donor" object and does nothing further with it. |
| **Resend** | `lib/resend.ts`, `emails/*.tsx` | Client wraps `RESEND_API_KEY`. Five templates exist: `contact-reply`, `donation-thank-you`, `newsletter-confirmation`, `testimonial-reply`, `volunteer-reply`, plus a shared `layout.tsx`. Only two are ever called: `app/api/email/contact` sends `contact-reply`, and `app/api/email/admin` sends a raw inline-HTML string (not a template) to notify the org. `donation-thank-you` and `newsletter-confirmation` are written but never imported anywhere — confirms both of the brief's claims (thank-you email dead code, newsletter form sends nothing). |
| **Cloudinary** | `lib/cloudinary.ts` | Two functions: unsigned upload (`upload_preset` + cloud name, both `NEXT_PUBLIC_*`) and a signed delete (Basic auth from API key/secret, server-only). Straightforward to carry over. |
| **Turnstile** | `app/api/verify/cloudflare-token/route.ts` | POSTs the client token + `TURNSTILE_SECRET_KEY` to Cloudflare's `siteverify`, returns a simple `{success}` shape. No rate limiting or replay protection, but functionally correct and reusable as the base for `useVerifiedSubmit()`. |

---

## 4 · Admin inventory

Nine `/admin` sub-routes, gated by `app/admin/provider.tsx` (client-only) inside `app/admin/layout.tsx`, which mounts six context providers: Donor, User, Volunteer, Visitor, Newsletter, Message. (Gallery and Testimonial providers are mounted at the **root** `app/layout.tsx` instead, since public pages read them too.)

| Route | Firestore collection | Wiring |
|---|---|---|
| `/admin` (dashboard) | `messages`, `newsletter`, `testimonials`, `visitors`, `volunteers` | **Live** — reads all five contexts for summary counts |
| `/admin/volunteers` | `volunteers` | **Live** — `useVolunteer()` |
| `/admin/gallery` (+ `/upload`, `/edit/[id]`) | `gallery` | **Live** — `useGallery()`, plus direct `Controller` calls for create/update, Cloudinary upload wired in |
| `/admin/donors` | `donors` (nominally) | **Dead.** Renders a hardcoded local `useState` array (John Smith, Sarah Johnson) via plain component state — doesn't import `donor-context` at all, despite `DonorProvider` being mounted one level up. Worse than the brief described: it's not even reading the seeded-then-discarded fetch, it never touches Firestore in any form. |
| `/admin/messages` | `messages` (nominally) | **Dead.** Imports `Controller` but never calls it; local `useState("")` unused; renders a static "No messages yet" card. |
| `/admin/newsletter` | `newsletter` (nominally) | **Dead.** No data import at all; static "No subscribers yet" card. |
| `/admin/testimonials` | `testimonials` (nominally) | **Dead.** No data import; static "No testimonials yet" card — despite `useTestimonial()` being live and working one page over on the dashboard. |
| `/admin/visitors` | `visitors` (nominally) | **Dead.** Static "Analytics tracking enabled" card, no data. |

**Net: 2 of 9 sub-routes are actually wired to Firestore (Gallery, Volunteers). The other 5 content routes are static shells** — this is a larger gap than the brief's description of donors-only. Worth knowing before scoping Phase 7, since "port it, don't redesign it" assumed working pages to port; five of them need to be built essentially from scratch against collections that already have live data (`messages`, `newsletter`, `testimonials`, `visitors` are all written to from the public site's forms even though nothing in `/admin` reads them back).

**Auth gate bug, beyond what the brief flagged:** `app/admin/provider.tsx` guards with:
```ts
if (typeof authUser === null && !authUser) {
    return redirect('/login/admin');
}
```
`typeof x` returns a string (`"object"`, `"undefined"`, …) and can never `=== null`, so this condition is always `false` — the redirect **never fires**, regardless of auth state. So this isn't just "client-side gating is insufficient," the client-side gating that exists doesn't actually run. Combined with the commented-out `proxy.ts` and the missing `firestore.rules`, there is currently no enforced access control on `/admin` at any layer. This makes §10.1–10.2 (middleware + rules audit) unambiguously the first thing to fix in Phase 7, not just good practice.

---

## 5 · Real facts (verifiable in the legacy repo)

**Contact:**
- Phone: `+1 (202) 406 0331` (`app/contact/page.tsx`) — but the same page's "Call Now" button links `tel:+15551234567`, a placeholder that was never swapped for the real number. Use `(202) 406 0331` as canonical; fix the dead link.
- Address: `805 Narrowleaf Dr, Upper Marlboro, MD 20774` (`app/contact/page.tsx`)
- Email: `info@truegemsglobalfoundation.org`
- Office hours: Mon–Fri 9–5, Sat 10–2, Sun closed, EST

**Legal status:** "registered and approved 501(c)(3) nonprofit," incorporated 2025, stated repeatedly (`about`, `donate`, `AboutSection`, `HeroSection`, `data/members.ts`). **No EIN appears anywhere in the codebase** — the 501(c)(3) claim is never backed by a number. This is a `CONTENT_TODO.md` item, not something to type in from memory.

**Team** (`data/members.ts`) — 6 active entries (a 7th, Nelly Chinonye Ohaeri, is commented out):
- Gift Ulimma Ohaeri Nwosu — Founder
- Chinatu Apolonia Nwokoro — Co-Founder / General Support Lead
- Shulamite Nkeiruka Nwaoze — West Africa Regional Coordinator
- Dr. Hassana Wambai Sani — Medical Doctor & Humanitarian Volunteer
- Dr. Elelu Shehu — Academic Mentor & Community Support Advisor (USA)
- Henry Emeka Loveday Orji — Software Developer & International Humanitarian Volunteer

Each has a real, specific, non-template bio (not filler) with a matching photo in `public/profile-images/`.

**Testimonials:** `context/testimonial-context.tsx` fetches live from Firestore's `testimonials` collection with **no seed data and no fallback array** — unlike `donor-context`, it's genuinely Firestore-only. Whatever's in that collection today is real; I can't read Firestore data from this static repo, so actual testimonial content needs to be pulled from the live database, not assumed.

**Social links:** every social icon in `footer.tsx` and `app/contact/page.tsx` points to `href="#"` — no real social profiles exist in the codebase to carry over.

---

## 6 · Proposed information architecture

Legacy has 24 top-level-ish routes but real overlap: `/services`, `/programs`, and an empty `/projects` describe the same seven programs from three separate hardcoded arrays; `/international` duplicates what "where we work" should say; `/about/history`, `/about/leadership`, `/about/partnerships` fragment one story across four routes.

Proposed structure:

```
/                          chaptered homepage narrative (§5 of the brief)
/stories                   index of long-form stories
/stories/[slug]            <Story> layout — reusable content type
/programs                  the seven programs, as variations on "the method"
/programs/[slug]           optional detail page per program, if content supports it
/where-we-work             three named places (replaces /international)
/about                     who we are — merges /about/history, /about/partnerships
/about/team                leadership bios (real, substantial — earns its own page)
/transparency              Form 990, IRS determination letter, certificate of
                            incorporation, fund allocation, annual report
/events
/gallery
/testimonials
/testimonials/leave-review
/volunteer
/donate
/donate/success
/donate/failed
/contact
/newsletter                archive of past issues + signup
/privacy
/terms
/cookies
/login/admin               auth entry, excluded from sitemap
/admin/*                   9 internal routes, excluded from sitemap, disallowed in robots.txt
```

**Removed:** `/services`, `/projects`, `/international`, `/about/history`, `/about/leadership`, `/about/partnerships` as standalone routes — folded into `/programs`, `/where-we-work`, `/about`, and `/about/team` respectively.

This gets the public sitemap to a genuinely complete, non-duplicated set — in the low twenties depending on how many programs get their own detail page — versus the legacy's 7-of-~24 coverage.

---

**Stopping here per the brief.** Waiting on review of the color reconciliation, the serif pairing, and the IA before touching Phase 1.
