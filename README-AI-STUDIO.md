# Mihir Trivedi — Google AI Studio import package

This package contains the existing fully working personal portfolio plus its actual two-page ATS resume PDF. It is not publicly deployed.

## Import in Google AI Studio

1. Visit https://aistudio.google.com/apps and create a New App (Web app / Build).
2. In the Code tab, look for the file explorer's **+ → Upload ZIP file** option. Upload **Mihir_Gemini_AI_Studio_Portfolio.zip**. This ZIP import workflow has been reported by users; UI availability and reliability can vary.
3. Ensure the uploaded files REPLACE the empty app scaffolding; do not leave two `index.html` or two `package.json` files. The root must contain `index.html`, `package.json`, `server.mjs`, and the `assets/`, `projects/`, `resume/` folders.
4. Paste the full text from `GEMINI_AI_STUDIO_PROMPT.txt` into Build chat, then preview. Tell Gemini to preserve existing files and fix any import/previews issues without deleting the resume.
5. If ZIP import is unavailable, use AI Studio's officially documented **Add files (+) → Import from GitHub** workflow after you upload the unzipped project to a repository you control. Do not upload private employer materials.
6. After verifying all pages and the PDF download, choose **Publish → Get Started → Publish App**. Use the free Starter Tier only if shown and offered for your account. Before accepting a Standard/paid deployment, review billing.
7. Open the PUBLIC URL in incognito and test the PDF URL and all three case studies. The PDF path should be `/resume/Mihir_Trivedi_ATS_Resume.pdf`.

Google's official guides:
- https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- https://codelabs.developers.google.com/codelabs/cloud-run/launch-your-portfolio-website-with-ai

## Local testing

Node.js 20+ is required. No `npm install` is needed.

```sh
npm start
# open http://localhost:8080
```

## Content review before publication

- Confirm the employer allows publicly sharing these high-level descriptions and historical Programming Hub metrics.
- Google event venue: Sunnyvale offices, California (not Google's Mountain View headquarters).
- Verify name, email, phone number in the resume, and LinkedIn URL are correct.
- No Gemini API key, tracking script or database is required.

## Included

- index.html — homepage
- projects/*.html — three engineering case studies
- assets/styles.css, assets/site.js, assets/favicon.svg
- resume/Mihir_Trivedi_ATS_Resume.pdf — two-page ATS resume
- server.mjs, package.json — zero-dependency preview/publishing runtime
- GEMINI_AI_STUDIO_PROMPT.txt — paste into AI Studio after import
