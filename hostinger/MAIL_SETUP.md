# Mail setup on Hostinger

The forms send mail with PHP `mail()`. Hostinger only accepts a sender that is a
real mailbox on the hosted domain — if the `From:` address does not exist, the
message is silently dropped.

## What to do

1. In hPanel, open **Emails** and create the mailbox **`no-reply@yourdomain.com`**
   (replace `yourdomain.com` with the domain the site is served from).
2. Open `send.php` and change the single line near the top:

   ```php
   $TO_EMAIL = 'REPLACE_WITH_YOUR_EMAIL';
   ```

   Put the inbox that should receive enquiries between the quotes. This is the
   only edit required in the whole package.
3. Send a test through the quote form and confirm the message arrives. Check the
   spam folder the first time.

`send.php` builds the `From:` address from the domain the site is served on
(`no-reply@yourdomain.com`) and sets `Reply-To:` to the visitor's email, so
replying to an enquiry goes straight back to them.

If mail still does not arrive, confirm the `no-reply@` mailbox exists and that
the domain's DNS (SPF/DKIM) records are the ones Hostinger created by default.
