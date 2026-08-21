# Content TODO

Everything below is either genuinely unknown, or known only to TrueGems and not
present anywhere in the legacy codebase — so nothing here was guessed. Each
item names exactly where it needs to go once it exists.

---

## 1 · Highest priority

### The homepage story (`src/content/stories.ts`)

**Currently: empty on purpose.** This is the single most consequential gap on
the site — the brief calls the story chapter "the emotional spine" of the
homepage, and right now it's an honest placeholder instead.

Needed: one named household TrueGems has actually worked with, in long-form
prose, with:
- The family's consent to be named and photographed, in writing
- Real photographs of them (not stock — see `IMAGE_REPLACEMENT.md`)
- A pull quote in their own words

Once this exists, add it to `src/content/stories.ts` and it will
automatically appear on the homepage's "A story" chapter, `/stories`, and its
own `/stories/[slug]` page — no component changes needed, the `<Story>`
layout is already built for this.

### EIN (`src/config/site.ts`)

Not present anywhere in the legacy codebase despite repeated "501(c)(3)"
claims throughout. Add to `siteConfig.ein` via `fact("XX-XXXXXXX")` (replacing
the current `tbd(...)` call) once issued/on file. It will automatically
appear in the footer (sitewide) and the JSON-LD structured data
(`src/lib/seo.ts`).

---

## 2 · Transparency page (`/transparency`, `src/app/transparency/page.tsx`)

Four documents currently show "not yet on file":

| Document | Status |
|---|---|
| Certificate of Incorporation | Known to exist (incorporated 2025, Maryland) — the actual filed document/PDF isn't in this codebase |
| IRS Determination Letter (501(c)(3)) | Not on file |
| Form 990 | Won't exist until the first fiscal year closes |
| Audited fund allocation | Won't exist until the first fiscal year closes |

Once any of these exist as PDFs, they need real hosting (Cloudinary, since
that's already wired up, or a `public/documents/` folder) and a link added to
the `documents` array in `transparency/page.tsx`.

---

## 3 · Real field costs (`src/content/giving-tiers.ts`, homepage "ask" chapter)

The brief specifically wants "what specific amounts buy at real field
prices." No verified unit costs exist yet, so the donate flow currently shows
plain amount tiers ($25/$50/$100/$250) without any "this feeds N people"
claim — deliberately, rather than inventing one.

Needed: real, verified costs for things TrueGems actually buys (a week of
food for a family, a school fee payment, a maternity-hospital supply
delivery, etc.), sourced from actual receipts/invoices, not estimates. Once
available, pair them with the amounts in `src/content/giving-tiers.ts` and
update the copy in `src/components/home/ask-chapter.tsx`.

---

## 4 · Real events (`/events`, `src/app/events/page.tsx`)

Currently an honest empty state — no real event with a date and location is
documented anywhere. Needs a proper `src/content/events.ts` content file
(doesn't exist yet — build it alongside the first real event) once dates are
set.

---

## 5 · Real partner organisations (`/where-we-work`, `/programs`)

The brief mentions "partner organisations across Africa" but no specific
partner is named anywhere in the legacy repo. `siteConfig.operatingRegions`
currently has a generic "Partner organisations across Africa" entry — replace
with actual named partners once confirmed, which also unblocks getting a
correctly-located real photograph for that region (see
`IMAGE_REPLACEMENT.md`).

---

## 6 · Real testimonials

Not a gap exactly — `testimonials` is genuinely Firestore-backed with no seed
data, and the moderation workflow (pending → approved, `/admin/testimonials`)
is fully built. This item is just a reminder: whatever's actually in the
collection today is real, but nothing was migrated from the legacy site's six
testimonials, because those were confirmed fake (invented names,
`placeholder-user.jpg` avatars) — starting from zero here was the correct
call, not an oversight.

---

## 7 · Board / leadership beyond the known team

`src/content/team.ts` has the six real, verified people from the legacy
repo's `data/members.ts` (a seventh, Nelly Chinonye Ohaeri, was commented out
there and wasn't included here either — confirm if she's still involved
before adding her back). If TrueGems has a formal board separate from this
team list, that's not documented anywhere yet.

---

## 8 · Social profiles (`src/config/site.ts` → `siteConfig.socials`)

Every social icon in the legacy repo linked to `href="#"` — no real profile
exists. `siteConfig.socials` is currently an empty array on purpose (the
footer simply doesn't render social icons when it's empty, rather than
showing dead links). Add real profile URLs there once they exist and the
icons will appear automatically.

---

## 9 · Homepage appeal campaign (`src/content/appeal.ts`)

Currently `null` on purpose — the homepage "Current appeal" section
(`AppealChapter`) only renders inside a real campaign's date window, so
right now it correctly shows nothing rather than a stale or invented ask.
Needs a real, time-boxed campaign (title, one honest sentence on what it
funds, a real fundraising goal someone at TrueGems has actually set, start
and end dates). The exact shape and a filled-in example are documented
directly in `src/content/appeal.ts`. Once added, it appears automatically
on the homepage and in the chapter rail — no component changes needed.

---

## 10 · Recent stories on the homepage (`src/content/stories.ts`)

Same underlying gap as item 1 (the file is empty), called out separately
here because it now feeds two homepage sections instead of one: the
long-form "story" chapter *and* the new "Recent stories" grid
(`RecentStoriesChapter`, shows up to 3 most-recent by `publishedAt`). Both
go live from the same content file — nothing extra to wire up once real,
consented stories exist.

---

## 11 · Monthly-giving outcome framing (`src/content/monthly-giving.ts`,
`MonthlyGivingChapter`)

The monthly-giving section intentionally avoids a claim like "$25/month
keeps one girl in school for a year" — no verified per-dollar outcome
exists yet (see item 3, which is the same underlying gap: real field
costs). Once real, receipt-backed unit costs exist, they can be paired with
the tiers in `src/content/monthly-giving.ts` to make this section's copy
more concrete than the current honest-but-general framing.
