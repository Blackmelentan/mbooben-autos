# MBOOBEN AUTO'S — Dealership Website

Public website + admin panel for **MBOOBEN AUTO'S** (Yaram Bamba, Yundum, The Gambia).

**Drive Your Dream** · Quality · Trust · Performance

---

## Quick start (local)

```bash
# Option 1 — Python
cd mbooben-autos
python3 -m http.server 8080
# Open http://127.0.0.1:8080

# Option 2 — VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

---

## Publish on GitHub Pages

1. Create a new repo on GitHub (e.g. `mbooben-autos`).
2. Upload this folder (or push via Git).
3. **Settings → Pages → Source:** Deploy from branch `main` / folder `/ (root)`.
4. Site will be at: `https://YOUR-USERNAME.github.io/mbooben-autos/`

If the site is in a subfolder, keep all links relative (already done).

---

## Supabase backend (recommended)

GitHub Pages is **static only**. Use **Supabase** for:

- Car inventory database  
- Admin login  
- Future: enquiries, sales, invoices  

### 1. Create project

1. Go to [supabase.com](https://supabase.com) → New project  
2. Copy **Project URL** and **anon public key** (Settings → API)

### 2. Create tables

In Supabase → **SQL Editor**, run the file `supabase/schema.sql`.

### 3. Connect the site

Edit `js/supabase-config.js`:

```js
window.SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
window.SUPABASE_ANON_KEY = 'your-anon-key';
```

### 4. Admin access

- Open `/admin.html`  
- Default local password: `mbooben2026` (change in admin.js)  
- When Supabase Auth is set up, use email login instead  

---

## Project structure

```
mbooben-autos/
├── index.html          # Home
├── inventory.html      # All cars
├── car.html            # Single car
├── about.html
├── contact.html
├── admin.html          # Dealership management
├── css/style.css
├── js/
│   ├── cars.js         # Fallback inventory (no backend)
│   ├── main.js
│   ├── admin.js
│   └── supabase-config.js
├── public/images/      # Logo + car photos
├── supabase/schema.sql
└── README.md
```

---

## Contact (live site)

- Phone / WhatsApp: **+220 325 9613**  
- Email: **Musamboob6@gmail.com**  
- Location: **Yaram Bamba, Yundum, The Gambia**  
- Cheques: **MUSA MBOOB**

---

## Next steps

1. Push to GitHub → enable Pages  
2. Create Supabase project → run schema → paste keys  
3. Use admin panel to add/edit cars  
4. (Later) Auth, sales, invoices, mobile app  

Built for MBOOBEN AUTO'S.
