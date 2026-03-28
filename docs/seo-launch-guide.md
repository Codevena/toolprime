# SEO Launch Guide — Wiederverwendbar für alle Websites

> Schritt-für-Schritt Anleitung von der technischen Basis bis zur laufenden Optimierung.
> Erstellt basierend auf dem ToolPrime Launch (März 2026).

---

## Phase 1: Technische Grundlagen (vor dem Launch)

### 1.1 Sitemap

- Automatische Sitemap-Generierung einrichten (z.B. `@astrojs/sitemap`, `next-sitemap`, WordPress SEO Plugin)
- Sitemap muss alle indexierbaren Seiten enthalten
- Sitemap-Index für große Sites (>50.000 URLs oder >50MB pro Datei)
- Prüfen: `https://deine-domain.de/sitemap.xml` muss öffentlich erreichbar sein

### 1.2 robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://deine-domain.de/sitemap-index.xml
```

- Muss im Root-Verzeichnis liegen (`/robots.txt`)
- Sitemap-URL muss drin stehen
- Sensible Pfade blocken falls nötig (`Disallow: /admin/`, `/api/`)

### 1.3 Meta Tags (pro Seite)

```html
<title>Primary Keyword — Brand (max 60 Zeichen)</title>
<meta name="description" content="Beschreibung mit CTA, max 155 Zeichen" />
<link rel="canonical" href="https://deine-domain.de/aktuelle-seite/" />
```

- **Title**: Unique pro Seite, Keyword vorne, Brand hinten
- **Description**: Unique pro Seite, mit Call-to-Action
- **Canonical**: Verhindert Duplicate Content
- Keine `noindex` Tags auf Seiten die indexiert werden sollen

### 1.4 Structured Data (Schema.org)

Je nach Seitentyp:

| Seitentyp | Schema |
|-----------|--------|
| Tool/App | `WebApplication` |
| Artikel/Blog | `Article` |
| FAQ-Bereich | `FAQPage` |
| How-To | `HowTo` |
| Produkt | `Product` |
| Breadcrumbs | `BreadcrumbList` |

- JSON-LD Format (im `<head>` oder `<body>`)
- Testen mit: https://search.google.com/test/rich-results

### 1.5 Performance

- **Core Web Vitals** müssen grün sein (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Bilder: WebP/AVIF, lazy loading, `width`/`height` Attribute
- CSS/JS minimiert und komprimiert
- Fonts: `font-display: swap`, nur benötigte Weights laden
- Testen mit: https://pagespeed.web.dev

### 1.6 Mobile

- Responsive Design (Google indexiert Mobile-First)
- Keine horizontalen Scrollbars
- Touch-Targets mindestens 48x48px
- Testen mit: Chrome DevTools → Device Mode

### 1.7 HTTPS & Hosting

- SSL/TLS aktiv (HTTPS)
- HTTP → HTTPS Redirect
- Schnelles Hosting mit CDN (Cloudflare Pages, Vercel, Netlify)
- Gzip/Brotli Kompression aktiv

---

## Phase 2: Launch-Tag Checkliste

### 2.1 Google Search Console

1. https://search.google.com/search-console öffnen
2. **Property hinzufügen** → "Domain" wählen → Domain eingeben
3. **DNS TXT Record** bei deinem DNS-Provider anlegen:
   - Type: `TXT`
   - Name: `@` (oder Domain-Name)
   - Content: `google-site-verification=XXXX` (von GSC kopieren)
4. In GSC auf **Verify** klicken (kann 5-60 Min dauern)
5. **Sitemaps** → Sitemap-URL eingeben → Senden
6. **URL-Prüfung** → Startseite eingeben → "Indexierung beantragen"

### 2.2 Bing Webmaster Tools

1. https://www.bing.com/webmasters öffnen
2. **"Import from Google Search Console"** wählen (schnellster Weg)
3. Google-Konto verbinden → Site auswählen → Import
4. Sitemap wird automatisch übernommen

### 2.3 Cloudflare Einstellungen (falls Cloudflare)

- **Crawler Hints / IndexNow** aktivieren: Dashboard → Caching → Crawler Hints
- **Auto Minify** für HTML/CSS/JS aktivieren
- **Brotli** Kompression aktivieren
- **Always Use HTTPS** aktivieren

### 2.4 Google Indexierung beschleunigen

- In GSC → URL-Prüfung → wichtigste 10-20 URLs manuell zur Indexierung einreichen
- **Tipp**: Google erlaubt ~10 manuelle Indexierungsanfragen pro Tag
- Seiten mit externen Links werden schneller gecrawlt

---

## Phase 3: Off-Page SEO (erste Woche)

### 3.1 Kostenlose Backlinks & Listings

| Plattform | Was eintragen | Link |
|-----------|--------------|------|
| Google Business Profile | Falls lokales Business | business.google.com |
| Product Hunt | Produkt launchen | producthunt.com |
| AlternativeTo | Als Alternative zu ähnlichen Tools | alternativeto.net |
| GitHub | Repo-Link in README | github.com |
| Dev.to | Artikel über das Projekt | dev.to |
| Hacker News | Show HN Post | news.ycombinator.com |
| Reddit | In relevanten Subreddits teilen | reddit.com |
| IndieHackers | Produkt vorstellen | indiehackers.com |
| Twitter/X | Launch Tweet | x.com |
| LinkedIn | Post über den Launch | linkedin.com |

### 3.2 Tool-Directories (für Tool-Websites)

- https://www.saashub.com
- https://www.toolpilot.ai
- https://startupstash.com
- https://www.producthunt.com
- https://alternativeto.net
- https://www.g2.com (für größere SaaS)

### 3.3 Content Seeding

- 1-2 Blog-Artikel auf Medium/Dev.to mit Links zurück zur Site
- Antworten auf Stack Overflow / Reddit wo das Tool relevant ist (kein Spam!)
- GitHub README mit Link zur Live-Site

---

## Phase 4: Programmatic SEO (für Skalierung)

### Konzept

Hunderte/Tausende Seiten automatisch generieren für Long-Tail Keywords:

```
/tools/convert-[unit1]-to-[unit2]     → "Convert kg to lbs"
/calculators/what-is-X-percent-of-Y   → "What is 5% of 200"
/hashes/[algorithm]-[word]            → "MD5 hash of hello"
```

### Checkliste für programmatische Seiten

- [ ] **Unique Content** pro Seite (nicht nur Zahlen austauschen)
- [ ] **Unique Title & Description** pro Seite
- [ ] **Strukturierte Daten** (FAQPage, HowTo)
- [ ] **Interne Verlinkung** (verwandte Seiten, Breadcrumbs)
- [ ] **Kanonische URLs** korrekt gesetzt
- [ ] **Thin Content vermeiden**: Mindestens 200-300 Wörter pro Seite
- [ ] **Indexierbar**: Keine noindex Tags, in Sitemap enthalten
- [ ] **Ladezeit**: Seiten müssen schnell sein (SSG/SSR, kein Client-Side Rendering)

### Keyword-Recherche für programmatische Seiten

- Google Autocomplete: Tippe Anfang ein, schau was Google vorschlägt
- "People Also Ask" Boxen in Suchergebnissen
- Google Keyword Planner (kostenlos mit Google Ads Account)
- AnswerThePublic (begrenzt kostenlos)
- Ahrefs/Semrush (kostenpflichtig, aber mächtig)

---

## Phase 5: Laufende Optimierung

### Wöchentlich

- [ ] Google Search Console checken: Fehler, Crawl-Stats, neue Impressions
- [ ] Analytics prüfen: Top-Seiten, Bounce Rate, Traffic-Quellen

### Monatlich

- [ ] **Search Console Performance**: Welche Queries bringen Impressions aber wenig Clicks? → Title/Description optimieren
- [ ] **Coverage Report**: Fehler beheben (404s, Server Errors, Crawl-Anomalien)
- [ ] **Core Web Vitals**: PageSpeed Insights für Top-Seiten prüfen
- [ ] **Neue Inhalte**: Blog-Artikel, neue Tool-Seiten, FAQ erweitern
- [ ] **Broken Links** prüfen (z.B. mit `npx broken-link-checker https://deine-domain.de`)

