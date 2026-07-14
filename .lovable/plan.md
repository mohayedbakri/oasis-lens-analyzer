## Plan

### 1. Contact form — add phone number field
- Add bilingual translation keys in `src/lib/i18n.tsx`:
  - `contact.f.phone` ("الهاتف" / "Phone")
  - `contact.f.err.phone` ("رقم هاتف غير صالح" / "Invalid phone number")
- Update `src/routes/contact.tsx`:
  - Add `phone` to the Zod schema with a phone regex validator.
  - Add a `<Field name="phone" type="tel" dir="ltr" ... />` input between name and email.
  - Include `phone` in the `FormData` parse object.

### 2. Footer — update social media URLs
- In `src/components/layout/Footer.tsx`, replace the placeholder `socials` links with the real RSIC accounts provided:
  - Facebook: https://www.facebook.com/profile.php?id=61590154196700
  - Instagram: https://www.instagram.com/rsicsd?igsh=ZWdtdzI2eGd5d2N3
  - X: https://x.com/i/status/2066552560245170461
  - LinkedIn: https://www.linkedin.com/company/...
  - YouTube: https://youtube.com/@rsicsd?si=9U0_PF49j2Sxs6-G
  - TikTok: https://www.tiktok.com/@rsicsd?is_from_webapp=1&sender_device=pc

No backend or database changes are required.