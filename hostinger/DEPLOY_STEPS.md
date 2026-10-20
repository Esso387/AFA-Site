# Deploy to Hostinger (shared hosting)

1. **Upload** `hostinger-deploy.zip` to your Hostinger account (File Manager or FTP).
2. **Extract** it directly into `public_html`. The archive has no extra folder
   level: after extraction `public_html` must contain `index.html`, `assets/`,
   `.htaccess`, `send.php`, `MAIL_SETUP.md` and `DEPLOY_STEPS.md`.
3. **Edit the recipient**: open `send.php` and replace
   `REPLACE_WITH_YOUR_EMAIL` with the inbox that should receive enquiries.
4. **Create the sender mailbox**: in hPanel → **Emails**, create
   `no-reply@yourdomain.com`. Hostinger drops mail whose sender is not a real
   mailbox on the hosted domain. See `MAIL_SETUP.md`.
5. **Enable SSL**: hPanel → **Security → SSL**, install the free certificate and
   turn on **Force HTTPS**.
6. **Set the domain root**: hPanel → **Websites → Advanced → Document root**,
   point the domain at `public_html` (the default for the primary domain).
7. **Test**: open `/`, `/services`, `/ports`, `/track`, `/about`, `/quote` and
   `/contact` directly, then submit the quote and contact forms.
