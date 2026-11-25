# Mihir Trivedi — Portfolio Website

A responsive, dependency-free static portfolio designed for professional interviews and recruiter review.

## Contents
- `index.html`: single-page portfolio. Fixed top bar with an icon dock, a sticky profile card on the left and scrolling sections on the right: Home, About, Skills, Experience, Work, Approach, Contact.
- `projects/`: three high-level engineering case studies (same top bar and theme).
- `resume/Mihir_Trivedi_ATS_Resume.pdf`: downloadable two-page, machine-readable ATS resume.
- `assets/styles.css`, `assets/site.js`, `assets/favicon.svg`: design and interactions (theme toggle, dock scroll-spy, project filters, copy buttons, contact form).

## Profile photo
The profile card shows an "MT" monogram. To use a photo, save it as `assets/profile.jpg` (portrait, about 368×408 px) and uncomment the `<img>` line inside `.avatar` in `index.html`.

## Project images
`assets/img/work-*.webp` are the Work card images (also shown at the top of each case study):
- `work-app.webp`: three Programming Hub screenshots from its public App Store listing.
- `work-ecosystem.webp`: app icons from the public Google Play developer page.
- `work-web.webp`: the programminghub.io homepage in a browser frame.
- `work-ai.webp`: an illustration of the AI-assisted workflow (not a real session).

They were captured from the public pages on 25 Nov 2026. Re-capture them if the listings change, and confirm your employer is fine with them being shown.

Live links used: [programminghub.io](https://programminghub.io/), [Google Play](https://play.google.com/store/apps/details?id=com.freeit.java), [App Store](https://apps.apple.com/us/app/programming-hub-learn-coding/id1049691226), [developer page](https://play.google.com/store/apps/dev?id=8802462833480602617).

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
