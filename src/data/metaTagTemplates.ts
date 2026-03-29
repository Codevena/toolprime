export interface MetaTagTemplate {
  slug: string
  name: string
  title: string
  description: string
  template: {
    title: string
    description: string
    keywords: string
    ogType: string
    twitterCard: string
  }
  tips: string[]
  faqs: Array<{ question: string; answer: string }>
  relatedTemplates: string[]
}

export const metaTagTemplates: MetaTagTemplate[] = [
  {
    slug: 'blog-post',
    name: 'Blog Post',
    title: 'Meta Tags for Blog Posts',
    description: 'Optimized meta tag template for blog articles. Includes SEO title, description, Open Graph, and Twitter Card tags for maximum visibility.',
    template: {
      title: '[Post Title] | [Blog Name]',
      description: 'A compelling summary of your blog post in 150-160 characters. Include your primary keyword naturally.',
      keywords: 'blog topic, primary keyword, secondary keyword, related term',
      ogType: 'article',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include your primary keyword within the first 30 characters of the title.',
      'Write meta descriptions that answer the searcher\'s intent, not just describe the content.',
      'Use og:type "article" for blog posts to help social platforms categorize your content.',
      'Add article:published_time and article:author Open Graph tags for news-style posts.',
    ],
    faqs: [
      { question: 'What is the best title length for a blog post?', answer: 'Keep titles under 60 characters to prevent truncation in search results. Place important keywords near the beginning for maximum SEO impact.' },
      { question: 'Should I use the same title for og:title?', answer: 'You can use a slightly different og:title optimized for social sharing. Social titles can be more engaging and conversational than SEO titles.' },
      { question: 'How often should I update meta tags on old posts?', answer: 'Review and update meta tags when refreshing content. Updated descriptions can improve click-through rates on posts that have dropped in rankings.' },
    ],
    relatedTemplates: ['news-article', 'landing-page', 'podcast-episode'],
  },
  {
    slug: 'ecommerce-product',
    name: 'E-commerce Product',
    title: 'Meta Tags for E-commerce Product Pages',
    description: 'SEO-optimized meta tag template for online store product pages. Drive more organic traffic with compelling titles and rich social previews.',
    template: {
      title: '[Product Name] - [Key Feature] | [Store Name]',
      description: 'Buy [Product Name] at [Store Name]. [Key benefit]. Free shipping on orders over $[amount]. Shop now!',
      keywords: 'product name, buy product, product category, brand name, online store',
      ogType: 'product',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include price, availability, or a unique selling proposition in the meta description.',
      'Use og:type "product" and include product:price and product:availability tags.',
      'Add high-quality product images as og:image (1200x630px minimum).',
      'Include brand name in the title for branded search queries.',
    ],
    faqs: [
      { question: 'Should product pages include prices in meta descriptions?', answer: 'Yes. Including price in meta descriptions can increase click-through rates by setting clear expectations. Update the description when prices change.' },
      { question: 'What og:type should product pages use?', answer: 'Use og:type "product" for product pages. This enables additional product-specific tags like product:price:amount and product:availability.' },
      { question: 'How do I handle out-of-stock product meta tags?', answer: 'Keep the page indexed but update the meta description to reflect availability. Consider adding "Back in stock soon" or similar messaging.' },
    ],
    relatedTemplates: ['landing-page', 'product-comparison', 'ebook-landing'],
  },
  {
    slug: 'landing-page',
    name: 'Landing Page',
    title: 'Meta Tags for Landing Pages',
    description: 'High-converting meta tag template for landing pages. Optimize for both search engines and social media sharing.',
    template: {
      title: '[Value Proposition] — [Brand Name]',
      description: '[Primary benefit] for [target audience]. [Social proof or statistic]. Get started free today.',
      keywords: 'solution keyword, problem keyword, benefit keyword, brand name',
      ogType: 'website',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Focus on the value proposition in the title rather than the product name.',
      'Include social proof elements like numbers or awards in the description.',
      'Use action-oriented language: "Get", "Start", "Try", "Discover".',
      'A/B test different meta descriptions to find what drives the most clicks.',
    ],
    faqs: [
      { question: 'Should landing pages be indexed by search engines?', answer: 'It depends on the purpose. Organic landing pages should be indexed. PPC-only landing pages with thin content can use noindex to avoid duplicate content issues.' },
      { question: 'What makes a good landing page meta description?', answer: 'A good landing page description includes the main benefit, the target audience, and a call to action — all within 160 characters.' },
      { question: 'Should I use the same meta tags for paid and organic landing pages?', answer: 'No. Organic pages need keyword-optimized titles. Paid landing pages should match ad copy for consistency and often use noindex.' },
    ],
    relatedTemplates: ['saas-homepage', 'webinar-registration', 'app-download'],
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    title: 'Meta Tags for Portfolio Websites',
    description: 'Professional meta tag template for designer, developer, and creative portfolios. Showcase your work in search results and social shares.',
    template: {
      title: '[Your Name] — [Profession] Portfolio | [Specialty]',
      description: '[Profession] specializing in [specialty]. View my work including [notable projects]. Available for freelance and contract work.',
      keywords: 'portfolio, profession, specialty, freelance, creative professional',
      ogType: 'profile',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include your name and profession in the title for personal branding.',
      'Mention your location if you serve local clients.',
      'Use a professional headshot or your best project as the og:image.',
      'Add profile:first_name and profile:last_name Open Graph tags.',
    ],
    faqs: [
      { question: 'Should a portfolio use og:type profile or website?', answer: 'Use "profile" for a personal portfolio homepage. Use "website" for individual project case study pages within the portfolio.' },
      { question: 'How do I optimize portfolio meta tags for local clients?', answer: 'Include your city or region in the title and description, like "Web Designer in Berlin" to capture location-based searches.' },
      { question: 'What image should I use for og:image on a portfolio?', answer: 'Use your most impressive project screenshot or a professional headshot. Ensure it is 1200x630px for optimal display on all social platforms.' },
    ],
    relatedTemplates: ['local-business', 'saas-homepage', 'blog-post'],
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    title: 'Meta Tags for Restaurant Websites',
    description: 'Local SEO meta tag template for restaurants and food businesses. Attract more diners with optimized search and social presence.',
    template: {
      title: '[Restaurant Name] — [Cuisine Type] in [City] | Menu & Reservations',
      description: '[Cuisine type] restaurant in [neighborhood], [city]. [Signature dish or feature]. Open [hours]. Reserve a table or order online.',
      keywords: 'restaurant name, cuisine type, city restaurant, food delivery, reservations',
      ogType: 'restaurant',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include cuisine type and city in the title for local search visibility.',
      'Mention opening hours, delivery options, or reservation availability in the description.',
      'Use a high-quality food photo as the og:image to entice clicks.',
      'Add place:location tags for geographic targeting.',
    ],
    faqs: [
      { question: 'What meta tags help restaurants rank in local search?', answer: 'Include your city name, neighborhood, and cuisine type in both the title and description. Also set up Google Business Profile and ensure NAP consistency.' },
      { question: 'Should I include menu items in meta tags?', answer: 'Mention your most popular or signature dishes in the meta description. Create separate pages for detailed menus with their own optimized meta tags.' },
      { question: 'How do I optimize for food delivery searches?', answer: 'Include terms like "delivery", "order online", or "takeaway" in your meta description if you offer those services.' },
    ],
    relatedTemplates: ['local-business', 'event-page', 'recipe-page'],
  },
  {
    slug: 'saas-homepage',
    name: 'SaaS Homepage',
    title: 'Meta Tags for SaaS Homepages',
    description: 'Conversion-focused meta tag template for SaaS and software product homepages. Optimize for both branded and problem-aware searches.',
    template: {
      title: '[Product Name] — [One-Line Value Prop] | [Category] Software',
      description: '[Product Name] helps [target audience] [solve problem]. Trusted by [number]+ teams. Start your free trial today.',
      keywords: 'product name, software category, problem solution, tool for audience',
      ogType: 'website',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Lead with the problem you solve, not the features you offer.',
      'Include social proof numbers (users, companies, ratings) in the description.',
      'Keep the brand name short in the title to leave room for the value proposition.',
      'Use a product screenshot or UI preview as the og:image.',
    ],
    faqs: [
      { question: 'Should SaaS pages target branded or non-branded keywords?', answer: 'Your homepage should target your brand name. Create separate landing pages for non-branded, problem-aware keywords.' },
      { question: 'What social proof works best in meta descriptions?', answer: 'Customer counts, company logos ("trusted by Stripe, Shopify"), star ratings, or awards are all effective social proof for meta descriptions.' },
      { question: 'How do I differentiate from competitors in meta tags?', answer: 'Highlight your unique value proposition — what specifically makes your product different. Avoid generic claims like "best" or "leading".' },
    ],
    relatedTemplates: ['landing-page', 'app-download', 'product-comparison'],
  },
  {
    slug: 'news-article',
    name: 'News Article',
    title: 'Meta Tags for News Articles',
    description: 'News-optimized meta tag template for publishers and media sites. Maximize visibility in Google News and social feeds.',
    template: {
      title: '[Headline]: [Key Detail] | [Publication Name]',
      description: '[Summary of the news story in 150-160 characters]. Published [date] by [author name].',
      keywords: 'news topic, event name, key figures, location, date',
      ogType: 'article',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Front-load the most newsworthy information in the title.',
      'Include article:published_time, article:modified_time, and article:section tags.',
      'Use a compelling, original photo — stock images perform poorly for news.',
      'Update meta tags if the story develops with new information.',
    ],
    faqs: [
      { question: 'What meta tags does Google News require?', answer: 'Google News looks for clear article titles, publication dates (article:published_time), and author information. Structured data (NewsArticle schema) also helps.' },
      { question: 'Should news articles use different og:title and title?', answer: 'News articles often benefit from matching titles for consistency. However, you can use a slightly more engaging og:title for social platforms.' },
      { question: 'How do I optimize for Google Discover?', answer: 'Use high-quality images (at least 1200px wide), compelling titles, and accurate article:published_time tags. Fresh, trending content with proper meta tags performs best.' },
    ],
    relatedTemplates: ['blog-post', 'event-page', 'podcast-episode'],
  },
  {
    slug: 'event-page',
    name: 'Event Page',
    title: 'Meta Tags for Event Pages',
    description: 'Event-optimized meta tag template with date, location, and ticket information. Drive registrations from search and social.',
    template: {
      title: '[Event Name] — [Date] in [City] | [Organizer]',
      description: 'Join [Event Name] on [Date] at [Venue], [City]. [Key speaker or highlight]. Register now — [early bird pricing/limited seats].',
      keywords: 'event name, conference, city, date, tickets, registration',
      ogType: 'event',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include the date and city in the title for event-specific searches.',
      'Mention keynote speakers, pricing, or early-bird deadlines in the description.',
      'Update meta tags as the event date approaches with urgency language.',
      'Use event:start_time and event:end_time Open Graph tags.',
    ],
    faqs: [
      { question: 'What meta tags are important for events?', answer: 'Date, location, and event name in the title are critical. Use og:type "event" with event:start_time for social sharing. Event schema markup also helps search visibility.' },
      { question: 'Should I update meta tags after the event?', answer: 'Yes. After the event, update the description to mention recordings, recaps, or the next event date. This keeps the page valuable for returning visitors.' },
      { question: 'How do I optimize for "events near me" searches?', answer: 'Include the city and venue name in both the title and description. Use LocalBusiness or Event schema markup with geographic coordinates.' },
    ],
    relatedTemplates: ['webinar-registration', 'landing-page', 'news-article'],
  },
  {
    slug: 'real-estate-listing',
    name: 'Real Estate Listing',
    title: 'Meta Tags for Real Estate Listings',
    description: 'Property listing meta tag template optimized for local search. Include price, location, and key features to attract potential buyers.',
    template: {
      title: '[Property Type] for [Sale/Rent] in [Neighborhood], [City] — [Price] | [Agency]',
      description: '[Bedrooms]BR/[Bathrooms]BA [property type] in [neighborhood]. [Square footage], [key feature]. Listed at [price]. Schedule a viewing today.',
      keywords: 'property type for sale, city real estate, neighborhood homes, buy property',
      ogType: 'website',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include property type, neighborhood, and price in the title for specific searches.',
      'Mention key selling points: square footage, bedrooms, unique features.',
      'Use high-quality exterior or interior photos as og:image.',
      'Add RealEstateListing schema markup for rich results.',
    ],
    faqs: [
      { question: 'What meta tags matter most for real estate SEO?', answer: 'Location (city, neighborhood, zip code), property type, and price are the most important elements. Include them in both the title and description.' },
      { question: 'Should I include the price in meta tags?', answer: 'Yes. Including the price filters out unqualified clicks and improves the quality of traffic. Update the price in meta tags if it changes.' },
      { question: 'How do I optimize for "homes for sale near me" searches?', answer: 'Include the specific neighborhood, city, and property type in meta tags. Use structured data for RealEstateListing or Product schema.' },
    ],
    relatedTemplates: ['local-business', 'landing-page', 'portfolio'],
  },
  {
    slug: 'recipe-page',
    name: 'Recipe Page',
    title: 'Meta Tags for Recipe Pages',
    description: 'Recipe-optimized meta tag template for food blogs and cooking sites. Get featured in Google recipe carousels and rich results.',
    template: {
      title: '[Recipe Name] Recipe — [Cook Time] | [Blog Name]',
      description: 'Easy [recipe name] recipe ready in [time]. [Key ingredient or feature]. Step-by-step instructions with photos. [Dietary info: vegan/gluten-free].',
      keywords: 'recipe name, easy recipe, how to make, cooking, dish type',
      ogType: 'article',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include cooking time and difficulty level in the meta description.',
      'Use a mouth-watering finished dish photo as the og:image.',
      'Mention dietary accommodations (vegan, gluten-free) to capture niche searches.',
      'Add Recipe schema markup for rich results with ratings, time, and calories.',
    ],
    faqs: [
      { question: 'How do I get recipes in Google rich results?', answer: 'Use Recipe schema markup with required fields: name, image, ingredients, instructions. Meta tags alone are not enough — structured data is required for recipe rich results.' },
      { question: 'What should recipe meta descriptions include?', answer: 'Include the dish name, cooking time, difficulty level, and any dietary notes (vegan, keto). Mentioning "easy" or "quick" can increase clicks for common searches.' },
      { question: 'Should I include ingredients in meta tags?', answer: 'Mention one or two key ingredients in the description, but save the full list for the Recipe schema markup. Keywords like "chocolate cake" are more useful than full ingredient lists.' },
    ],
    relatedTemplates: ['blog-post', 'video-page', 'restaurant'],
  },
  {
    slug: 'podcast-episode',
    name: 'Podcast Episode',
    title: 'Meta Tags for Podcast Episodes',
    description: 'Podcast-optimized meta tag template for episode pages. Improve discoverability in search engines and podcast directories.',
    template: {
      title: '[Episode Title] — [Podcast Name] | Ep. [Number]',
      description: 'Listen to [episode title] on [Podcast Name]. [Guest name] discusses [topic]. [Duration] minutes. Available on [platforms].',
      keywords: 'podcast name, episode topic, guest name, listen podcast',
      ogType: 'music.song',
      twitterCard: 'summary',
    },
    tips: [
      'Include the guest name in both the title and description for name-based searches.',
      'Mention episode duration and available platforms in the description.',
      'Use the podcast artwork or a guest photo as the og:image.',
      'Add PodcastEpisode schema markup for podcast-specific rich results.',
    ],
    faqs: [
      { question: 'Should each podcast episode have its own page?', answer: 'Yes. Individual episode pages with unique meta tags help each episode rank for its specific topic, guest name, and related keywords.' },
      { question: 'What og:type should podcast episodes use?', answer: 'There is no official "podcast" og:type. Use "music.song" for audio content or "article" if the page includes show notes and a transcript.' },
      { question: 'How do I optimize podcast episodes for search?', answer: 'Include full transcripts on the episode page, use unique meta tags per episode, and add PodcastEpisode schema markup. Transcripts dramatically increase keyword coverage.' },
    ],
    relatedTemplates: ['blog-post', 'video-page', 'news-article'],
  },
  {
    slug: 'online-course',
    name: 'Online Course',
    title: 'Meta Tags for Online Courses',
    description: 'Course-optimized meta tag template for e-learning platforms and course creators. Increase enrollments through search and social visibility.',
    template: {
      title: '[Course Name] — Learn [Skill] Online | [Platform]',
      description: 'Learn [skill] with our [course length] online course. [Number] lessons, [certificate info]. Taught by [instructor]. Enroll now — [pricing].',
      keywords: 'learn skill online, online course, tutorial, certification, training',
      ogType: 'website',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include the skill or outcome in the title, not just the course name.',
      'Mention course duration, number of lessons, and whether a certificate is included.',
      'Use the instructor\'s name for authority and name-based searches.',
      'Add Course schema markup for rich results with ratings and price.',
    ],
    faqs: [
      { question: 'What meta tag elements increase course enrollments?', answer: 'Include the specific skill learned, course duration, instructor name, and pricing or "free" if applicable. Social proof like student count or ratings also helps.' },
      { question: 'Should I use different meta tags for free vs paid courses?', answer: 'Yes. For free courses, lead with "Free" in the title or description. For paid courses, mention the value proposition and any money-back guarantee.' },
      { question: 'How do I optimize for "learn X online" searches?', answer: 'Include the exact skill in the format "Learn [Skill] Online" in your title. Use the description to mention prerequisites, outcomes, and what makes your course unique.' },
    ],
    relatedTemplates: ['webinar-registration', 'ebook-landing', 'video-page'],
  },
  {
    slug: 'nonprofit',
    name: 'Nonprofit',
    title: 'Meta Tags for Nonprofit Organizations',
    description: 'Nonprofit-optimized meta tag template for charity and mission-driven websites. Increase donations and awareness through search visibility.',
    template: {
      title: '[Organization Name] — [Mission Statement] | [Cause]',
      description: '[Organization] is dedicated to [mission]. [Impact statistic]. Support our cause — donate, volunteer, or spread the word today.',
      keywords: 'nonprofit name, cause, charity, donate, volunteer, mission',
      ogType: 'website',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Lead with your mission, not your organization name, for cause-related searches.',
      'Include impact statistics to build credibility in the meta description.',
      'Use emotional, authentic imagery as the og:image rather than logos.',
      'Add NonprofitType schema markup for organization-specific features.',
    ],
    faqs: [
      { question: 'How do nonprofits benefit from meta tag optimization?', answer: 'Optimized meta tags increase organic traffic, which is especially valuable for nonprofits with limited advertising budgets. Better visibility means more donations, volunteers, and awareness.' },
      { question: 'Should nonprofit pages use different meta descriptions for donation pages?', answer: 'Yes. Donation pages should have action-oriented descriptions with impact statements like "Your $50 feeds a family for a month." Tailor each page to its conversion goal.' },
      { question: 'Can nonprofits get free Google Ads through meta tag optimization?', answer: 'Meta tags help organic search, not Google Ads. However, nonprofits can apply for Google Ad Grants ($10K/month in free ads) which works alongside organic SEO efforts.' },
    ],
    relatedTemplates: ['local-business', 'event-page', 'blog-post'],
  },
  {
    slug: 'job-posting',
    name: 'Job Posting',
    title: 'Meta Tags for Job Postings',
    description: 'Job listing meta tag template optimized for Google Jobs and search visibility. Attract qualified candidates with compelling descriptions.',
    template: {
      title: '[Job Title] at [Company] — [Location] | [Company] Careers',
      description: 'We\'re hiring a [job title] at [company] in [location]. [Key requirement or benefit]. [Salary range]. Apply now on our careers page.',
      keywords: 'job title, company careers, hiring, job location, apply now',
      ogType: 'website',
      twitterCard: 'summary',
    },
    tips: [
      'Include the exact job title, company name, and location in the title tag.',
      'Mention salary range or top benefits in the meta description to stand out.',
      'Use JobPosting schema markup to appear in Google for Jobs.',
      'Keep the title under 60 characters — abbreviate location if needed.',
    ],
    faqs: [
      { question: 'How do I get job postings in Google for Jobs?', answer: 'Add JobPosting schema markup with required fields: title, description, datePosted, hiringOrganization, and jobLocation. Meta tags help the page rank, but schema is required for the Jobs panel.' },
      { question: 'Should I include salary in job posting meta tags?', answer: 'Yes, if possible. Job listings with salary information get significantly more clicks. Google for Jobs also highlights salary ranges prominently.' },
      { question: 'How do I optimize for remote job searches?', answer: 'Include "Remote" in the title and description. In JobPosting schema, set jobLocationType to "TELECOMMUTE". Many candidates specifically search for "remote [job title]".' },
    ],
    relatedTemplates: ['landing-page', 'saas-homepage', 'local-business'],
  },
  {
    slug: 'app-download',
    name: 'App Download',
    title: 'Meta Tags for App Download Pages',
    description: 'App landing page meta tag template optimized for app store searches and web discovery. Drive more installs through organic search.',
    template: {
      title: '[App Name] — [Tagline] | Download for [iOS/Android]',
      description: '[App Name] lets you [key feature]. [Rating] stars with [number]+ downloads. Free on [App Store/Google Play]. Download now!',
      keywords: 'app name, download app, mobile app, app store, app category',
      ogType: 'website',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include "Download" and platform names (iOS, Android) for install-intent searches.',
      'Mention star ratings and download counts as social proof.',
      'Use app screenshots or a device mockup as the og:image.',
      'Add SoftwareApplication schema markup for app-specific rich results.',
    ],
    faqs: [
      { question: 'Should app download pages be indexed by Google?', answer: 'Yes. An indexed landing page drives organic installs and provides a web presence for users searching for your app outside app stores.' },
      { question: 'What meta tags help app pages rank higher?', answer: 'Include the app category, key features, and platform availability in meta tags. Terms like "free app", "iOS app", and the specific problem your app solves are valuable keywords.' },
      { question: 'Should I use different meta tags for iOS and Android pages?', answer: 'If you have separate pages per platform, yes. Tailor the title and description to each platform. If it is a single page, mention both platforms.' },
    ],
    relatedTemplates: ['saas-homepage', 'landing-page', 'product-comparison'],
  },
  {
    slug: 'local-business',
    name: 'Local Business',
    title: 'Meta Tags for Local Businesses',
    description: 'Local SEO meta tag template for small businesses, shops, and services. Rank higher in local search results and Google Maps.',
    template: {
      title: '[Business Name] — [Service/Product] in [City] | [Differentiator]',
      description: '[Business type] in [city/neighborhood]. [Key service or product]. [Years in business or rating]. Call [phone] or visit us at [address].',
      keywords: 'business type city, service near me, local business, city service provider',
      ogType: 'business.business',
      twitterCard: 'summary',
    },
    tips: [
      'Include your city and neighborhood in both the title and description.',
      'Mention your phone number or address in the meta description for direct contact.',
      'Use a photo of your storefront or team as the og:image.',
      'Add LocalBusiness schema markup with opening hours and geographic coordinates.',
    ],
    faqs: [
      { question: 'What meta tags help local businesses rank in Google Maps?', answer: 'Meta tags alone do not affect Google Maps rankings. However, consistent NAP (Name, Address, Phone) across your website and meta tags, combined with Google Business Profile optimization, helps local rankings.' },
      { question: 'Should I include "near me" in meta tags?', answer: 'No. Google handles "near me" searches based on the user\'s location. Instead, include your actual city, neighborhood, and service area in meta tags.' },
      { question: 'How do I optimize for multiple service areas?', answer: 'Create separate pages for each service area with unique meta tags mentioning the specific city or neighborhood. Avoid stuffing multiple cities into a single title.' },
    ],
    relatedTemplates: ['restaurant', 'portfolio', 'real-estate-listing'],
  },
  {
    slug: 'video-page',
    name: 'Video Page',
    title: 'Meta Tags for Video Pages',
    description: 'Video-optimized meta tag template for YouTube embeds, video hosting, and media pages. Get video rich results in Google search.',
    template: {
      title: '[Video Title] — [Topic] Video | [Channel/Site Name]',
      description: 'Watch [video title]: [brief description]. [Duration] minutes. [View count or date]. Subscribe for more [topic] content.',
      keywords: 'video topic, watch video, tutorial, how to, video channel',
      ogType: 'video.other',
      twitterCard: 'player',
    },
    tips: [
      'Use og:type "video.other" and include og:video tags for proper social embedding.',
      'Set twitter:card to "player" with twitter:player for inline video playback on Twitter.',
      'Use a compelling video thumbnail as the og:image, not a generic placeholder.',
      'Add VideoObject schema markup for video rich results in Google.',
    ],
    faqs: [
      { question: 'How do I get video thumbnails in Google search results?', answer: 'Add VideoObject schema markup with name, description, thumbnailUrl, uploadDate, and duration. Google may then show a video thumbnail next to your search result.' },
      { question: 'What og:type should video pages use?', answer: 'Use "video.other" for general videos. You can also use "video.movie" for films, "video.tv_show" for series, or "video.episode" for specific episodes.' },
      { question: 'Should I embed videos or host them myself for SEO?', answer: 'Embedding YouTube videos is easiest but the SEO benefit goes to YouTube. Self-hosting gives you full control over meta tags and schema, but requires more infrastructure.' },
    ],
    relatedTemplates: ['podcast-episode', 'online-course', 'blog-post'],
  },
  {
    slug: 'ebook-landing',
    name: 'E-book Landing Page',
    title: 'Meta Tags for E-book Landing Pages',
    description: 'E-book and lead magnet meta tag template. Optimize download pages for search visibility and social sharing.',
    template: {
      title: '[E-book Title]: [Subtitle] — Free Download | [Brand]',
      description: 'Download our free e-book: [title]. Learn [key topics] in [page count] pages. [Number]+ downloads. Get your copy — no signup required.',
      keywords: 'ebook title, free ebook, download guide, learn topic, pdf guide',
      ogType: 'book',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include "free" or "download" in the title for download-intent searches.',
      'Mention the page count and key topics covered in the description.',
      'Use the e-book cover as the og:image for visual appeal.',
      'Add Book schema markup with author, ISBN (if applicable), and number of pages.',
    ],
    faqs: [
      { question: 'Should e-book landing pages require email signup?', answer: 'For SEO purposes, gated content (requiring email) can still rank. However, offering ungated access improves user experience and may lead to more organic shares and backlinks.' },
      { question: 'What og:type should e-book pages use?', answer: 'Use og:type "book" for e-books. This enables additional tags like book:author, book:isbn, and book:release_date.' },
      { question: 'How do I optimize for "free e-book" searches?', answer: 'Include "free" prominently in the title and description. Mention the format (PDF, EPUB) and the specific topics or skills the reader will gain.' },
    ],
    relatedTemplates: ['online-course', 'webinar-registration', 'landing-page'],
  },
  {
    slug: 'webinar-registration',
    name: 'Webinar Registration',
    title: 'Meta Tags for Webinar Registration Pages',
    description: 'Webinar-optimized meta tag template for registration pages. Maximize sign-ups through search and social visibility.',
    template: {
      title: '[Webinar Topic] — Free Live Webinar [Date] | [Host/Company]',
      description: 'Register for our free webinar on [topic]. [Speaker name] will cover [key takeaways]. [Date] at [time]. Limited spots — sign up now!',
      keywords: 'webinar topic, free webinar, online event, register webinar, live training',
      ogType: 'event',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include the date in the title to create urgency and relevance.',
      'Mention the speaker name and their credentials for authority.',
      'Use "Free" and "Live" prominently to attract registrations.',
      'Update meta tags after the event to promote the recording.',
    ],
    faqs: [
      { question: 'Should webinar pages remain indexed after the event?', answer: 'Yes. Update the page to offer the recording or redirect to a related upcoming webinar. The page may have accumulated backlinks and search authority worth preserving.' },
      { question: 'What makes webinar meta descriptions convert?', answer: 'Include the specific outcome attendees will achieve, the speaker\'s credibility, the date and time, and the word "free" if applicable. Urgency elements like "limited spots" also help.' },
      { question: 'How do I optimize for "upcoming webinars" searches?', answer: 'Create an index page listing all upcoming webinars with date-stamped titles. Use Event schema markup on individual webinar pages for rich results.' },
    ],
    relatedTemplates: ['event-page', 'online-course', 'landing-page'],
  },
  {
    slug: 'product-comparison',
    name: 'Product Comparison',
    title: 'Meta Tags for Product Comparison Pages',
    description: 'Comparison page meta tag template for "vs" and "alternative to" content. Capture high-intent comparison searches.',
    template: {
      title: '[Product A] vs [Product B]: [Year] Comparison | [Site Name]',
      description: 'Compare [Product A] and [Product B]: features, pricing, pros and cons. Updated [year]. Find out which [category] tool is right for you.',
      keywords: 'product a vs product b, comparison, alternative to, best product category',
      ogType: 'article',
      twitterCard: 'summary_large_image',
    },
    tips: [
      'Include both product names and the current year in the title.',
      'Mention specific comparison criteria (pricing, features, ease of use) in the description.',
      'Use a comparison table image or infographic as the og:image.',
      'Update the year in meta tags annually to maintain freshness signals.',
    ],
    faqs: [
      { question: 'How do I optimize for "X vs Y" searches?', answer: 'Include both product names in the exact order people search for them. Use the title format "[Product A] vs [Product B]" and include the year for freshness.' },
      { question: 'Should comparison pages be neutral or recommend a winner?', answer: 'Declaring a clear recommendation in the meta description ("Best for...") can increase click-through rates. Be honest and provide context for different use cases.' },
      { question: 'How do I capture "alternative to X" searches?', answer: 'Create dedicated pages with titles like "Best [Product X] Alternatives in [Year]". Include the original product name in meta tags since that is what users search for.' },
    ],
    relatedTemplates: ['ecommerce-product', 'saas-homepage', 'blog-post'],
  },
]

export function getRelatedMetaTagTemplates(slug: string): MetaTagTemplate[] {
  const template = metaTagTemplates.find(t => t.slug === slug)
  if (!template) return []
  return template.relatedTemplates
    .map(s => metaTagTemplates.find(t => t.slug === s))
    .filter((t): t is MetaTagTemplate => t !== undefined)
}
