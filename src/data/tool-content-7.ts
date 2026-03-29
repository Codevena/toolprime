import type { ToolContent } from './tool-content'

export const toolContent7: Record<string, ToolContent> = {
  'meta-tag-generator': {
    whatIs: {
      heading: 'What Are Meta Tags?',
      body: 'Meta tags are HTML elements placed in a page\'s <head> section that provide metadata about the page to search engines and social media platforms. They do not appear visibly on the page but influence how your content is indexed, ranked, and displayed in search results and when shared on social networks.\n\nKey meta tags include the title tag (displayed as the clickable headline in search results), the meta description (the short summary beneath the title), Open Graph tags (controlling how links appear on Facebook and LinkedIn), and Twitter Card tags (controlling appearance on Twitter/X). Properly optimized meta tags can significantly improve click-through rates from search results.',
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        {
          title: 'SEO Optimization',
          description: 'Craft compelling titles under 60 characters and descriptions under 160 characters to maximize click-through rates from Google search results.',
        },
        {
          title: 'Social Media Sharing',
          description: 'Set Open Graph and Twitter Card tags so your pages display with custom titles, descriptions, and images when shared on social platforms.',
        },
        {
          title: 'Content Management',
          description: 'Generate consistent meta tags across all pages of a website, ensuring every page has proper SEO metadata and social previews.',
        },
        {
          title: 'Web Development',
          description: 'Quickly generate the HTML code for meta tags during development instead of writing them manually for each page.',
        },
      ],
    },
    tips: {
      heading: 'Meta Tag Best Practices',
      items: [
        {
          title: 'Keep Titles Under 60 Characters',
          description: 'Google typically displays the first 50-60 characters of a title tag. Longer titles get truncated with an ellipsis, reducing their effectiveness.',
        },
        {
          title: 'Write Action-Oriented Descriptions',
          description: 'Meta descriptions should include a call to action and target keywords naturally. They act as ad copy for your search listing.',
        },
        {
          title: 'Use Unique Tags Per Page',
          description: 'Every page should have a unique title and description. Duplicate meta tags confuse search engines and reduce the chance of ranking for distinct queries.',
        },
        {
          title: 'Always Set og:image',
          description: 'Pages shared on social media without an og:image tag often display a generic placeholder. Use a 1200x630 pixel image for optimal display across platforms.',
        },
      ],
    },
  },
  'robots-txt-generator': {
    whatIs: {
      heading: 'What Is robots.txt?',
      body: 'The robots.txt file is a plain text file placed at the root of a website that tells web crawlers which pages or sections of the site they are allowed or disallowed from accessing. It follows the Robots Exclusion Protocol, a standard that virtually all major search engine crawlers respect.\n\nWhile robots.txt does not prevent pages from being indexed (use the noindex meta tag for that), it controls crawl budget by directing bots away from unimportant areas like admin panels, staging content, or duplicate pages. A well-configured robots.txt helps search engines focus their crawling on the pages that matter most for your site\'s SEO.',
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        {
          title: 'Controlling Crawl Budget',
          description: 'Direct search engine bots away from low-value pages like admin areas, search result pages, and tag archives so they spend their crawl budget on important content.',
        },
        {
          title: 'Blocking Sensitive Areas',
          description: 'Prevent crawlers from accessing staging environments, development endpoints, or internal API routes that should not appear in search results.',
        },
        {
          title: 'Managing AI Crawlers',
          description: 'Block AI training crawlers like GPTBot and CCBot from scraping your content while still allowing search engine bots to index your pages.',
        },
        {
          title: 'Sitemap Discovery',
          description: 'Include your sitemap URL in robots.txt so search engines can discover and crawl all your pages efficiently, even without submitting the sitemap manually.',
        },
      ],
    },
    tips: {
      heading: 'robots.txt Best Practices',
      items: [
        {
          title: 'Always Include a Sitemap',
          description: 'Adding a Sitemap directive to your robots.txt helps search engines discover all your pages, especially new or deeply nested content.',
        },
        {
          title: 'Test Before Deploying',
          description: 'Use Google Search Console\'s robots.txt Tester to verify your rules work as intended before uploading the file to your server.',
        },
        {
          title: 'Don\'t Block CSS and JS',
          description: 'Search engines need access to CSS and JavaScript files to render and understand your pages correctly. Blocking them can hurt your rankings.',
        },
        {
          title: 'Use Specific Rules Over Broad Blocks',
          description: 'Instead of blocking entire directories, use specific path patterns to disallow only the pages you want to exclude. Overly broad rules can accidentally block important content.',
        },
      ],
    },
  },
}
