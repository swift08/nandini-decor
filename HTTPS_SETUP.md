# HTTPS Setup Guide for nandinidecor.com

## Why "Not Secure" Warning Appears

The "Not secure" warning appears because your website is being accessed via HTTP instead of HTTPS. Vercel automatically provides SSL certificates, but you need to configure your custom domain properly.

## Steps to Fix HTTPS on Vercel

### 1. Configure Domain in Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`nandini-decor`)
3. Go to **Settings** → **Domains**
4. Add your domain: `nandinidecor.com`
5. Also add `www.nandinidecor.com` (optional but recommended)

### 2. Configure DNS Records

In your domain registrar (where you bought nandinidecor.com), add these DNS records:

**For Root Domain (nandinidecor.com):**
- **Type:** A
- **Name:** @ (or leave blank)
- **Value:** 76.76.21.21

**OR use CNAME (recommended):**
- **Type:** CNAME
- **Name:** @ (or leave blank)
- **Value:** cname.vercel-dns.com

**For WWW (www.nandinidecor.com):**
- **Type:** CNAME
- **Name:** www
- **Value:** cname.vercel-dns.com

### 3. Wait for SSL Certificate

After adding the domain in Vercel:
- Vercel will automatically provision an SSL certificate
- This usually takes 1-5 minutes
- You'll see a green checkmark when it's ready

### 4. Enable Force HTTPS

Vercel automatically redirects HTTP to HTTPS, but you can verify:
- Go to **Settings** → **Domains**
- Make sure "Force HTTPS" is enabled (it's enabled by default)

### 5. Verify Configuration

After DNS propagation (can take up to 24 hours, usually much faster):
- Visit `https://nandinidecor.com` (with https://)
- You should see a padlock icon in the browser
- No "Not secure" warning

## Quick Fix: Use Vercel's Default Domain

If you want to test immediately:
- Use Vercel's default domain: `your-project.vercel.app`
- This automatically has HTTPS enabled
- No configuration needed

## Troubleshooting

### If SSL certificate is not provisioning:
1. Check DNS records are correct
2. Wait 5-10 minutes for propagation
3. Remove and re-add the domain in Vercel
4. Contact Vercel support if issue persists

### If still seeing "Not secure":
1. Clear browser cache
2. Try incognito/private mode
3. Check if you're accessing via `http://` instead of `https://`
4. Make sure you're using the correct domain

## Current Configuration

✅ Security headers added to `vercel.json`
✅ HSTS (HTTP Strict Transport Security) enabled
✅ All security best practices implemented

After configuring the domain in Vercel dashboard, your site will automatically use HTTPS!

