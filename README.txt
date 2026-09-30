SMG ESPORTS REGISTRATION BACKEND

Destination email:
shadow851311420@gmail.com

1) Create a NEW Resend API key after revoking the key that was visible in the screenshot.
2) Copy .env.example to .env and put the NEW key in RESEND_API_KEY.
3) Never put the API key inside public HTML/JS.
4) Run: npm install
5) Run: npm start
6) Put the existing registration page in public/index.html and change its submit handler to POST JSON to /api/register.

IMPORTANT:
- onboarding@resend.dev is for initial/testing use and may have recipient restrictions.
- For production sending, verify a domain in Resend and use a sender address on that verified domain.
