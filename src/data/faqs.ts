export interface Faq {
  question: string
  answer: string
}

export const faqs: Record<string, Faq[]> = {
  'word-counter': [
    { question: 'How does the word counter work?', answer: 'Paste or type your text into the input field. The tool instantly counts words, characters (with and without spaces), sentences, paragraphs, and estimates reading time based on an average of 200 words per minute.' },
    { question: 'Is there a character limit?', answer: 'No. The tool runs entirely in your browser and can handle texts of any length. Performance stays fast even with 100,000+ words.' },
    { question: 'Does this tool save my text?', answer: 'No. All processing happens locally in your browser. Your text is never sent to any server or stored anywhere.' },
  ],
  'json-formatter': [
    { question: 'What JSON formatting options are available?', answer: 'You can beautify JSON with 2-space or 4-space indentation, minify it to a single line, or validate its syntax to find errors with line numbers.' },
    { question: 'Can it handle large JSON files?', answer: 'Yes. The formatter processes JSON entirely in your browser and can handle files up to several megabytes without issues.' },
    { question: 'Is my data safe?', answer: 'Yes. All JSON processing happens locally in your browser. No data is ever sent to a server.' },
  ],
  'password-generator': [
    { question: 'Are the generated passwords truly random?', answer: 'Yes. The tool uses the Web Crypto API (crypto.getRandomValues) which provides cryptographically secure random numbers, the same standard used by password managers.' },
    { question: 'What makes a password strong?', answer: 'A strong password is at least 16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and symbols. Our strength meter evaluates your password against these criteria.' },
    { question: 'Is it safe to generate passwords online?', answer: 'Yes, because this tool generates passwords entirely in your browser. No password is ever sent to a server or stored anywhere.' },
  ],
  'qr-code-generator': [
    { question: 'What can I encode in a QR code?', answer: 'You can encode URLs, plain text, email addresses, phone numbers, WiFi credentials, and more. Most QR code scanners will automatically detect the content type.' },
    { question: 'What image formats are available?', answer: 'You can download your QR code as PNG (raster, best for web) or SVG (vector, best for print). Both formats support any size.' },
    { question: 'Is there a size limit for QR code content?', answer: 'QR codes can store up to about 4,296 alphanumeric characters. For most use cases like URLs and text, this is more than enough.' },
  ],
  'color-picker': [
    { question: 'What color formats are supported?', answer: 'The tool supports HEX (#ff0000), RGB (rgb(255, 0, 0)), and HSL (hsl(0, 100%, 50%)) formats. You can input in any format and instantly see the conversion to all others.' },
    { question: 'Can I pick a color from my screen?', answer: 'Yes, if your browser supports the EyeDropper API (Chrome, Edge). Click the eyedropper button to pick any color from your screen.' },
    { question: 'How do I copy a color value?', answer: 'Click the copy icon next to any color value (HEX, RGB, or HSL) to copy it to your clipboard. A confirmation will appear briefly.' },
  ],
  'base64-encode-decode': [
    { question: 'What is Base64 encoding?', answer: 'Base64 is a way to represent binary data as ASCII text. It is commonly used to embed images in HTML/CSS, send data in URLs, and transmit binary content over text-based protocols like email.' },
    { question: 'Does Base64 encrypt my data?', answer: 'No. Base64 is an encoding, not encryption. Anyone can decode Base64 text. Do not use it to hide sensitive information.' },
    { question: 'Does it support special characters and emojis?', answer: 'Yes. The tool handles full UTF-8 encoding, including special characters, accented letters, and emojis.' },
  ],
  'image-compressor': [
    { question: 'Which image formats are supported?', answer: 'The tool supports JPEG and PNG images. JPEG compression adjusts quality level. PNG compression optimizes the file without visible quality loss.' },
    { question: 'Are my images uploaded to a server?', answer: 'No. All compression happens entirely in your browser using the Canvas API. Your images never leave your device.' },
    { question: 'How much can I reduce file size?', answer: 'Typical JPEG compression reduces file size by 50-80% with minimal visible quality loss. PNG compression typically achieves 20-50% reduction.' },
  ],
  'lorem-ipsum-generator': [
    { question: 'What is Lorem Ipsum?', answer: 'Lorem Ipsum is placeholder text used in design and typesetting since the 1500s. It allows designers to focus on visual layout without being distracted by readable content.' },
    { question: 'Can I choose how much text to generate?', answer: 'Yes. You can generate a specific number of paragraphs, sentences, or words. The default is 5 paragraphs.' },
    { question: 'Is the generated text always the same?', answer: 'The text follows standard Lorem Ipsum patterns but includes randomization so each generation is slightly different.' },
  ],
  'unit-converter': [
    { question: 'What unit categories are available?', answer: 'The tool supports conversions for length, weight/mass, temperature, volume, area, speed, time, and digital storage.' },
    { question: 'How accurate are the conversions?', answer: 'All conversions use standard conversion factors with full floating-point precision. Results are rounded to 6 decimal places for display.' },
    { question: 'Can I see a conversion table?', answer: 'Yes. Every conversion page includes a table showing common values converted between the two units.' },
  ],
  'percentage-calculator': [
    { question: 'What percentage calculations are supported?', answer: 'You can calculate: what is X% of Y, X is what percent of Y, percent increase or decrease between two numbers, and the percentage difference between two values.' },
    { question: 'Does it show the calculation steps?', answer: 'Yes. Each result includes a step-by-step explanation of the formula used and the arithmetic.' },
    { question: 'Can I use decimals?', answer: 'Yes. The calculator supports decimal numbers for both the percentage and the values.' },
  ],
  'url-encode-decode': [
    { question: 'What is the difference between encodeURI and encodeURIComponent?', answer: 'encodeURIComponent encodes all special characters including /, :, and ?. encodeURI preserves URL structure characters and only encodes characters that are not valid in any part of a URL. Use encodeURIComponent for query parameter values and encodeURI for full URLs.' },
    { question: 'Can it handle Unicode and emoji?', answer: 'Yes. The tool fully supports UTF-8 encoding, so characters like accented letters, Chinese characters, and emoji are correctly encoded and decoded.' },
    { question: 'Is my data safe?', answer: 'Yes. All encoding and decoding happens locally in your browser using built-in JavaScript functions. No data is ever sent to a server.' },
  ],
  'case-converter': [
    { question: 'What case formats are supported?', answer: 'The tool supports 8 formats: UPPER CASE, lower case, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case.' },
    { question: 'Does it work with variable names?', answer: 'Yes. The converter intelligently detects word boundaries in camelCase, snake_case, kebab-case, and regular text, so you can convert between any programming naming convention.' },
    { question: 'Is my text stored anywhere?', answer: 'No. All conversion happens locally in your browser using standard JavaScript string methods. Your text never leaves your device.' },
  ],
  'timestamp-converter': [
    { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 at 00:00:00 UTC. It is the standard way computers and servers track time.' },
    { question: 'Should I use seconds or milliseconds?', answer: 'Most Unix/Linux systems, Python, and PHP use seconds. JavaScript, Java, and some APIs use milliseconds (1000x larger). The tool supports both formats.' },
    { question: 'Does it account for time zones?', answer: 'Yes. The converter shows both your local time and UTC. The live timestamp always shows UTC-based Unix time.' },
  ],
  'hash-generator': [
    { question: 'Which hash algorithm should I use?', answer: 'For security purposes, use SHA-256 or SHA-512. MD5 and SHA-1 are considered cryptographically broken and should only be used for checksums or non-security purposes like file verification.' },
    { question: 'Can I reverse a hash to get the original text?', answer: 'No. Cryptographic hash functions are one-way. You cannot recover the original input from a hash. This is by design and is what makes hashes useful for password storage and data integrity verification.' },
    { question: 'Is my text sent to a server?', answer: 'No. SHA hashes are computed using the browser Web Crypto API and MD5 is computed using a local JavaScript library. No data ever leaves your device.' },
  ],
  'regex-tester': [
    { question: 'What regex flags are supported?', answer: 'The tool supports g (global — find all matches), i (case-insensitive), m (multiline — ^ and $ match line boundaries), and s (dotall — . matches newlines).' },
    { question: 'Does it show capture groups?', answer: 'Yes. When your pattern contains parenthesized groups, each match displays its captured groups alongside the full match text and index position.' },
    { question: 'Is my test data safe?', answer: 'Yes. All regex matching runs in your browser using the built-in RegExp engine. No data is sent to any server.' },
  ],
  'sql-formatter': [
    { question: 'Which SQL dialects are supported?', answer: 'The tool supports Standard SQL, MySQL, PostgreSQL, Microsoft T-SQL, and Oracle PL/SQL. Select your dialect from the dropdown for accurate formatting.' },
    { question: 'Can I customize the formatting?', answer: 'Yes. You can choose between 2-space and 4-space indentation and toggle whether SQL keywords are converted to uppercase.' },
    { question: 'Is my SQL query stored?', answer: 'No. All formatting happens locally in your browser. Your queries never leave your device.' },
  ],
  'diff-checker': [
    { question: 'What diff modes are available?', answer: 'The tool supports line-level diff (compares entire lines, ideal for code) and word-level diff (compares individual words, ideal for prose and documents).' },
    { question: 'Can I copy the diff output?', answer: 'Yes. Click the Copy button to copy the diff result in a standard unified diff format with + and - prefixes for added and removed content.' },
    { question: 'Is my data safe?', answer: 'Yes. All text comparison is performed locally in your browser using a JavaScript diff library. No data is sent to any server.' },
  ],
  'css-gradient-generator': [
    { question: 'What gradient types are supported?', answer: 'The tool supports linear gradients (straight-line transitions), radial gradients (circular from center outward), and conic gradients (angular sweep around a center point).' },
    { question: 'Can I add more than two colors?', answer: 'Yes. Click "Add Color Stop" to add as many colors as you want. Each stop has a color picker and a position slider. You need at least two color stops.' },
    { question: 'Does it generate standard CSS?', answer: 'Yes. The output is standard CSS that works in all modern browsers. Just copy and paste the background property into your stylesheet.' },
  ],
  'favicon-generator': [
    { question: 'What sizes are generated?', answer: 'The tool generates 8 sizes: 16x16, 32x32, 48x48, and 64x64 for browsers, 180x180 for Apple Touch Icon, and 192x192 and 512x512 for Android Chrome. These cover all modern browsers and devices.' },
    { question: 'What image format should I upload?', answer: 'Square PNG or SVG images work best, at least 512x512 pixels. JPEG also works. The tool will resize your image to all required dimensions with high-quality smoothing.' },
    { question: 'Are my images uploaded to a server?', answer: 'No. All image processing happens locally in your browser using the Canvas API. Your images never leave your device. The ZIP file is also generated client-side.' },
  ],
  'invoice-generator': [
    { question: 'What currencies are supported?', answer: 'The tool supports USD, EUR, GBP, CHF, and JPY with proper currency formatting. Select your currency from the dropdown before generating the invoice.' },
    { question: 'Can I add multiple line items?', answer: 'Yes. Click "Add Item" to add as many line items as you need. Each item has a description, quantity, and unit price. Totals are calculated automatically.' },
    { question: 'Is my invoice data stored anywhere?', answer: 'No. The PDF is generated entirely in your browser using a local JavaScript library. Your company details, client information, and invoice data are never sent to any server.' },
  ],
  'markdown-editor': [
    { question: 'Does the Markdown editor support syntax highlighting?', answer: 'Yes. Fenced code blocks with a language tag (e.g. ```javascript) are automatically syntax-highlighted using highlight.js, covering over 190 programming languages.' },
    { question: 'Can I copy the rendered HTML?', answer: 'Yes. Click the Copy HTML button to copy the fully rendered HTML output to your clipboard. You can paste it directly into a CMS, email template, or HTML file.' },
    { question: 'Does the editor work on mobile devices?', answer: 'Yes. On smaller screens the editor and preview panels stack vertically so you can write and preview comfortably on phones and tablets.' },
    { question: 'Is my text stored or sent to a server?', answer: 'No. All Markdown parsing and rendering happens entirely in your browser. Your text never leaves your device.' },
  ],
  'markdown-to-pdf': [
    { question: 'How do I convert Markdown to PDF?', answer: 'Paste or type your Markdown in the editor, verify the preview looks correct, and click the Download PDF button. The PDF is generated instantly in your browser.' },
    { question: 'Does the PDF support tables and code blocks?', answer: 'Yes. The converter renders Markdown tables, fenced code blocks, blockquotes, lists, and all standard inline formatting into the PDF output.' },
    { question: 'Is my content uploaded to a server?', answer: 'No. The entire conversion from Markdown to PDF happens locally in your browser using client-side JavaScript libraries. Your content never leaves your device.' },
    { question: 'What page size does the PDF use?', answer: 'The generated PDF uses A4 page size in portrait orientation by default, which is the most widely used format for documents and reports.' },
    { question: 'Can I use this for long documents?', answer: 'Yes. The converter handles multi-page documents and will automatically paginate the content. For very large documents, generation may take a few seconds.' },
  ],
  'json-to-csv': [
    { question: 'Does the converter handle nested JSON objects?', answer: 'Yes. Nested objects are automatically flattened using dot notation for column headers. For example, an object with address.city becomes a column named "address.city" in the CSV output.' },
    { question: 'What happens if JSON objects have different keys?', answer: 'The converter creates columns for all unique keys found across all objects. Missing values are left as empty cells in the CSV, ensuring no data is lost.' },
    { question: 'Can I convert CSV back to JSON?', answer: 'Yes. Switch to the "CSV to JSON" tab, paste your CSV data with a header row, and click Convert. The first row defines the JSON property names.' },
    { question: 'Is there a file size limit?', answer: 'The tool runs entirely in your browser, so it can handle files up to several megabytes without uploading anything to a server. Performance depends on your device.' },
    { question: 'Is my data safe?', answer: 'Yes. All conversion happens locally in your browser using a JavaScript library. No data is ever sent to a server.' },
  ],
  'image-to-base64': [
    { question: 'Which image formats are supported?', answer: 'The tool supports all formats your browser can read, including PNG, JPEG, GIF, SVG, WebP, and BMP. Simply drag and drop or click to upload.' },
    { question: 'What is a data URI?', answer: 'A data URI is a string that starts with "data:image/png;base64," followed by the Base64-encoded image data. You can paste it directly into an HTML img tag src attribute or a CSS background-image property.' },
    { question: 'Does Base64 encoding increase file size?', answer: 'Yes, Base64 encoding increases the data size by approximately 33%. It is best suited for small images under 10-20 KB like icons and logos.' },
    { question: 'Are my images uploaded to a server?', answer: 'No. The tool uses the browser FileReader API to convert your image locally. Your files never leave your device.' },
    { question: 'Can I use the output in email templates?', answer: 'Yes. Base64 data URIs are commonly used in HTML email templates to embed small logos and icons, since many email clients block external images by default.' },
  ],
  'meta-tag-generator': [
    { question: 'What meta tags should every page have?', answer: 'At minimum, every page should have a unique title tag (under 60 characters), a meta description (under 160 characters), and Open Graph tags (og:title, og:description, og:image) for social media sharing.' },
    { question: 'What is the ideal meta description length?', answer: 'Google typically displays 150-160 characters of a meta description. Write your most important information within the first 120 characters, as mobile search results may show less.' },
    { question: 'Do meta keywords still matter for SEO?', answer: 'Google has officially stated it does not use the meta keywords tag as a ranking factor. However, some other search engines like Yandex may still consider them. Including them does no harm.' },
    { question: 'What are Open Graph tags?', answer: 'Open Graph (og:) tags control how your page appears when shared on Facebook, LinkedIn, and other social platforms. They let you set a custom title, description, and image for social previews.' },
    { question: 'Is my data stored or sent to a server?', answer: 'No. All meta tag generation happens locally in your browser. Your content is never sent to any server or stored anywhere.' },
  ],
  'robots-txt-generator': [
    { question: 'Where should I place my robots.txt file?', answer: 'The robots.txt file must be placed at the root of your domain, accessible at https://yourdomain.com/robots.txt. It will not work in subdirectories.' },
    { question: 'Does robots.txt prevent pages from being indexed?', answer: 'No. robots.txt only controls crawling, not indexing. To prevent a page from appearing in search results, use the noindex meta tag or X-Robots-Tag HTTP header instead.' },
    { question: 'Can I block specific search engine bots?', answer: 'Yes. Add a User-agent directive with the bot name (e.g., Googlebot, Bingbot, GPTBot) followed by Disallow rules. Rules for specific bots override the wildcard (*) rules.' },
    { question: 'What is Crawl-delay?', answer: 'Crawl-delay tells bots to wait a specified number of seconds between requests. Google ignores this directive but Bing and Yandex respect it. Use it to reduce server load from aggressive crawlers.' },
    { question: 'Is my data stored anywhere?', answer: 'No. The robots.txt file is generated entirely in your browser. No data is ever sent to a server.' },
  ],
  'cron-expression-generator': [
    { question: 'What is cron syntax?', answer: 'Cron syntax is a five-field format (minute, hour, day of month, month, day of week) used to define recurring schedules. Each field accepts specific values, ranges (1-5), lists (1,3,5), and step values (*/15). An asterisk (*) means every possible value for that field.' },
    { question: 'How do I run a cron job every 5 minutes?', answer: 'Use the expression */5 * * * *. The */5 in the minute field means every 5th minute. This runs at :00, :05, :10, :15, and so on throughout every hour of every day.' },
    { question: 'What is the difference between * and ? in cron?', answer: 'In standard five-field cron (used by crontab and most Linux systems), only * is used. The ? character is specific to extended cron implementations like Quartz Scheduler and AWS, where it means "no specific value" in the day-of-month or day-of-week fields.' },
    { question: 'Does this work with GitHub Actions?', answer: 'Yes. GitHub Actions uses standard POSIX cron syntax with five fields. Note that GitHub Actions schedules run in UTC and the minimum interval is every 5 minutes. Use the on: schedule: - cron: syntax in your workflow YAML.' },
    { question: 'How do I set a timezone for my cron job?', answer: 'Standard crontab uses the server local time. In GitHub Actions, you can set the timezone per workflow. In Kubernetes CronJobs (v1.25+), use the timeZone field. For crontab, set the TZ environment variable or use the CRON_TZ variable at the top of your crontab file.' },
  ],
  'color-palette-generator': [
    { question: 'What is color harmony?', answer: 'Color harmony is the theory of combining colors in a way that is visually pleasing. It uses the color wheel to define relationships like complementary (opposite), analogous (adjacent), and triadic (evenly spaced) to create balanced palettes.' },
    { question: 'How do complementary colors work?', answer: 'Complementary colors sit directly opposite each other on the color wheel (e.g., blue and orange). They create high contrast and visual tension, making them ideal for call-to-action elements and bold designs that need to stand out.' },
    { question: 'What is the best color palette for web design?', answer: 'There is no single best palette. Analogous palettes work well for calm, cohesive layouts. Complementary palettes are great for CTAs. Monochromatic palettes are ideal for subtle UI layers. Choose based on your brand goals and target audience.' },
    { question: 'How many colors should a palette have?', answer: 'Most effective design systems use 3 to 5 primary colors plus neutrals. The 60-30-10 rule recommends a dominant color (60%), secondary (30%), and accent (10%) for visual balance.' },
    { question: 'What is the difference between analogous and monochromatic?', answer: 'Analogous palettes use 2-3 neighboring hues on the color wheel (e.g., blue, blue-green, green). Monochromatic palettes use a single hue with varying lightness and saturation levels. Analogous offers more variety; monochromatic offers more unity.' },
  ],
  'mortgage-calculator': [
    { question: 'How is the monthly payment calculated?', answer: 'The calculator uses the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments. This gives you the fixed monthly payment that pays off the loan exactly by the end of the term.' },
    { question: 'Does the calculator include taxes and insurance?', answer: 'No. This calculator computes principal and interest only. Your actual monthly housing cost will also include property taxes, homeowners insurance, and possibly PMI and HOA fees. A common rule of thumb is to add 25-30% to the principal and interest payment for these costs.' },
    { question: 'What is an amortization schedule?', answer: 'An amortization schedule shows how each payment is split between principal (reducing your loan balance) and interest over the life of the loan. Early payments are mostly interest, while later payments are mostly principal. The schedule helps you understand how your equity builds over time.' },
    { question: 'Is my financial data stored anywhere?', answer: 'No. All calculations happen entirely in your browser using JavaScript. No data is ever sent to a server or stored anywhere.' },
    { question: 'How does down payment affect my mortgage?', answer: 'A larger down payment reduces your loan amount, which lowers both your monthly payment and total interest paid. Putting down at least 20% also eliminates the need for Private Mortgage Insurance (PMI), saving you an additional 0.5%–1% of the loan amount per year.' },
  ],
  'tip-calculator': [
    { question: 'What is the standard tip percentage?', answer: 'In the United States, 15%–20% is the standard tip for sit-down restaurant service. For excellent service, 20%–25% is common. For poor service, 10% is generally considered the minimum. Tipping customs vary significantly in other countries.' },
    { question: 'Should I tip on the pre-tax or post-tax amount?', answer: 'The standard practice is to calculate your tip on the pre-tax subtotal of your bill. However, tipping on the post-tax total has become increasingly common and is perfectly acceptable — the difference is usually small.' },
    { question: 'How does bill splitting work?', answer: 'The calculator divides the total amount (bill plus tip) equally among the number of people you specify. Each person pays the same share of both the original bill and the tip.' },
    { question: 'Is my data stored anywhere?', answer: 'No. All calculations happen entirely in your browser. No bill amounts, tip percentages, or other data is ever sent to a server.' },
  ],
  'bmi-calculator': [
    { question: 'What is BMI?', answer: 'BMI (Body Mass Index) is a number calculated from your height and weight using the formula: weight in kilograms divided by height in meters squared (kg/m²). It is used as a screening tool to categorize weight status into Underweight, Normal, Overweight, and Obese.' },
    { question: 'Is BMI accurate for athletes?', answer: 'BMI does not distinguish between muscle mass and body fat. Athletes and individuals with high muscle mass may have a BMI in the Overweight or Obese range despite having low body fat. For these individuals, body fat percentage or waist circumference are better indicators.' },
    { question: 'What is a healthy BMI?', answer: 'According to the World Health Organization (WHO), a healthy BMI falls between 18.5 and 24.9. This range is associated with the lowest risk of weight-related health problems. However, individual health depends on many factors beyond BMI alone.' },
    { question: 'Does BMI differ by age?', answer: 'For adults aged 20 and older, BMI categories are the same regardless of age. For children and teens (ages 2–19), BMI is interpreted using age- and sex-specific percentiles rather than fixed thresholds, because body composition changes during growth.' },
    { question: 'How is BMI calculated?', answer: 'BMI is calculated by dividing your weight in kilograms by your height in meters squared. For example, a person who is 1.70 m tall and weighs 70 kg has a BMI of 70 ÷ (1.70 × 1.70) = 24.2. In imperial units, multiply weight in pounds by 703 and divide by height in inches squared.' },
  ],
  'currency-converter': [
    { question: 'How accurate are the exchange rates?', answer: 'Rates are fetched from the European Central Bank via the Frankfurter API and updated daily. For precise trading rates, consult your bank or broker.' },
    { question: 'Does the converter support cryptocurrency?', answer: 'Yes, we support Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Dogecoin (DOGE) conversions against major fiat currencies.' },
    { question: 'Is my conversion data saved?', answer: 'No. All conversions happen locally in your browser. No data is sent to any server.' },
  ],
  'age-calculator': [
    { question: 'How does the age calculator work?', answer: 'Enter your date of birth and the calculator instantly computes your exact age in years, months, and days by comparing your birth date to today\'s date.' },
    { question: 'Can I calculate age for a future date?', answer: 'The calculator is designed for past birth dates. For future date calculations, try subtracting dates manually.' },
    { question: 'What generation am I?', answer: 'The calculator automatically shows your generation (Baby Boomer, Gen X, Millennial, Gen Z, or Gen Alpha) based on your birth year.' },
  ],
  'fraction-calculator': [
    { question: 'How do I add fractions with different denominators?', answer: 'Find the least common denominator (LCD), convert both fractions to use it, then add the numerators. Our calculator does this automatically and shows each step.' },
    { question: 'Can I convert decimals to fractions?', answer: 'Yes! Enter a decimal number in the conversion tab and the calculator will show the equivalent fraction in its simplest form.' },
    { question: 'Does it simplify fractions automatically?', answer: 'Yes, all results are automatically reduced to their simplest form using the greatest common divisor (GCD).' },
  ],
  'number-base-converter': [
    { question: 'What number bases are supported?', answer: 'The converter supports binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16).' },
    { question: 'What is the ASCII table?', answer: 'ASCII (American Standard Code for Information Interchange) maps numbers 0-127 to characters. For example, ASCII 65 = A, ASCII 97 = a.' },
    { question: 'How do I convert hex to decimal?', answer: 'Each hex digit represents a power of 16. For example, FF = 15×16 + 15 = 255. Our converter handles this instantly.' },
  ],
}
