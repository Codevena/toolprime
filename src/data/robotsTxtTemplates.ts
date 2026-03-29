export interface RobotsTxtTemplate {
  slug: string
  name: string
  framework: string
  title: string
  description: string
  content: string
  explanation: string[]
  tips: string[]
  faqs: Array<{ question: string; answer: string }>
  relatedTemplates: string[]
}

export const robotsTxtTemplates: RobotsTxtTemplate[] = [
  {
    slug: 'wordpress',
    name: 'WordPress',
    framework: 'WordPress',
    title: 'robots.txt for WordPress',
    description: 'Optimized robots.txt template for WordPress sites. Blocks admin, login, and plugin directories while allowing important content to be crawled.',
    content: `User-agent: *
Disallow: /wp-admin/
Disallow: /wp-login.php
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/cache/
Disallow: /trackback/
Disallow: /feed/
Disallow: /comments/feed/
Disallow: /?s=
Disallow: /search/
Allow: /wp-content/uploads/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all search engine crawlers',
      'Disallow: /wp-admin/ — blocks the WordPress admin dashboard from crawling',
      'Disallow: /wp-login.php — prevents crawling of the login page',
      'Disallow: /wp-includes/ — blocks WordPress core files',
      'Disallow: /wp-content/plugins/ — prevents indexing of plugin files',
      'Disallow: /wp-content/cache/ — blocks cached versions of pages',
      'Disallow: /trackback/ — prevents crawling of trackback URLs',
      'Disallow: /feed/ — blocks RSS feed pages from being crawled',
      'Disallow: /?s= and /search/ — prevents search result pages from being indexed',
      'Allow: /wp-content/uploads/ — ensures media files are crawlable',
      'Allow: /wp-admin/admin-ajax.php — required for some themes and plugins to function',
      'Sitemap — points crawlers to the XML sitemap for efficient discovery',
    ],
    tips: [
      'If using Yoast SEO or Rank Math, they auto-generate a virtual robots.txt — check for conflicts.',
      'Never block /wp-content/themes/ as search engines need CSS and JS for rendering.',
      'Add specific paths for any custom post type archives you want to exclude.',
      'Test your robots.txt in Google Search Console before deploying.',
    ],
    faqs: [
      { question: 'Does WordPress create a robots.txt automatically?', answer: 'WordPress generates a virtual robots.txt by default, but it is very basic. A custom robots.txt file uploaded to your root directory will override the virtual one.' },
      { question: 'Should I block /wp-content/themes/?', answer: 'No. Google needs access to CSS and JavaScript files to render your pages correctly. Blocking theme files can negatively impact your search rankings.' },
      { question: 'Do I need robots.txt if I use an SEO plugin?', answer: 'SEO plugins like Yoast and Rank Math manage robots.txt for you. If you use a plugin, edit robots.txt through the plugin settings rather than uploading a separate file.' },
    ],
    relatedTemplates: ['drupal', 'shopify', 'wix'],
  },
  {
    slug: 'nextjs',
    name: 'Next.js',
    framework: 'Next.js',
    title: 'robots.txt for Next.js',
    description: 'Production-ready robots.txt template for Next.js applications. Handles API routes, internal pages, and build artifacts properly.',
    content: `User-agent: *
Disallow: /api/
Disallow: /_next/
Disallow: /404
Disallow: /500
Allow: /_next/static/

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /api/ — blocks API route handlers from being crawled',
      'Disallow: /_next/ — blocks Next.js build artifacts and server chunks',
      'Disallow: /404 — prevents the 404 page from being indexed',
      'Disallow: /500 — prevents the 500 error page from being indexed',
      'Allow: /_next/static/ — ensures static assets (JS, CSS, images) are accessible for rendering',
      'Sitemap — directs crawlers to the sitemap for full page discovery',
    ],
    tips: [
      'Use next-sitemap package to auto-generate both sitemap.xml and robots.txt.',
      'In Next.js 13+, you can create robots.ts in the app directory for dynamic generation.',
      'Block /api/ routes unless they serve public content like RSS feeds.',
      'For ISR pages, ensure revalidation endpoints are not blocked.',
    ],
    faqs: [
      { question: 'How do I create robots.txt in Next.js?', answer: 'Place a robots.txt file in the /public directory for static generation. In Next.js 13+ App Router, create a robots.ts file in the app directory that exports a metadata function.' },
      { question: 'Should I block /_next/ in Next.js?', answer: 'Block /_next/ but allow /_next/static/ so search engines can access CSS and JavaScript needed to render your pages. Blocking all static assets hurts your SEO.' },
      { question: 'Do I need a separate robots.txt for preview deployments?', answer: 'Yes. Preview and staging deployments should use noindex meta tags and a restrictive robots.txt (Disallow: /) to prevent search engines from indexing unfinished work.' },
    ],
    relatedTemplates: ['react-spa', 'nuxt', 'gatsby'],
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    framework: 'Shopify',
    title: 'robots.txt for Shopify',
    description: 'Recommended robots.txt configuration for Shopify stores. Handles collection filtering, checkout, and admin pages.',
    content: `User-agent: *
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /account
Disallow: /collections/*sort_by*
Disallow: /*/collections/*sort_by*
Disallow: /blogs/*+*
Disallow: /blogs/*tagged*
Disallow: /*?*variant=*
Disallow: /*?*q=*
Disallow: /*?*sort_by*
Allow: /collections/
Allow: /products/

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /admin — blocks the Shopify admin panel',
      'Disallow: /cart, /orders, /checkouts/ — blocks shopping cart and checkout pages',
      'Disallow: /account — prevents customer account pages from being crawled',
      'Disallow: /collections/*sort_by* — blocks sorted collection variants (duplicate content)',
      'Disallow: /blogs/*tagged* — prevents tag filter pages from being indexed',
      'Disallow: /*?*variant=* — blocks individual product variant URLs',
      'Disallow: /*?*q=* — blocks search result pages',
      'Allow: /collections/ and /products/ — ensures product and collection pages are crawlable',
      'Sitemap — points to the auto-generated Shopify sitemap',
    ],
    tips: [
      'Shopify auto-generates a robots.txt — use the robots.txt.liquid template to customize it.',
      'Block sorted and filtered collection URLs to prevent massive duplicate content.',
      'Ensure product variant URLs are handled through canonical tags in addition to robots.txt.',
      'Check Shopify\'s documentation for the latest robots.txt.liquid syntax.',
    ],
    faqs: [
      { question: 'Can I edit robots.txt on Shopify?', answer: 'Yes. Since 2021, Shopify allows customization through the robots.txt.liquid template in your theme. Go to Online Store > Themes > Edit Code and create a robots.txt.liquid template.' },
      { question: 'Why does Shopify block so many URLs by default?', answer: 'Shopify has many URL parameters for sorting, filtering, and variants that create duplicate content. Blocking these prevents search engines from wasting crawl budget on duplicate pages.' },
      { question: 'Should I block /collections/ on Shopify?', answer: 'No. Collection pages are important for SEO as they act as category pages. Only block the sorted and filtered variants (with query parameters) to avoid duplicate content.' },
    ],
    relatedTemplates: ['wordpress', 'magento', 'wix'],
  },
  {
    slug: 'laravel',
    name: 'Laravel',
    framework: 'Laravel',
    title: 'robots.txt for Laravel',
    description: 'Secure robots.txt template for Laravel applications. Blocks framework internals, API endpoints, and admin routes.',
    content: `User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /storage/
Disallow: /vendor/
Disallow: /nova/
Disallow: /horizon/
Disallow: /telescope/
Disallow: /login
Disallow: /register
Disallow: /password/
Allow: /storage/app/public/

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /admin/ — blocks admin panel routes',
      'Disallow: /api/ — prevents API endpoints from being crawled',
      'Disallow: /storage/ — blocks the storage directory',
      'Disallow: /vendor/ — prevents Composer dependency files from being indexed',
      'Disallow: /nova/, /horizon/, /telescope/ — blocks Laravel admin tools',
      'Disallow: /login, /register, /password/ — blocks authentication pages',
      'Allow: /storage/app/public/ — ensures publicly uploaded files are accessible',
      'Sitemap — directs crawlers to the XML sitemap',
    ],
    tips: [
      'Place robots.txt in the /public directory where Laravel serves static files.',
      'If using Laravel Nova, Horizon, or Telescope, always block their routes.',
      'Consider generating robots.txt dynamically via a route for environment-specific rules.',
      'Block any custom admin or dashboard routes specific to your application.',
    ],
    faqs: [
      { question: 'Where do I put robots.txt in Laravel?', answer: 'Place it in the /public directory at the root of your Laravel project. This is where the web server serves static files from.' },
      { question: 'Should I block /vendor/ in Laravel?', answer: 'Yes. The /vendor directory contains Composer dependencies and should never be publicly accessible. This is also a security best practice.' },
      { question: 'Can I generate robots.txt dynamically in Laravel?', answer: 'Yes. Create a route that returns a plain text response with the robots.txt content. This lets you use different rules for production vs staging environments.' },
    ],
    relatedTemplates: ['django', 'nextjs', 'drupal'],
  },
  {
    slug: 'django',
    name: 'Django',
    framework: 'Django',
    title: 'robots.txt for Django',
    description: 'Python/Django robots.txt template. Blocks admin, static files directory, and internal URLs while allowing public content.',
    content: `User-agent: *
Disallow: /admin/
Disallow: /accounts/
Disallow: /api/
Disallow: /static/admin/
Disallow: /media/private/
Allow: /static/
Allow: /media/

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /admin/ — blocks the Django admin interface',
      'Disallow: /accounts/ — prevents authentication pages from being crawled',
      'Disallow: /api/ — blocks REST API endpoints',
      'Disallow: /static/admin/ — blocks Django admin static assets',
      'Disallow: /media/private/ — blocks private uploaded files',
      'Allow: /static/ — ensures CSS, JS, and images are accessible for rendering',
      'Allow: /media/ — ensures public uploaded files are crawlable',
      'Sitemap — points to Django\'s built-in sitemap framework output',
    ],
    tips: [
      'Use Django\'s built-in sitemap framework (django.contrib.sitemaps) for automatic sitemap generation.',
      'Serve robots.txt from a Django view or as a static file in your project root.',
      'Block /accounts/ if using django-allauth or similar authentication packages.',
      'Use django-robots package for database-managed robots.txt rules.',
    ],
    faqs: [
      { question: 'How do I serve robots.txt in Django?', answer: 'You can serve it as a static file from your web server, create a Django view that returns plain text, or use the django-robots third-party package for database-managed rules.' },
      { question: 'Should I block Django REST Framework endpoints?', answer: 'Yes. Block /api/ routes unless they serve public content pages. API responses are not useful in search results and waste crawl budget.' },
      { question: 'Does Django have built-in robots.txt support?', answer: 'Not natively, but django.contrib.sitemaps handles sitemaps. For robots.txt, use the django-robots package or create a simple view in your urls.py.' },
    ],
    relatedTemplates: ['laravel', 'nextjs', 'react-spa'],
  },
  {
    slug: 'react-spa',
    name: 'React SPA',
    framework: 'React (Single Page Application)',
    title: 'robots.txt for React SPAs',
    description: 'robots.txt template for client-side React applications. Handles build artifacts and ensures proper crawling of SPA routes.',
    content: `User-agent: *
Disallow: /static/js/*.map
Disallow: /static/css/*.map
Allow: /

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /static/js/*.map — blocks JavaScript source maps from being indexed',
      'Disallow: /static/css/*.map — blocks CSS source maps from being indexed',
      'Allow: / — explicitly allows all routes to be crawled',
      'Sitemap — essential for SPAs since crawlers may not discover all routes through links',
    ],
    tips: [
      'Place robots.txt in the /public directory of your Create React App project.',
      'SPAs require a sitemap.xml since crawlers cannot follow client-side routing links.',
      'Consider server-side rendering (SSR) or pre-rendering for important pages.',
      'Use React Helmet or react-helmet-async to set meta robots tags per route.',
    ],
    faqs: [
      { question: 'Can Google crawl React SPAs?', answer: 'Google can render JavaScript, but it is slower and less reliable than static HTML. For best SEO results, use SSR (Next.js), SSG, or pre-rendering alongside a properly configured robots.txt and sitemap.' },
      { question: 'Where do I put robots.txt in a React app?', answer: 'Place it in the /public directory. Create React App and Vite both serve files from /public at the root URL automatically.' },
      { question: 'Do SPAs need a sitemap?', answer: 'Yes, absolutely. Since SPA routes are handled client-side, crawlers cannot discover them by following links. A sitemap.xml is the only reliable way to tell search engines about all your routes.' },
    ],
    relatedTemplates: ['angular', 'nextjs', 'gatsby'],
  },
  {
    slug: 'angular',
    name: 'Angular',
    framework: 'Angular',
    title: 'robots.txt for Angular Applications',
    description: 'robots.txt template for Angular apps. Handles build output, source maps, and ensures proper SPA crawling.',
    content: `User-agent: *
Disallow: /*.map$
Disallow: /assets/config/
Allow: /

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /*.map$ — blocks all source map files',
      'Disallow: /assets/config/ — blocks configuration files that may contain environment details',
      'Allow: / — allows all application routes to be crawled',
      'Sitemap — critical for Angular SPAs to ensure all routes are discoverable',
    ],
    tips: [
      'Place robots.txt in the src/ directory and add it to angular.json assets.',
      'Use Angular Universal for server-side rendering to improve crawlability.',
      'Pre-render important routes using Angular\'s prerender builder.',
      'Ensure your sitemap includes all dynamically routed pages.',
    ],
    faqs: [
      { question: 'Where do I put robots.txt in an Angular project?', answer: 'Place it in the src/ folder and ensure it is listed in the assets array in angular.json. It will be copied to the build output root during compilation.' },
      { question: 'Does Angular need server-side rendering for SEO?', answer: 'For best SEO results, yes. Angular Universal provides SSR capabilities. Without SSR, Google can still render Angular apps, but with delays and potential issues.' },
      { question: 'Should I block Angular build chunks?', answer: 'No. Do not block JavaScript chunk files as Google needs them to render your app. Only block source maps (.map files) which are used for debugging.' },
    ],
    relatedTemplates: ['react-spa', 'nuxt', 'nextjs'],
  },
  {
    slug: 'gatsby',
    name: 'Gatsby',
    framework: 'Gatsby',
    title: 'robots.txt for Gatsby Sites',
    description: 'robots.txt template for Gatsby static sites. Optimized for the static site generation build process.',
    content: `User-agent: *
Disallow: /404
Disallow: /404.html
Disallow: /dev-404-page/
Allow: /

Sitemap: https://example.com/sitemap-index.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /404 and /404.html — prevents the 404 page from being indexed',
      'Disallow: /dev-404-page/ — blocks the Gatsby development 404 page',
      'Allow: / — all other pages are freely crawlable (they are static HTML)',
      'Sitemap — points to the Gatsby-generated sitemap index',
    ],
    tips: [
      'Use gatsby-plugin-robots-txt for automatic robots.txt generation during builds.',
      'Gatsby generates static HTML, so crawling is inherently efficient.',
      'Combine with gatsby-plugin-sitemap for automatic sitemap generation.',
      'Set different robots.txt rules for staging vs production using environment variables.',
    ],
    faqs: [
      { question: 'How do I add robots.txt to a Gatsby site?', answer: 'Use gatsby-plugin-robots-txt (recommended) or place a robots.txt file in the /static directory. The plugin approach allows environment-specific configuration.' },
      { question: 'Does Gatsby need a complex robots.txt?', answer: 'No. Since Gatsby generates static HTML, pages are easily crawlable. A minimal robots.txt blocking only error pages and including a sitemap is usually sufficient.' },
      { question: 'Should I block /page-data/ in Gatsby?', answer: 'No. Gatsby uses /page-data/ for client-side navigation. Blocking it does not affect SEO since Google crawls the HTML pages directly, and blocking it could break preloading.' },
    ],
    relatedTemplates: ['nextjs', 'astro', 'react-spa'],
  },
  {
    slug: 'astro',
    name: 'Astro',
    framework: 'Astro',
    title: 'robots.txt for Astro Sites',
    description: 'robots.txt template for Astro framework sites. Minimal configuration needed thanks to static-first architecture.',
    content: `User-agent: *
Disallow: /404
Allow: /

Sitemap: https://example.com/sitemap-index.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /404 — prevents the 404 page from appearing in search results',
      'Allow: / — all other pages are freely crawlable',
      'Sitemap — points to the Astro-generated sitemap index',
    ],
    tips: [
      'Use @astrojs/sitemap integration for automatic sitemap generation.',
      'Astro generates static HTML by default, making it inherently SEO-friendly.',
      'Place robots.txt in the /public directory for static serving.',
      'For SSR mode, consider generating robots.txt dynamically via an API route.',
    ],
    faqs: [
      { question: 'Where do I put robots.txt in an Astro project?', answer: 'Place it in the /public directory. Astro copies all public directory files to the build output root. Alternatively, use the astro-robots-txt integration.' },
      { question: 'Does Astro need a complex robots.txt?', answer: 'No. Astro is static-first with zero client-side JavaScript by default. A minimal robots.txt is all you need. Only add rules if you have specific pages to exclude.' },
      { question: 'How do I handle robots.txt for Astro SSR?', answer: 'For server-rendered Astro sites, you can create an API route (src/pages/robots.txt.ts) that returns robots.txt content dynamically based on the environment.' },
    ],
    relatedTemplates: ['gatsby', 'nextjs', 'nuxt'],
  },
  {
    slug: 'nuxt',
    name: 'Nuxt',
    framework: 'Nuxt',
    title: 'robots.txt for Nuxt Applications',
    description: 'robots.txt template for Nuxt.js (Vue.js) applications. Handles both SSR and static generation modes.',
    content: `User-agent: *
Disallow: /_nuxt/
Disallow: /api/
Disallow: /404
Allow: /_nuxt/builds/
Allow: /_nuxt/entry.*

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /_nuxt/ — blocks Nuxt build artifacts and chunks',
      'Disallow: /api/ — blocks server API routes',
      'Disallow: /404 — prevents the error page from being indexed',
      'Allow: /_nuxt/builds/ and /_nuxt/entry.* — ensures essential assets are accessible for rendering',
      'Sitemap — directs crawlers to the sitemap',
    ],
    tips: [
      'Use @nuxtjs/robots module for automatic robots.txt generation with environment support.',
      'Nuxt 3 with SSR generates full HTML, making pages inherently crawlable.',
      'Block /api/ routes that serve data endpoints, not HTML content.',
      'Use nuxt-simple-sitemap for automatic sitemap generation.',
    ],
    faqs: [
      { question: 'How do I add robots.txt in Nuxt 3?', answer: 'Use the @nuxtjs/robots module (recommended), place a file in /public, or create a server route at server/routes/robots.txt.ts for dynamic generation.' },
      { question: 'Does Nuxt SSR need a restrictive robots.txt?', answer: 'No. Nuxt SSR delivers full HTML to crawlers, so a minimal robots.txt is usually sufficient. Only block internal API routes and build artifacts.' },
      { question: 'Should I use static generation or SSR for SEO?', answer: 'Both work well for SEO. Static generation (nuxt generate) is faster and more reliable for crawlers. SSR is better for frequently updated content or personalized pages.' },
    ],
    relatedTemplates: ['nextjs', 'angular', 'astro'],
  },
  {
    slug: 'drupal',
    name: 'Drupal',
    framework: 'Drupal',
    title: 'robots.txt for Drupal',
    description: 'Drupal-optimized robots.txt template. Blocks admin, system files, and internal paths while allowing content pages.',
    content: `User-agent: *
Disallow: /admin/
Disallow: /user/
Disallow: /core/
Disallow: /modules/
Disallow: /themes/
Disallow: /profiles/
Disallow: /install.php
Disallow: /update.php
Disallow: /cron.php
Disallow: /xmlrpc.php
Disallow: /filter/tips
Disallow: /node/add/
Disallow: /search/
Disallow: /comment/reply/
Allow: /core/*.css$
Allow: /core/*.js$
Allow: /modules/*.css$
Allow: /modules/*.js$

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /admin/, /user/ — blocks admin and user profile pages',
      'Disallow: /core/, /modules/, /themes/, /profiles/ — blocks Drupal system directories',
      'Disallow: /*.php files — blocks direct access to PHP scripts',
      'Disallow: /filter/tips, /node/add/, /search/ — blocks internal Drupal paths',
      'Disallow: /comment/reply/ — prevents comment form pages from being indexed',
      'Allow: CSS and JS from core and modules — essential for page rendering',
      'Sitemap — directs crawlers to the XML sitemap',
    ],
    tips: [
      'Drupal ships with a default robots.txt — customize it for your specific needs.',
      'Use the XML Sitemap module for automatic sitemap generation.',
      'Never block CSS and JS files that search engines need to render pages.',
      'Add specific paths for custom content types you want to exclude.',
    ],
    faqs: [
      { question: 'Does Drupal include a robots.txt by default?', answer: 'Yes. Drupal ships with a default robots.txt in the project root. You can customize it directly or use the RobotsTxt module for database-managed rules.' },
      { question: 'Should I block /node/ paths in Drupal?', answer: 'If you use path aliases (recommended), the raw /node/123 paths may create duplicate content. Consider blocking /node/ and ensuring all content has clean URL aliases.' },
      { question: 'How do I handle multilingual robots.txt in Drupal?', answer: 'robots.txt is language-independent. Use hreflang tags and separate sitemaps per language instead. The robots.txt should allow all language paths.' },
    ],
    relatedTemplates: ['wordpress', 'laravel', 'django'],
  },
  {
    slug: 'magento',
    name: 'Magento',
    framework: 'Magento / Adobe Commerce',
    title: 'robots.txt for Magento',
    description: 'E-commerce robots.txt template for Magento stores. Handles layered navigation, checkout, and admin pages.',
    content: `User-agent: *
Disallow: /admin/
Disallow: /checkout/
Disallow: /customer/
Disallow: /catalogsearch/
Disallow: /wishlist/
Disallow: /sendfriend/
Disallow: /review/product/list/
Disallow: /*?*SID=
Disallow: /*?*___store=
Disallow: /*?*___from_store=
Disallow: /*?*dir=*
Disallow: /*?*order=*
Disallow: /*?*limit=*
Disallow: /*?*mode=*
Disallow: /*?*p=*
Allow: /media/
Allow: /static/

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /admin/ — blocks the Magento admin panel',
      'Disallow: /checkout/, /customer/ — blocks checkout and account pages',
      'Disallow: /catalogsearch/ — prevents search result pages from being indexed',
      'Disallow: /wishlist/, /sendfriend/ — blocks user action pages',
      'Disallow: /review/product/list/ — blocks review listing pages',
      'Disallow: session and store parameters — prevents duplicate URLs with query strings',
      'Disallow: sorting and pagination parameters — prevents crawling of filtered/sorted duplicates',
      'Allow: /media/ and /static/ — ensures images, CSS, and JS are accessible',
      'Sitemap — points to the Magento-generated sitemap',
    ],
    tips: [
      'Magento 2 can generate robots.txt from the admin panel: Stores > Configuration > Design.',
      'Block all layered navigation parameters to prevent exponential duplicate content.',
      'Use canonical tags in addition to robots.txt for product and category pages.',
      'Ensure the sitemap is generated with correct base URLs.',
    ],
    faqs: [
      { question: 'Can I manage robots.txt from the Magento admin?', answer: 'Yes. In Magento 2, go to Stores > Configuration > General > Design > Search Engine Robots. You can edit the robots.txt content directly from the admin panel.' },
      { question: 'Why block so many query parameters in Magento?', answer: 'Magento generates thousands of URL variations through layered navigation (sorting, filtering, pagination). Each combination creates a near-duplicate page that wastes crawl budget.' },
      { question: 'Should I block product review pages?', answer: 'Block /review/product/list/ (the review listing) but keep individual product pages accessible. Review content on product pages adds valuable unique content for SEO.' },
    ],
    relatedTemplates: ['shopify', 'wordpress', 'wix'],
  },
  {
    slug: 'wix',
    name: 'Wix',
    framework: 'Wix',
    title: 'robots.txt for Wix',
    description: 'Recommended robots.txt configuration for Wix websites. Understand what Wix generates and how to customize it.',
    content: `User-agent: *
Disallow: /_api/
Disallow: /_partials/
Disallow: /Members/
Allow: /

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /_api/ — blocks Wix internal API endpoints',
      'Disallow: /_partials/ — blocks partial page renders used internally',
      'Disallow: /Members/ — blocks member account pages',
      'Allow: / — ensures all public content is crawlable',
      'Sitemap — points to the Wix-generated sitemap',
    ],
    tips: [
      'Wix generates robots.txt automatically — you cannot upload a custom file.',
      'Use the Wix SEO panel to configure which pages are indexed.',
      'Set noindex on pages you want to exclude rather than relying on robots.txt.',
      'Check your actual robots.txt at yourdomain.com/robots.txt to see what Wix generates.',
    ],
    faqs: [
      { question: 'Can I edit robots.txt on Wix?', answer: 'Wix does not allow direct editing of robots.txt. It is auto-generated based on your site settings. Use the page SEO settings to control indexing per page.' },
      { question: 'Does Wix generate a sitemap automatically?', answer: 'Yes. Wix creates and maintains a sitemap.xml automatically. You can view it at yourdomain.com/sitemap.xml and submit it in Google Search Console.' },
      { question: 'How do I prevent Wix pages from being indexed?', answer: 'Use the SEO settings on individual pages to set "noindex". You cannot block specific paths via robots.txt on Wix, but noindex is more effective for preventing indexing anyway.' },
    ],
    relatedTemplates: ['squarespace', 'shopify', 'wordpress'],
  },
  {
    slug: 'squarespace',
    name: 'Squarespace',
    framework: 'Squarespace',
    title: 'robots.txt for Squarespace',
    description: 'robots.txt guide for Squarespace sites. Understand the auto-generated rules and available customization options.',
    content: `User-agent: *
Disallow: /config
Disallow: /search
Disallow: /account
Disallow: /api/
Disallow: /static/
Allow: /static/images/

Sitemap: https://example.com/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /config — blocks site configuration pages',
      'Disallow: /search — prevents search result pages from being indexed',
      'Disallow: /account — blocks customer account pages',
      'Disallow: /api/ — blocks internal API endpoints',
      'Disallow: /static/ — blocks static asset directory',
      'Allow: /static/images/ — ensures uploaded images are crawlable',
      'Sitemap — points to the Squarespace-generated sitemap',
    ],
    tips: [
      'Squarespace auto-generates robots.txt — limited customization is available.',
      'Use the SEO panel in page settings to set noindex on specific pages.',
      'Squarespace handles sitemaps automatically and submits them to search engines.',
      'Focus on on-page SEO since robots.txt options are limited on Squarespace.',
    ],
    faqs: [
      { question: 'Can I customize robots.txt on Squarespace?', answer: 'Squarespace has limited robots.txt customization. You can disable search engine indexing for the entire site in Settings > SEO, but per-path control requires using noindex meta tags on individual pages.' },
      { question: 'Does Squarespace handle SEO well?', answer: 'Squarespace generates clean HTML, auto-creates sitemaps, and handles canonical URLs. For most small business sites, the auto-generated robots.txt and SEO features are sufficient.' },
      { question: 'How do I block specific Squarespace pages from Google?', answer: 'Use the SEO toggle in page settings to disable indexing for specific pages. This adds a noindex meta tag, which is more effective than robots.txt for preventing indexing.' },
    ],
    relatedTemplates: ['wix', 'shopify', 'wordpress'],
  },
  {
    slug: 'github-pages',
    name: 'GitHub Pages',
    framework: 'GitHub Pages',
    title: 'robots.txt for GitHub Pages',
    description: 'robots.txt template for GitHub Pages sites and documentation. Simple configuration for static hosting.',
    content: `User-agent: *
Disallow: /404.html
Allow: /

Sitemap: https://username.github.io/repo/sitemap.xml`,
    explanation: [
      'User-agent: * — applies to all crawlers',
      'Disallow: /404.html — prevents the custom 404 page from being indexed',
      'Allow: / — allows all content pages to be crawled',
      'Sitemap — points to the sitemap (update with your actual URL)',
    ],
    tips: [
      'Place robots.txt in the repository root (or /docs folder if using that as the source).',
      'GitHub Pages serves static files directly — robots.txt works out of the box.',
      'Use Jekyll, Hugo, or a CI script to auto-generate sitemap.xml.',
      'Custom domains require updating the sitemap URL to match your domain.',
    ],
    faqs: [
      { question: 'Where do I put robots.txt for GitHub Pages?', answer: 'Place it in the root of your GitHub Pages source branch (main or gh-pages) or in the /docs folder if you configured that as the source. It will be served at yourdomain/robots.txt.' },
      { question: 'Does GitHub Pages need a complex robots.txt?', answer: 'No. GitHub Pages sites are static HTML and inherently crawl-friendly. A minimal robots.txt with a sitemap reference is all you need.' },
      { question: 'How do I create a sitemap for GitHub Pages?', answer: 'If using Jekyll, the jekyll-sitemap plugin generates one automatically. For other static generators, use their respective sitemap plugins. You can also create sitemap.xml manually.' },
    ],
    relatedTemplates: ['gatsby', 'astro', 'react-spa'],
  },
]

export function getRelatedRobotsTxtTemplates(slug: string): RobotsTxtTemplate[] {
  const template = robotsTxtTemplates.find(t => t.slug === slug)
  if (!template) return []
  return template.relatedTemplates
    .map(s => robotsTxtTemplates.find(t => t.slug === s))
    .filter((t): t is RobotsTxtTemplate => t !== undefined)
}
