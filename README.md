# Mihir Trivedi — Portfolio Website

A responsive, dependency-free static portfolio designed for professional interviews and recruiter review.

## Contents
- `index.html`: single-page portfolio. Fixed top bar with an icon dock, a sticky profile card on the left and scrolling sections on the right: Home, About, Skills, Experience, Work, Approach, Contact.
- `projects/`: three high-level engineering case studies (same top bar and theme).
- `resume/Mihir_Trivedi_ATS_Resume.pdf`: downloadable two-page, machine-readable ATS resume.
- `assets/styles.css`, `assets/site.js`, `assets/favicon.svg`: design and interactions (theme toggle, dock scroll-spy, project filters, copy buttons, contact form).

## Profile photo
The photo is `assets/img/profile.webp` (480×532, profile card) and `assets/img/profile-sq.webp` (192×192 face crop, used in the resume viewer; the top bar shows the "MT" monogram). Both were made with `cwebp -metadata none`, so the original photo's GPS location and camera data are **not** published. If you replace the photo, strip its metadata the same way. The "MT" monogram shows if an image fails to load.

## Project images
`assets/img/work-*.webp` are the Work card images (also shown at the top of each case study):
- `work-app.webp`: three Programming Hub screenshots from its public App Store listing.
- `work-ecosystem.webp`: app icons from the public Google Play developer page.
- `work-web.webp`: the programminghub.io homepage in a browser frame.
- `work-ai.webp`: an illustration of the AI-assisted workflow (not a real session).

They were captured from the public pages on 25 Nov 2026. Re-capture them if the listings change, and confirm your employer is fine with them being shown.

Live links used: [programminghub.io](https://programminghub.io/), [Google Play](https://play.google.com/store/apps/details?id=com.freeit.java), [App Store](https://apps.apple.com/us/app/programming-hub-learn-coding/id1049691226), [developer page](https://play.google.com/store/apps/dev?id=8802462833480602617).

## Earlier Android apps
The Work section lists 11 earlier Android apps (behind "View all" or the "Earlier Android" filter). On 25 Nov 2026 none of them was on Google Play any more (checked from 9 countries), so they do not link to Play. Six link to the listing saved by the Internet Archive (BOTY, Verigator, Tuisy, Wekho, PMA/"Byggprojekt", Druproid); the other five (Cribitt, ALF Mojis, Lavoro Live, Rajpath Club, FansRave) have no saved copy and say "No longer on Google Play". If an app comes back, swap its link for the live Play URL. The resume is unchanged.

## Resume viewer
The Resume buttons open the resume inside the site (a `<dialog>` at the end of `index.html`), with "Download PDF" and "Open PDF" buttons. The case-study pages link to `index.html#resume`, which opens it. The text in the dialog is a copy of `resume/Mihir_Trivedi_ATS_Resume.pdf`, so **update both together** when the resume changes. Without JavaScript the buttons open the PDF.

## Profiles
LinkedIn, GitHub (https://github.com/Mihir3646), Medium (https://medium.com/@mihir3646) and Blogger (https://mihir3646.blogspot.com/) appear as small icons in the footer of every page.

## Contact form
The site is static, so the form opens the visitor's email app with the message addressed to you. No backend, database or third-party form service is used.

## Preview locally
Open `index.html` directly in a browser, or run from the project directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish
Upload the **contents of this folder** (including `resume/`) to a static host such as Cloudflare Pages, GitHub Pages or Firebase Hosting. No build step, Node.js runtime or paid services are required. A custom domain is optional. Publishing is not performed automatically.

## Before making public
1. Review all employment claims and historical product milestones.
2. Confirm project wording is approved for public use by your employer; no private code or system details are included.
3. Test external links and resume download after deployment.
4. Optionally replace the email address with a dedicated public contact address.
5. Update year and project details as your career progresses.

## Accessibility / performance
Semantic headings, keyboard-friendly controls, focus states, a bottom dock on phones, reduced-motion support, dark and light themes and no tracking scripts. The only external request is the Poppins font from Google Fonts; if it fails to load, system fonts are used. The portfolio is intentionally static for speed and simplicity.
