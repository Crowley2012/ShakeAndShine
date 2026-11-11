# 🏁 Nicky Bobby's Shake & Shine

A mobile car-wash & detailing website, themed after **Talladega Nights: The Ballad of
Ricky Bobby**. Built as a self-contained static site. No build step, no dependencies.

## Run it locally

Any static file server works. From this folder:

```bash
# Python (recommended)
python3 -m http.server 8003 --bind 0.0.0.0
```

Then open:
- On this machine:  http://localhost:8003/
- From your phone/LAN:  http://192.168.1.105:8003/

Or just double-click `index.html` and it works straight from disk.

## Files

```
index.html      All markup + inline SVG race-car art
css/styles.css  Theme, layout, animations
js/main.js      Mobile nav, scroll reveals, stat counters, mailto booking
```

## Customize (the stuff that's a placeholder)

| What | Where |
|------|-------|
| **Booking email** | `js/main.js` → `EMAIL` constant, and the `mailto:` links in `index.html` footer |
| **Phone number** | `index.html` footer `(555) 012-3456` + `tel:` link |
| **Prices / packages** | `index.html` → `#services` cards |
| **Hours / location** | `index.html` footer |
| **Colors** | `css/styles.css` → `:root` variables (`--red`, `--blue`, `--yellow`) |
| **Brand badge (SS)** | Search `SS` in `index.html` (nav + footer badges, hero plaque) |
| **Car's painted number** | The `12` on the car SVG in `index.html` (door + rear quarter) |

## What's in the box

- Animated top ticker
- Custom SVG NASCAR stock car with bobbing animation
- 3 service tiers with pricing
- "The Nicky Bobby Way" story + animated stat counters
- 3-step process, testimonials, and a working mailto booking form
- Fully responsive, respects `prefers-reduced-motion`