### Quartalsweise

- [ ] **Keyword-Positionen** analysieren (GSC → Performance → Queries)
- [ ] **Konkurrenz** beobachten: Welche neuen Seiten ranken für deine Keywords?
- [ ] **Content Refresh**: Alte Seiten aktualisieren, Datum updaten
- [ ] **Neue programmatische Seiten**: Weitere Kategorien/Kombinationen hinzufügen
- [ ] **Backlink-Profil**: Neue Listing-Möglichkeiten suchen

---

## SEO Metriken — Was zählt

| Metrik | Ziel | Wo messen |
|--------|------|-----------|
| Impressions | Steigend | GSC → Performance |
| Clicks | Steigend | GSC → Performance |
| CTR | >3% | GSC → Performance |
| Indexierte Seiten | = Anzahl gewünschter Seiten | GSC → Coverage |
| Core Web Vitals | Alle grün | GSC → Core Web Vitals |
| Bounce Rate | <70% | Analytics |
| Avg. Session Duration | >30s | Analytics |

---

## Monetarisierung Timeline

| Phase | Voraussetzung | Aktion |
|-------|--------------|--------|
| Sofort | Site live | Google AdSense beantragen |
| ~1K Sessions/Mo | Etwas Traffic | AdSense Ads platzieren |
| 10K Sessions/Mo | Stabiler Traffic | Ad-Platzierung optimieren |
| 50K Sessions/Mo | 30 Tage sustained | Mediavine beantragen |
| 100K+ Sessions/Mo | Premium Traffic | Raptive oder direkte Deals |

### Ad-Netzwerke

| Netzwerk | Minimum | RPM (ca.) |
|----------|---------|-----------|
| Google AdSense | Kein Minimum | €1-5 |
| Ezoic | 10K/Mo | €5-15 |
| Mediavine | 50K Sessions/Mo | €15-30 |
| Raptive (ex-AdThrive) | 100K Pageviews/Mo | €20-40 |

---

## Nützliche Tools

| Tool | Zweck | Kosten |
|------|-------|--------|
| Google Search Console | Indexierung, Performance | Kostenlos |
| Google Analytics / Umami | Traffic-Analyse | Kostenlos |
| PageSpeed Insights | Performance-Test | Kostenlos |
| Rich Results Test | Schema Markup testen | Kostenlos |
| Ahrefs Webmaster Tools | Backlinks, Keywords | Kostenlos (begrenzt) |
| Screaming Frog | Site Audit | Kostenlos bis 500 URLs |
| AnswerThePublic | Keyword-Ideen | Kostenlos (begrenzt) |

---

*Zuletzt aktualisiert: 2026-03-28*
