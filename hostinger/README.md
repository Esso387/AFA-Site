# Hostinger deployment

This folder is the production build of the Australian Freight Agency site, ready
for Hostinger shared hosting (PHP 8, Apache, no Node.js runtime).

## Upload

Upload the **contents** of this folder into `public_html` using Hostinger's File
Manager or FTP. `index.html`, `.htaccess`, `send.php` and `assets/` must sit
directly inside `public_html`.

Alternatively, upload `hostinger-deploy.zip` and extract it in `public_html`;
the archive has no extra folder level.

## Before going live

1. Open `send.php` and set `$TO_EMAIL` to the address that should receive
   enquiries. This is the only required code edit.
2. Create a mailbox on the hosted domain (for example `no-reply@yourdomain.com`)
   in Hostinger's Email section. Hostinger drops mail whose sender is not a real
   mailbox on the domain, so the forms will not deliver without it.
3. Enable SSL and point the domain root at `public_html`.

See `DEPLOY_STEPS.md` for the numbered checklist and `MAIL_SETUP.md` for mail
details. `DEPLOY.md` is the build and verification report.
