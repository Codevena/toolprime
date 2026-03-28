export interface FormatConversion {
  slug: string
  from: string
  to: string
  title: string
  description: string
  intro: string
  steps: string[]
  toolId: string
  useCases: string[]
  faqs: Array<{ question: string; answer: string }>
  relatedConversions: string[]
}

export const formatConversions: FormatConversion[] = [
  // ─── JSON Formatter (8 entries) ───────────────────────────────────────────────
  {
    slug: 'json-to-csv',
    from: 'JSON',
    to: 'CSV',
    title: 'Convert JSON to CSV',
    description:
      'Convert JSON arrays to CSV format instantly with our free online tool. No signup required — paste, convert, and download.',
    intro:
      'Converting JSON to CSV is essential when you need to open structured data in spreadsheet applications like Excel or Google Sheets. This tool flattens JSON arrays of objects into clean, comma-separated rows and columns, preserving all your data fields.',
    steps: [
      'Open the JSON Formatter tool on ToolPrime',
      'Paste your JSON array into the input field',
      'Select "CSV" as the output format',
      'Click Convert to generate the CSV output',
      'Copy the result or download it as a .csv file',
    ],
    toolId: 'json-formatter',
    useCases: [
      'Export API response data into Excel for reporting',
      'Prepare JSON datasets for import into database tools',
      'Share structured data with non-technical team members',
      'Convert MongoDB exports to spreadsheet-friendly format',
    ],
    faqs: [
      {
        question: 'Does the converter handle nested JSON objects?',
        answer:
          'Nested objects are flattened using dot notation for column headers. For example, a field "address.city" becomes a single CSV column.',
      },
      {
        question: 'What happens if JSON objects have different keys?',
        answer:
          'The converter creates columns for all unique keys found across all objects. Missing values are left as empty cells in the CSV output.',
      },
      {
        question: 'Is there a size limit for JSON to CSV conversion?',
        answer:
          'The tool runs entirely in your browser, so it can handle files up to several megabytes without uploading anything to a server.',
      },
    ],
    relatedConversions: ['csv-to-json', 'json-to-xml', 'json-to-yaml'],
  },
  {
    slug: 'json-to-xml',
    from: 'JSON',
    to: 'XML',
    title: 'Convert JSON to XML',
    description:
      'Transform JSON data to well-formed XML with our free online converter. Instant results, no installation needed.',
    intro:
      'XML is still widely used in enterprise systems, SOAP APIs, and configuration files. When you have data in JSON and need to feed it into an XML-based workflow, this converter produces clean, valid XML with proper nesting and element names.',
    steps: [
      'Open the JSON Formatter tool on ToolPrime',
      'Paste your JSON data into the editor',
      'Choose "XML" from the output format dropdown',
      'Click Convert to transform the data',
      'Copy the XML output or download the file',
    ],
    toolId: 'json-formatter',
    useCases: [
      'Feed REST API data into legacy SOAP-based services',
      'Generate XML configuration files from JSON templates',
      'Prepare data for XML-based import tools like InDesign',
      'Convert JSON payloads for Android resource files',
    ],
    faqs: [
      {
        question: 'Does the output include an XML declaration?',
        answer:
          'Yes, the output includes a standard XML declaration with UTF-8 encoding at the top of the document.',
      },
      {
        question: 'How are JSON arrays represented in XML?',
        answer:
          'Array items are wrapped in repeating elements with an "item" tag by default. The parent element takes the name of the JSON key.',
      },
    ],
    relatedConversions: ['xml-to-json', 'json-to-csv', 'json-to-yaml'],
  },
  {
    slug: 'json-to-yaml',
    from: 'JSON',
    to: 'YAML',
    title: 'Convert JSON to YAML',
    description:
      'Convert JSON to YAML format online for free. Perfect for Docker, Kubernetes, and CI/CD config files.',
    intro:
      'YAML is the preferred format for configuration in Docker Compose, Kubernetes manifests, GitHub Actions, and many CI/CD tools. This converter transforms JSON into clean, human-readable YAML while preserving all data types and nested structures.',
    steps: [
      'Open the JSON Formatter tool on ToolPrime',
      'Paste your JSON content into the input area',
      'Select "YAML" as your desired output format',
      'Click Convert and review the YAML result',
      'Copy it directly into your config file',
    ],
    toolId: 'json-formatter',
    useCases: [
      'Convert package.json sections into YAML for CI pipelines',
      'Transform API schemas into YAML for OpenAPI specs',
      'Create Kubernetes manifests from JSON definitions',
      'Migrate JSON config files to YAML for better readability',
    ],
    faqs: [
      {
        question: 'Does the YAML output preserve data types?',
        answer:
          'Yes, strings, numbers, booleans, and null values are all correctly represented in the YAML output with proper typing.',
      },
      {
        question: 'Will multiline strings be formatted correctly?',
        answer:
          'Long strings are converted using YAML block scalar notation (| or >) to maintain readability.',
      },
      {
        question: 'Can I convert YAML back to JSON?',
        answer:
          'Not directly with this tool, but you can paste YAML into the JSON Formatter and it will auto-detect the format for conversion.',
      },
    ],
    relatedConversions: ['json-to-xml', 'json-to-csv', 'json-to-text'],
  },
  {
    slug: 'csv-to-json',
    from: 'CSV',
    to: 'JSON',
    title: 'Convert CSV to JSON',
    description:
      'Transform CSV spreadsheet data into structured JSON arrays with our free online tool. Fast, private, and browser-based.',
    intro:
      'When working with APIs, databases, or JavaScript applications, JSON is the standard data format. This tool converts CSV data — whether pasted from a spreadsheet or a raw file — into a properly structured JSON array of objects, using the header row as keys.',
    steps: [
      'Open the JSON Formatter tool on ToolPrime',
      'Paste your CSV data (with headers in the first row)',
      'Select "CSV to JSON" as the conversion mode',
      'Click Convert to generate the JSON array',
      'Copy the output to use in your application',
    ],
    toolId: 'json-formatter',
    useCases: [
      'Import spreadsheet exports into a Node.js application',
      'Prepare CSV datasets for API bulk-upload endpoints',
      'Convert Excel exports into JSON for frontend rendering',
      'Transform flat-file data for NoSQL database imports',
    ],
    faqs: [
      {
        question: 'What delimiter does the converter support?',
        answer:
          'The tool auto-detects commas, semicolons, and tab delimiters. It picks the most common separator found in your data.',
      },
      {
        question: 'Are numeric CSV values converted to JSON numbers?',
        answer:
          'Yes, the converter automatically detects numeric strings and converts them to proper JSON number types.',
      },
    ],
    relatedConversions: ['json-to-csv', 'json-to-xml', 'json-to-yaml'],
  },
  {
    slug: 'xml-to-json',
    from: 'XML',
    to: 'JSON',
    title: 'Convert XML to JSON',
    description:
      'Convert XML documents to JSON objects online for free. Handles attributes, namespaces, and nested elements.',
    intro:
      'Many legacy systems and SOAP APIs still return data in XML. Converting XML to JSON makes it easier to work with in modern JavaScript frameworks, REST APIs, and data pipelines. This tool parses your XML and produces a clean JSON representation.',
    steps: [
      'Open the JSON Formatter tool on ToolPrime',
      'Paste your XML document into the input field',
      'Select "XML to JSON" from the conversion options',
      'Click Convert to parse the XML',
      'Review and copy the resulting JSON output',
    ],
    toolId: 'json-formatter',
    useCases: [
      'Parse SOAP API responses for use in modern web apps',
      'Convert RSS/Atom feeds into JSON for frontend display',
      'Transform XML database exports for analytics tools',
      'Migrate legacy XML configuration to JSON format',
    ],
    faqs: [
      {
        question: 'How are XML attributes handled in JSON?',
        answer:
          'Attributes are converted to JSON properties prefixed with "@" to distinguish them from child elements.',
      },
      {
        question: 'Does the tool support XML namespaces?',
        answer:
          'Yes, namespaced elements are preserved in the JSON output using colon notation (e.g., "ns:element").',
      },
      {
        question: 'What about CDATA sections?',
        answer:
          'CDATA content is extracted as plain text and placed into the corresponding JSON string value.',
      },
    ],
    relatedConversions: ['json-to-xml', 'csv-to-json', 'json-to-yaml'],
  },
  {
    slug: 'json-to-text',
    from: 'JSON',
    to: 'Plain Text',
    title: 'Convert JSON to Text',
    description:
      'Convert JSON data to readable plain text with our free online tool. Ideal for logs, documentation, and reports.',
    intro:
      'Sometimes you need JSON data in a flat, human-readable text format — for documentation, email bodies, log files, or reports. This tool extracts key-value pairs from JSON and presents them as clean, indented plain text.',
    steps: [
      'Open the JSON Formatter tool on ToolPrime',
      'Paste your JSON data into the editor',
      'Select "Plain Text" as the output format',
      'Click Convert to flatten the structure',
      'Copy the readable text output',
    ],
    toolId: 'json-formatter',
    useCases: [
      'Generate readable summaries from API responses for reports',
      'Create plain-text log entries from structured JSON data',
      'Prepare JSON content for inclusion in emails or documents',
    ],
    faqs: [
      {
        question: 'How are nested objects displayed in text?',
        answer:
          'Nested objects are indented with each level, and keys are shown with their full path for clarity.',
      },
      {
        question: 'Are arrays formatted as bullet points?',
        answer:
          'Array items are listed on separate lines with dash prefixes, making them easy to scan.',
      },
    ],
    relatedConversions: ['json-to-csv', 'json-to-html-table', 'json-to-yaml'],
  },
  {
    slug: 'json-to-html-table',
    from: 'JSON',
    to: 'HTML Table',
    title: 'Convert JSON to HTML Table',
    description:
      'Turn JSON arrays into styled HTML tables instantly. Free online tool — no coding required.',
    intro:
      'Displaying JSON data in a table is one of the most common frontend tasks. This tool takes a JSON array of objects and generates a complete HTML table with proper thead, tbody, and th/td elements ready to drop into any webpage.',
    steps: [
      'Open the JSON Formatter tool on ToolPrime',
      'Paste a JSON array of objects',
      'Select "HTML Table" as the output format',
      'Click Convert to generate the table markup',
      'Copy the HTML and paste it into your project',
    ],
    toolId: 'json-formatter',
    useCases: [
      'Quickly prototype data tables for dashboards',
      'Generate HTML reports from JSON API data',
      'Create email-safe table layouts from structured data',
      'Build static HTML pages displaying dynamic datasets',
    ],
    faqs: [
      {
        question: 'Does the HTML table include CSS styling?',
        answer:
          'The generated table includes basic inline styles for borders and padding. You can easily replace them with your own CSS classes.',
      },
      {
        question: 'Can I customize column order?',
        answer:
          'Columns follow the order of keys in the first JSON object. Reorder the keys in your JSON to change column order.',
      },
    ],
    relatedConversions: ['json-to-csv', 'json-to-text', 'json-to-xml'],
  },
  {
    slug: 'minify-json',
    from: 'JSON',
    to: 'Minified JSON',
    title: 'Minify JSON',
    description:
      'Minify and compress JSON by removing whitespace and formatting. Free online JSON minifier for smaller payloads.',
    intro:
      'Minified JSON removes all unnecessary whitespace, newlines, and indentation to produce the smallest possible payload. This is critical for reducing bandwidth in API responses, config files shipped to clients, and data stored in compact formats.',
    steps: [
      'Open the JSON Formatter tool on ToolPrime',
      'Paste your formatted JSON into the input area',
      'Click the Minify button',
      'Copy the compact, single-line JSON output',
    ],
    toolId: 'json-formatter',
    useCases: [
      'Reduce API response payload size for faster transfers',
      'Compress JSON config files before embedding in code',
      'Prepare minified JSON for URL query parameters',
      'Shrink JSON data for localStorage or cookie storage',
    ],
    faqs: [
      {
        question: 'Does minifying JSON change the data?',
        answer:
          'No, minification only removes whitespace and formatting. The data structure and values remain identical.',
      },
      {
        question: 'How much smaller does minified JSON get?',
        answer:
          'Typically 20-40% smaller than pretty-printed JSON, depending on the depth of nesting and length of keys.',
      },
      {
        question: 'Can I re-format minified JSON later?',
        answer:
          'Absolutely. Paste minified JSON back into the tool and click Format to restore readable indentation.',
      },
    ],
    relatedConversions: ['json-to-csv', 'json-to-yaml', 'json-to-text'],
  },

  // ─── Base64 (6 entries) ───────────────────────────────────────────────────────
  {
    slug: 'text-to-base64',
    from: 'Text',
    to: 'Base64',
    title: 'Convert Text to Base64',
    description:
      'Encode any text string to Base64 format online for free. Supports UTF-8 and special characters.',
    intro:
      'Base64 encoding converts text into an ASCII string that can be safely transmitted through systems that only support text, such as email (MIME), URLs, or JSON payloads. This tool handles full UTF-8 input including accented characters and emoji.',
    steps: [
      'Open the Base64 Encode/Decode tool on ToolPrime',
      'Type or paste your text into the input field',
      'The Base64 encoded output appears instantly',
      'Copy the encoded string for use in your project',
    ],
    toolId: 'base64-encode-decode',
    useCases: [
      'Encode API keys for HTTP Basic Authentication headers',
      'Embed text content in data URIs for web pages',
      'Prepare strings for safe transmission in XML or JSON',
      'Encode configuration values for environment variables',
    ],
    faqs: [
      {
        question: 'Is Base64 encoding the same as encryption?',
        answer:
          'No. Base64 is an encoding scheme, not encryption. Anyone can decode it. Never use Base64 to protect sensitive data.',
      },
      {
        question: 'Does Base64 support Unicode and emoji?',
        answer:
          'Yes, this tool first encodes text as UTF-8 bytes, then converts those bytes to Base64, preserving all Unicode characters.',
      },
    ],
    relatedConversions: ['base64-to-text', 'file-to-base64', 'text-to-url-encoded'],
  },
  {
    slug: 'base64-to-text',
    from: 'Base64',
    to: 'Text',
    title: 'Decode Base64 to Text',
    description:
      'Decode Base64 encoded strings back to readable text instantly. Free online Base64 decoder tool.',
    intro:
      'When you encounter a Base64-encoded string in an API response, email header, JWT token, or configuration file, this tool decodes it back to readable UTF-8 text in your browser — no data is sent to any server.',
    steps: [
      'Open the Base64 Encode/Decode tool on ToolPrime',
      'Paste the Base64 encoded string',
      'Switch to Decode mode if not already selected',
      'View the decoded plain text output instantly',
    ],
    toolId: 'base64-encode-decode',
    useCases: [
      'Decode JWT token payloads for debugging authentication',
      'Read Base64-encoded email attachments and headers',
      'Inspect encoded values in configuration files',
      'Debug API responses containing Base64 data',
    ],
    faqs: [
      {
        question: 'What if the decoded output looks like garbage?',
        answer:
          'The Base64 string may encode binary data (like an image) rather than text. Try the Base64 to Image converter instead.',
      },
      {
        question: 'Does this handle URL-safe Base64?',
        answer:
          'Yes, the decoder accepts both standard Base64 and URL-safe Base64 variants (with - and _ instead of + and /).',
      },
    ],
    relatedConversions: ['text-to-base64', 'base64-to-image', 'base64-to-hex'],
  },
  {
    slug: 'image-to-base64',
    from: 'Image',
    to: 'Base64',
    title: 'Convert Image to Base64',
    description:
      'Encode images (PNG, JPG, SVG, GIF) to Base64 data URIs online for free. Embed images directly in HTML or CSS.',
    intro:
      'Base64-encoded images can be embedded directly into HTML, CSS, or JSON without needing a separate file request. This is useful for small icons, email templates, and single-file HTML documents where reducing HTTP requests matters.',
    steps: [
      'Open the Base64 Encode/Decode tool on ToolPrime',
      'Click the file upload button or drag an image onto the page',
      'The tool generates a complete data URI with the correct MIME type',
      'Copy the data URI to use in an img src attribute or CSS background',
    ],
    toolId: 'base64-encode-decode',
    useCases: [
      'Embed small icons in HTML email templates',
      'Include logos in CSS without extra HTTP requests',
      'Store thumbnail images as strings in a JSON config',
      'Create self-contained HTML files with inline images',
    ],
    faqs: [
      {
        question: 'How much larger is a Base64-encoded image?',
        answer:
          'Base64 encoding increases file size by approximately 33%. It is best suited for images under 10 KB.',
      },
      {
        question: 'Which image formats are supported?',
        answer:
          'The tool supports PNG, JPEG, GIF, SVG, WebP, and ICO formats. The correct MIME type is automatically detected.',
      },
      {
        question: 'Can I use Base64 images in CSS?',
        answer:
          'Yes, use the data URI as a background-image value: background-image: url(data:image/png;base64,...).',
      },
    ],
    relatedConversions: ['base64-to-image', 'text-to-base64', 'file-to-base64'],
  },
  {
    slug: 'base64-to-image',
    from: 'Base64',
    to: 'Image',
    title: 'Convert Base64 to Image',
    description:
      'Decode Base64 strings to preview and download images. Free online tool — supports PNG, JPG, GIF, and SVG.',
    intro:
      'Developers often encounter Base64-encoded image strings in API responses, database records, or embedded HTML. This tool decodes the string into a visible image preview and lets you download the original file.',
    steps: [
      'Open the Base64 Encode/Decode tool on ToolPrime',
      'Paste the Base64-encoded image string (with or without the data URI prefix)',
      'The image preview renders automatically',
      'Click Download to save the image as a file',
    ],
    toolId: 'base64-encode-decode',
    useCases: [
      'Preview Base64 images found in API responses or database fields',
      'Extract embedded images from HTML email source code',
      'Download images stored as Base64 in JSON configuration',
      'Debug image rendering issues by verifying the Base64 payload',
    ],
    faqs: [
      {
        question: 'Do I need to include the data URI prefix?',
        answer:
          'No. The tool works with both raw Base64 strings and full data URIs (data:image/png;base64,...). It detects the format automatically.',
      },
      {
        question: 'What file format is the downloaded image?',
        answer:
          'The tool detects the original format from the Base64 data header and saves it with the correct extension.',
      },
    ],
    relatedConversions: ['image-to-base64', 'base64-to-text', 'compress-png'],
  },
  {
    slug: 'file-to-base64',
    from: 'File',
    to: 'Base64',
    title: 'Convert File to Base64',
    description:
      'Encode any file to Base64 string online. Free tool for PDFs, documents, fonts, and more — runs in your browser.',
    intro:
      'Sometimes you need to embed a file directly into source code, a JSON payload, or transmit it through a text-only channel. This tool reads any file and produces a Base64 string along with the proper MIME type for data URI usage.',
    steps: [
      'Open the Base64 Encode/Decode tool on ToolPrime',
      'Click the upload button and select any file from your device',
      'The tool reads the file locally and produces the Base64 output',
      'Copy the encoded string or the full data URI',
    ],
    toolId: 'base64-encode-decode',
    useCases: [
      'Embed PDF documents in JSON API requests',
      'Encode font files for inline CSS @font-face declarations',
      'Attach files to webhook payloads that only support text',
      'Store small binary assets as strings in configuration files',
    ],
    faqs: [
      {
        question: 'Is my file uploaded to a server?',
        answer:
          'No. All processing happens in your browser using the FileReader API. Your file never leaves your device.',
      },
      {
        question: 'What is the maximum file size?',
        answer:
          'Browser memory is the only limit. For best performance, keep files under 10 MB. Larger files may cause slowdowns.',
      },
    ],
    relatedConversions: ['image-to-base64', 'text-to-base64', 'base64-to-text'],
  },
  {
    slug: 'base64-to-hex',
    from: 'Base64',
    to: 'Hexadecimal',
    title: 'Convert Base64 to Hex',
    description:
      'Decode Base64 strings to hexadecimal representation. Free online converter for developers and security researchers.',
    intro:
      'Hexadecimal is the standard way to inspect raw bytes in cryptography, networking, and low-level programming. This tool decodes a Base64 string and displays each byte as a two-character hex value, useful for debugging hashes, encryption, and binary protocols.',
    steps: [
      'Open the Base64 Encode/Decode tool on ToolPrime',
      'Paste the Base64 string you want to inspect',
      'Select "Hex" as the output format',
      'View the hexadecimal byte representation',
    ],
    toolId: 'base64-encode-decode',
    useCases: [
      'Inspect cryptographic hash values encoded in Base64',
      'Debug binary protocol payloads in networking tools',
      'Verify encryption key bytes from Base64-encoded secrets',
    ],
    faqs: [
      {
        question: 'What format does the hex output use?',
        answer:
          'Bytes are displayed as two-character hex pairs (e.g., "48 65 6c 6c 6f"), optionally separated by spaces for readability.',
      },
      {
        question: 'Can I convert hex back to Base64?',
        answer:
          'Not directly in this tool, but you can paste hex values and use online hex-to-Base64 converters for the reverse operation.',
      },
    ],
    relatedConversions: ['base64-to-text', 'text-to-base64', 'text-to-md5'],
  },

  // ─── URL Encode/Decode (4 entries) ────────────────────────────────────────────
  {
    slug: 'text-to-url-encoded',
    from: 'Text',
    to: 'URL Encoded',
    title: 'URL Encode Text',
    description:
      'Encode text for safe use in URLs and query strings. Free online URL encoder with full UTF-8 support.',
    intro:
      'URL encoding (percent-encoding) replaces unsafe characters with percent-sign hex codes so they can be included in URLs without breaking the structure. This is essential for query parameters, form data, and any text embedded in a URL.',
    steps: [
      'Open the URL Encode/Decode tool on ToolPrime',
      'Paste or type the text you want to encode',
      'The URL-encoded output updates in real time',
      'Copy the encoded string for your URL or API call',
    ],
    toolId: 'url-encode-decode',
    useCases: [
      'Encode user-submitted search queries for URL parameters',
      'Prepare special characters for REST API query strings',
      'Encode filenames with spaces for download URLs',
      'Sanitize text for safe inclusion in mailto: links',
    ],
    faqs: [
      {
        question: 'What characters get encoded?',
        answer:
          'All characters except A-Z, a-z, 0-9, and -_.~ are percent-encoded. Spaces become %20 (or + in form encoding).',
      },
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer:
          'encodeURI preserves URL structure characters like / and ?. encodeURIComponent encodes everything except unreserved characters, making it safer for query parameter values.',
      },
    ],
    relatedConversions: ['url-encoded-to-text', 'encode-url-params', 'text-to-base64'],
  },
  {
    slug: 'url-encoded-to-text',
    from: 'URL Encoded',
    to: 'Text',
    title: 'URL Decode to Text',
    description:
      'Decode percent-encoded URL strings back to readable text. Free online URL decoder — handles UTF-8.',
    intro:
      'When you see %20, %3A, or other percent-encoded characters in a URL, log file, or API response, this tool converts them back to readable text. It handles both standard percent-encoding and form-encoded plus signs.',
    steps: [
      'Open the URL Encode/Decode tool on ToolPrime',
      'Paste the URL-encoded string',
      'Switch to Decode mode',
      'Read the decoded plain text result instantly',
    ],
    toolId: 'url-encode-decode',
    useCases: [
      'Decode URLs copied from browser address bars',
      'Read encoded query parameters in server log files',
      'Debug webhook payloads with URL-encoded form data',
      'Decode tracking URLs from email marketing platforms',
    ],
    faqs: [
      {
        question: 'Does it decode + signs as spaces?',
        answer:
          'Yes. In form-encoded data (application/x-www-form-urlencoded), plus signs represent spaces and are decoded accordingly.',
      },
      {
        question: 'Can I decode an entire URL at once?',
        answer:
          'Yes, paste the full URL and the tool will decode all percent-encoded characters while preserving the URL structure.',
      },
    ],
    relatedConversions: ['text-to-url-encoded', 'decode-query-string', 'base64-to-text'],
  },
  {
    slug: 'encode-url-params',
    from: 'Key-Value Pairs',
    to: 'URL Query String',
    title: 'Encode URL Parameters',
    description:
      'Build properly encoded URL query strings from key-value pairs. Free online query string builder tool.',
    intro:
      'Manually constructing URL query strings with special characters is error-prone. This tool takes key-value pairs and produces a properly percent-encoded query string, handling all edge cases like ampersands in values and Unicode characters.',
    steps: [
      'Open the URL Encode/Decode tool on ToolPrime',
      'Enter your parameters as key-value pairs',
      'The tool builds the encoded query string automatically',
      'Copy the result and append it to your base URL',
    ],
    toolId: 'url-encode-decode',
    useCases: [
      'Build complex API request URLs with multiple parameters',
      'Construct OAuth callback URLs with encoded redirect URIs',
      'Generate affiliate tracking links with encoded metadata',
    ],
    faqs: [
      {
        question: 'Does this handle arrays in query parameters?',
        answer:
          'Yes, array values can be encoded using bracket notation (key[]=value1&key[]=value2) or comma-separated formats.',
      },
      {
        question: 'Are ampersands in values handled correctly?',
        answer:
          'Absolutely. Ampersands within values are encoded as %26 so they do not break the query string structure.',
      },
    ],
    relatedConversions: ['decode-query-string', 'text-to-url-encoded', 'url-encoded-to-text'],
  },
  {
    slug: 'decode-query-string',
    from: 'URL Query String',
    to: 'Key-Value Pairs',
    title: 'Decode Query String',
    description:
      'Parse and decode URL query strings into readable key-value pairs. Free online query string decoder.',
    intro:
      'Long query strings are hard to read, especially when values contain encoded characters. This tool splits a query string into individual key-value pairs and decodes each one, making it easy to understand what parameters are being passed.',
    steps: [
      'Open the URL Encode/Decode tool on ToolPrime',
      'Paste a URL or just the query string portion',
      'The tool parses it into individual decoded parameters',
      'Review each key-value pair in the clean output table',
    ],
    toolId: 'url-encode-decode',
    useCases: [
      'Debug complex API request URLs with many parameters',
      'Analyze marketing campaign tracking URLs',
      'Inspect OAuth and SSO redirect URLs with encoded tokens',
      'Parse analytics parameters from long advertising URLs',
    ],
    faqs: [
      {
        question: 'Does it handle duplicate keys?',
        answer:
          'Yes, duplicate keys are listed separately so you can see all values. This is common with array-style parameters.',
      },
      {
        question: 'Can I paste a full URL or just the query string?',
        answer:
          'Both work. If you paste a full URL, the tool extracts and decodes just the query string portion after the ? character.',
      },
    ],
    relatedConversions: ['encode-url-params', 'url-encoded-to-text', 'text-to-url-encoded'],
  },

  // ─── Hash Generator (6 entries) ───────────────────────────────────────────────
  {
    slug: 'text-to-md5',
    from: 'Text',
    to: 'MD5 Hash',
    title: 'Generate MD5 Hash',
    description:
      'Generate MD5 hash values from any text string instantly. Free online MD5 generator — no data sent to servers.',
    intro:
      'MD5 produces a 128-bit (32-character hexadecimal) hash value. While no longer recommended for security purposes, MD5 is still widely used for checksums, cache busting, data deduplication, and quick file integrity checks.',
    steps: [
      'Open the Hash Generator tool on ToolPrime',
      'Enter or paste the text you want to hash',
      'Select MD5 from the algorithm options',
      'Copy the 32-character hexadecimal hash output',
    ],
    toolId: 'hash-generator',
    useCases: [
      'Generate cache-busting hashes for static asset URLs',
      'Create deterministic IDs from input strings for deduplication',
      'Verify file integrity by comparing MD5 checksums',
      'Generate Gravatar URLs from email addresses',
    ],
    faqs: [
      {
        question: 'Is MD5 secure for password hashing?',
        answer:
          'No. MD5 is vulnerable to collision attacks and should never be used for passwords or security. Use bcrypt, scrypt, or Argon2 instead.',
      },
      {
        question: 'Will the same input always produce the same MD5?',
        answer:
          'Yes. MD5 is deterministic — identical input always produces the identical 32-character hash, regardless of when or where you compute it.',
      },
    ],
    relatedConversions: ['text-to-sha256', 'text-to-sha1', 'md5-checksum'],
  },
  {
    slug: 'text-to-sha256',
    from: 'Text',
    to: 'SHA-256 Hash',
    title: 'Generate SHA-256 Hash',
    description:
      'Create SHA-256 hashes from text online for free. Industry-standard 256-bit hash for security and integrity checks.',
    intro:
      'SHA-256 is part of the SHA-2 family and produces a 256-bit (64-character hex) hash. It is the industry standard for digital signatures, certificate verification, blockchain, and secure data integrity checks where collision resistance matters.',
    steps: [
      'Open the Hash Generator tool on ToolPrime',
      'Paste or type the string to hash',
      'Select SHA-256 as the hashing algorithm',
      'Copy the 64-character hexadecimal output',
    ],
    toolId: 'hash-generator',
    useCases: [
      'Verify software download integrity with published checksums',
      'Create content-addressable storage keys for file systems',
      'Generate webhook signature verification hashes',
      'Compute commit-style hashes for data versioning',
    ],
    faqs: [
      {
        question: 'Is SHA-256 suitable for password storage?',
        answer:
          'Plain SHA-256 is too fast for password hashing. Use bcrypt or Argon2 which add deliberate slowness. SHA-256 is ideal for integrity checks.',
      },
      {
        question: 'What is the difference between SHA-256 and SHA-512?',
        answer:
          'SHA-256 produces a 32-byte hash, SHA-512 produces a 64-byte hash. SHA-512 can be faster on 64-bit systems but both offer strong collision resistance.',
      },
      {
        question: 'Is SHA-256 used in Bitcoin?',
        answer:
          'Yes, Bitcoin uses double SHA-256 (hashing the hash) for proof-of-work mining and transaction verification.',
      },
    ],
    relatedConversions: ['text-to-sha512', 'text-to-md5', 'sha256-checksum'],
  },
  {
    slug: 'text-to-sha512',
    from: 'Text',
    to: 'SHA-512 Hash',
    title: 'Generate SHA-512 Hash',
    description:
      'Generate SHA-512 hashes from text strings. Free online tool producing 128-character hexadecimal digests.',
    intro:
      'SHA-512 offers the strongest hash in the SHA-2 family, producing a 512-bit (128-character hex) digest. It provides a massive output space and can actually run faster than SHA-256 on modern 64-bit processors, making it ideal for high-security applications.',
    steps: [
      'Open the Hash Generator tool on ToolPrime',
      'Enter the text you need to hash',
      'Choose SHA-512 from the algorithm selector',
      'Copy the 128-character hexadecimal hash',
    ],
    toolId: 'hash-generator',
    useCases: [
      'Generate high-security checksums for sensitive documents',
      'Create long hash keys for cryptographic applications',
      'Verify large file integrity where collision risk must be minimal',
    ],
    faqs: [
      {
        question: 'When should I use SHA-512 over SHA-256?',
        answer:
          'Use SHA-512 when working on 64-bit systems where it is natively faster, or when you need a larger hash output for extra collision resistance.',
      },
      {
        question: 'How long is a SHA-512 hash?',
        answer:
          'SHA-512 produces a 128-character hexadecimal string (512 bits / 4 bits per hex digit = 128 characters).',
      },
    ],
    relatedConversions: ['text-to-sha256', 'text-to-md5', 'text-to-sha1'],
  },
  {
    slug: 'text-to-sha1',
    from: 'Text',
    to: 'SHA-1 Hash',
    title: 'Generate SHA-1 Hash',
    description:
      'Generate SHA-1 hash values from text instantly. Free online tool — useful for Git commits and legacy systems.',
    intro:
      'SHA-1 produces a 160-bit (40-character hex) hash. Although deprecated for security uses due to known collision attacks, SHA-1 remains relevant in Git (which uses it for commit hashes), legacy system integration, and non-security fingerprinting.',
    steps: [
      'Open the Hash Generator tool on ToolPrime',
      'Type or paste your input text',
      'Select SHA-1 as the algorithm',
      'View and copy the 40-character hash result',
    ],
    toolId: 'hash-generator',
    useCases: [
      'Compute Git-style object hashes for comparison',
      'Interface with legacy systems that require SHA-1 signatures',
      'Generate short content fingerprints for caching',
    ],
    faqs: [
      {
        question: 'Is SHA-1 still safe to use?',
        answer:
          'SHA-1 is broken for collision resistance and should not be used for security. It is acceptable for non-security purposes like checksums and Git.',
      },
      {
        question: 'Why does Git still use SHA-1?',
        answer:
          'Git uses SHA-1 for content addressing, not security. Git is transitioning to SHA-256, but SHA-1 remains the default in most installations.',
      },
    ],
    relatedConversions: ['text-to-sha256', 'text-to-md5', 'text-to-sha512'],
  },
  {
    slug: 'md5-checksum',
    from: 'File',
    to: 'MD5 Checksum',
    title: 'MD5 Checksum Generator',
    description:
      'Calculate MD5 checksums for files to verify downloads and data integrity. Free online tool, fully browser-based.',
    intro:
      'MD5 checksums are commonly published alongside software downloads so users can verify file integrity. This tool computes the MD5 hash of any file directly in your browser, letting you compare it against the published checksum to confirm nothing was corrupted or tampered with.',
    steps: [
      'Open the Hash Generator tool on ToolPrime',
      'Upload the file you want to verify',
      'The tool computes the MD5 checksum locally',
      'Compare the result with the published checksum',
    ],
    toolId: 'hash-generator',
    useCases: [
      'Verify downloaded software installers against official checksums',
      'Check file integrity after network transfers or backups',
      'Compare two files by their checksums without opening them',
      'Validate firmware images before flashing devices',
    ],
    faqs: [
      {
        question: 'Does the file get uploaded anywhere?',
        answer:
          'No. The MD5 checksum is calculated entirely in your browser using the Web Crypto API. Your file never leaves your device.',
      },
      {
        question: 'Should I use MD5 or SHA-256 for file verification?',
        answer:
          'SHA-256 is more secure, but MD5 is fine for casual integrity checks. Use whichever matches the checksum provided by the file publisher.',
      },
    ],
    relatedConversions: ['sha256-checksum', 'text-to-md5', 'text-to-sha256'],
  },
  {
    slug: 'sha256-checksum',
    from: 'File',
    to: 'SHA-256 Checksum',
    title: 'SHA-256 Checksum Generator',
    description:
      'Generate SHA-256 checksums for files in your browser. Free online tool for secure file integrity verification.',
    intro:
      'SHA-256 file checksums are the gold standard for verifying download integrity. Many Linux distributions, security tools, and software publishers provide SHA-256 hashes. This tool calculates the hash locally so you can confirm your file matches exactly.',
    steps: [
      'Open the Hash Generator tool on ToolPrime',
      'Upload the file you need to verify',
      'Select SHA-256 as the checksum algorithm',
      'Compare the 64-character hash with the expected value',
    ],
    toolId: 'hash-generator',
    useCases: [
      'Verify Linux ISO downloads against official SHA-256 hashes',
      'Confirm backup file integrity after cloud storage transfers',
      'Validate package downloads in CI/CD pipelines',
      'Check firmware integrity before deploying to IoT devices',
    ],
    faqs: [
      {
        question: 'How do I compare checksums?',
        answer:
          'Copy the generated hash and the expected hash into a text editor and compare them. They must match exactly — even one character difference means the file is different.',
      },
      {
        question: 'Is this tool secure for verifying important files?',
        answer:
          'Yes. The hash runs locally in your browser, and SHA-256 is cryptographically strong for integrity verification.',
      },
    ],
    relatedConversions: ['md5-checksum', 'text-to-sha256', 'text-to-sha512'],
  },

  // ─── Case Converter (6 entries) ───────────────────────────────────────────────
  {
    slug: 'text-to-camelcase',
    from: 'Text',
    to: 'camelCase',
    title: 'Convert Text to camelCase',
    description:
      'Convert any text to camelCase for JavaScript variables and function names. Free online case converter tool.',
    intro:
      'camelCase is the standard naming convention for variables and functions in JavaScript, TypeScript, Java, and many other languages. This tool converts any text — whether space-separated, snake_case, or kebab-case — into proper camelCase.',
    steps: [
      'Open the Case Converter tool on ToolPrime',
      'Paste or type your text',
      'Select camelCase from the conversion options',
      'Copy the converted output',
    ],
    toolId: 'case-converter',
    useCases: [
      'Convert database column names to JavaScript variable names',
      'Transform API response keys to match frontend conventions',
      'Rename CSS class names to camelCase for JSX style objects',
      'Convert headings or labels into valid function names',
    ],
    faqs: [
      {
        question: 'What is the difference between camelCase and PascalCase?',
        answer:
          'camelCase starts with a lowercase letter (myVariable), while PascalCase starts with uppercase (MyVariable). Use camelCase for variables and PascalCase for classes.',
      },
      {
        question: 'How does the tool handle acronyms?',
        answer:
          'Acronyms like "HTTP" or "API" are treated as a single word and lowercased appropriately (e.g., "http response" becomes "httpResponse").',
      },
    ],
    relatedConversions: ['text-to-pascal-case', 'text-to-snake-case', 'text-to-kebab-case'],
  },
  {
    slug: 'text-to-snake-case',
    from: 'Text',
    to: 'snake_case',
    title: 'Convert Text to snake_case',
    description:
      'Convert text to snake_case for Python, Ruby, and database column names. Free online converter tool.',
    intro:
      'snake_case uses lowercase letters with underscores between words. It is the standard naming convention in Python (PEP 8), Ruby, Rust, and SQL databases. This tool handles input from any format including camelCase, PascalCase, and regular sentences.',
    steps: [
      'Open the Case Converter tool on ToolPrime',
      'Enter the text you want to convert',
      'Choose snake_case from the output options',
      'Copy the underscore-separated result',
    ],
    toolId: 'case-converter',
    useCases: [
      'Convert JavaScript variable names to Python conventions',
      'Generate database column names from human-readable labels',
      'Transform API response keys to match Ruby on Rails models',
      'Create file names from titles using underscore separation',
    ],
    faqs: [
      {
        question: 'Does it handle consecutive uppercase letters?',
        answer:
          'Yes. "HTMLParser" becomes "html_parser" — the tool detects word boundaries in acronyms and inserts underscores correctly.',
      },
      {
        question: 'What about numbers in the text?',
        answer:
          'Numbers are preserved in place. "version2Update" becomes "version_2_update" with underscores separating numeric boundaries.',
      },
    ],
    relatedConversions: ['text-to-camelcase', 'text-to-kebab-case', 'text-to-pascal-case'],
  },
  {
    slug: 'text-to-kebab-case',
    from: 'Text',
    to: 'kebab-case',
    title: 'Convert Text to kebab-case',
    description:
      'Convert text to kebab-case for CSS classes, URLs, and file names. Free online kebab-case converter.',
    intro:
      'kebab-case (also called dash-case) uses lowercase letters separated by hyphens. It is the convention for CSS class names, URL slugs, HTML attributes, and CLI flags. This tool converts from any text format into clean kebab-case.',
    steps: [
      'Open the Case Converter tool on ToolPrime',
      'Paste your text in any format',
      'Select kebab-case as the target format',
      'Copy the hyphen-separated output',
    ],
    toolId: 'case-converter',
    useCases: [
      'Generate URL-friendly slugs from page titles',
      'Create BEM-style CSS class names from descriptions',
      'Convert component names to file names in Angular projects',
      'Build CLI flag names from camelCase config keys',
    ],
    faqs: [
      {
        question: 'Is kebab-case the same as slug format?',
        answer:
          'Very similar. URL slugs are typically kebab-case but may also strip special characters and accents for maximum URL compatibility.',
      },
      {
        question: 'Can I convert kebab-case back to camelCase?',
        answer:
          'Yes, paste kebab-case text into the tool and select camelCase. The tool recognizes hyphens as word separators.',
      },
    ],
    relatedConversions: ['text-to-camelcase', 'text-to-snake-case', 'text-to-pascal-case'],
  },
  {
    slug: 'text-to-pascal-case',
    from: 'Text',
    to: 'PascalCase',
    title: 'Convert Text to PascalCase',
    description:
      'Convert text to PascalCase for class names and component names. Free online case converter tool.',
    intro:
      'PascalCase capitalizes the first letter of every word with no separators. It is the standard for class names in most languages, React component names, C# methods, and TypeScript interfaces. This tool converts from any text format.',
    steps: [
      'Open the Case Converter tool on ToolPrime',
      'Enter your text in any format',
      'Choose PascalCase from the output options',
      'Copy the result for use in your code',
    ],
    toolId: 'case-converter',
    useCases: [
      'Generate React component names from file names or descriptions',
      'Convert database table names to C# class names',
      'Create TypeScript interface names from API resource names',
      'Transform kebab-case filenames to class names in Angular',
    ],
    faqs: [
      {
        question: 'When should I use PascalCase vs camelCase?',
        answer:
          'Use PascalCase for class names, component names, interfaces, and type aliases. Use camelCase for variables, functions, and properties.',
      },
      {
        question: 'How does PascalCase handle single-letter words?',
        answer:
          'Single letters are capitalized normally. For example, "a b c" becomes "ABC" and "get x value" becomes "GetXValue".',
      },
    ],
    relatedConversions: ['text-to-camelcase', 'text-to-snake-case', 'text-to-kebab-case'],
  },
  {
    slug: 'uppercase-to-lowercase',
    from: 'UPPERCASE',
    to: 'lowercase',
    title: 'Convert Uppercase to Lowercase',
    description:
      'Convert UPPERCASE text to lowercase instantly. Free online tool for fixing caps lock text and formatting.',
    intro:
      'Accidentally typed an entire paragraph in caps lock? Need to normalize user input for case-insensitive comparison? This tool converts any text to all lowercase characters while preserving numbers, punctuation, and spacing.',
    steps: [
      'Open the Case Converter tool on ToolPrime',
      'Paste the uppercase text',
      'Select "lowercase" as the output format',
      'Copy the lowercased result',
    ],
    toolId: 'case-converter',
    useCases: [
      'Fix accidentally caps-locked paragraphs without retyping',
      'Normalize user input for case-insensitive search matching',
      'Convert product codes or SKUs to lowercase for URL slugs',
    ],
    faqs: [
      {
        question: 'Does this handle accented characters?',
        answer:
          'Yes, accented and international characters are lowercased correctly using Unicode-aware transformation.',
      },
      {
        question: 'Are numbers and symbols affected?',
        answer:
          'No, only alphabetic characters are converted. Numbers, punctuation, and whitespace remain unchanged.',
      },
    ],
    relatedConversions: ['lowercase-to-uppercase', 'text-to-camelcase', 'text-to-kebab-case'],
  },
  {
    slug: 'lowercase-to-uppercase',
    from: 'lowercase',
    to: 'UPPERCASE',
    title: 'Convert Lowercase to Uppercase',
    description:
      'Convert lowercase text to UPPERCASE instantly. Free online tool for headings, constants, and emphasis.',
    intro:
      'Uppercase text is used for constant names in programming, headings, acronyms, and emphasis in writing. This tool converts all lowercase letters to their uppercase equivalents while preserving everything else.',
    steps: [
      'Open the Case Converter tool on ToolPrime',
      'Paste the text you want to capitalize',
      'Select "UPPERCASE" as the output format',
      'Copy the fully capitalized result',
    ],
    toolId: 'case-converter',
    useCases: [
      'Convert constant names to SCREAMING_SNAKE_CASE convention',
      'Create attention-grabbing headings and banner text',
      'Format environment variable names from lowercase text',
      'Capitalize acronyms in documentation consistently',
    ],
    faqs: [
      {
        question: 'Can I combine this with other case conversions?',
        answer:
          'Yes, you can first convert to uppercase and then apply snake_case to get SCREAMING_SNAKE_CASE, commonly used for constants.',
      },
      {
        question: 'Does it work with non-Latin alphabets?',
        answer:
          'Yes, the tool uses Unicode-aware uppercasing, so Greek, Cyrillic, and other scripts with case distinctions are handled correctly.',
      },
    ],
    relatedConversions: ['uppercase-to-lowercase', 'text-to-pascal-case', 'text-to-snake-case'],
  },

  // ─── Image Compressor (6 entries) ─────────────────────────────────────────────
  {
    slug: 'compress-png',
    from: 'PNG',
    to: 'Compressed PNG',
    title: 'Compress PNG Images',
    description:
      'Compress PNG files by up to 80% while keeping transparency and quality. Free online PNG compressor tool.',
    intro:
      'PNG files are essential for images that need transparency, but they can be much larger than necessary. This tool applies lossless and near-lossless compression techniques to reduce PNG file sizes dramatically, which directly improves page load speed and Core Web Vitals.',
    steps: [
      'Open the Image Compressor tool on ToolPrime',
      'Upload or drag your PNG file onto the page',
      'Adjust the compression level slider if desired',
      'Preview the compressed image and compare file sizes',
      'Download the optimized PNG',
    ],
    toolId: 'image-compressor',
    useCases: [
      'Optimize PNG icons and logos for faster website loading',
      'Reduce screenshot file sizes before sharing or uploading',
      'Compress PNG assets for mobile app bundles',
      'Shrink PNG sprites and UI elements for game development',
    ],
    faqs: [
      {
        question: 'Does PNG compression remove transparency?',
        answer:
          'No. This tool preserves the alpha channel completely. Your transparent backgrounds and semi-transparent areas remain intact.',
      },
      {
        question: 'Is the compression lossless?',
        answer:
          'The default mode is lossless, meaning pixel-for-pixel identical output. You can optionally enable lossy mode for even smaller files with minimal visual difference.',
      },
      {
        question: 'How much smaller will my PNG get?',
        answer:
          'Typical reductions are 30-80% depending on the image content. Screenshots and simple graphics compress the most.',
      },
    ],
    relatedConversions: ['compress-jpeg', 'optimize-images-for-web', 'png-to-compressed-png'],
  },
  {
    slug: 'compress-jpeg',
    from: 'JPEG',
    to: 'Compressed JPEG',
    title: 'Compress JPEG Images',
    description:
      'Reduce JPEG file size while maintaining visual quality. Free online JPEG compressor with adjustable quality.',
    intro:
      'JPEG is the most common format for photos on the web, but camera and editor exports often include more quality than needed. This tool lets you choose the perfect balance between file size and visual quality, typically achieving 50-70% size reductions.',
    steps: [
      'Open the Image Compressor tool on ToolPrime',
      'Upload your JPEG image',
      'Use the quality slider to find the right balance',
      'Compare the original and compressed versions side by side',
      'Download the smaller JPEG file',
    ],
    toolId: 'image-compressor',
    useCases: [
      'Optimize product photos for e-commerce listings',
      'Reduce photo sizes for faster blog loading times',
      'Compress camera photos before uploading to social media',
      'Shrink JPEG images to meet email attachment size limits',
    ],
    faqs: [
      {
        question: 'What JPEG quality setting should I use?',
        answer:
          'For web photos, 75-85% quality offers an excellent balance. Below 70% you may notice artifacts. Above 90% the file size savings become negligible.',
      },
      {
        question: 'Does JPEG compression remove EXIF data?',
        answer:
          'By default, EXIF metadata (camera info, GPS) is stripped to save space and protect privacy. You can toggle this off if needed.',
      },
    ],
    relatedConversions: ['compress-png', 'reduce-image-size', 'jpeg-quality-reducer'],
  },
  {
    slug: 'reduce-image-size',
    from: 'Image',
    to: 'Smaller Image',
    title: 'Reduce Image File Size',
    description:
      'Reduce image file size online for free. Supports PNG, JPEG, and WebP — perfect for web optimization.',
    intro:
      'Large images are the biggest contributor to slow web pages. This tool automatically detects your image format and applies the optimal compression strategy, whether it is a PNG screenshot, JPEG photo, or WebP graphic, reducing file size without visible quality loss.',
    steps: [
      'Open the Image Compressor tool on ToolPrime',
      'Upload any image file (PNG, JPEG, or WebP)',
      'The tool automatically selects the best compression settings',
      'Review the before/after comparison',
      'Download the size-reduced image',
    ],
    toolId: 'image-compressor',
    useCases: [
      'Meet upload size limits on web forms and CMS platforms',
      'Speed up page load times for better Google rankings',
      'Reduce bandwidth costs for image-heavy websites',
      'Prepare images for email newsletters with strict size limits',
    ],
    faqs: [
      {
        question: 'Will reducing size affect image dimensions?',
        answer:
          'No, this tool only reduces file size through compression. The width and height in pixels remain the same.',
      },
      {
        question: 'Can I reduce multiple images at once?',
        answer:
          'Yes, you can upload multiple images and the tool will compress them in batch, letting you download all results.',
      },
    ],
    relatedConversions: ['compress-png', 'compress-jpeg', 'optimize-images-for-web'],
  },
  {
    slug: 'optimize-images-for-web',
    from: 'Image',
    to: 'Web-Optimized Image',
    title: 'Optimize Images for Web',
    description:
      'Optimize images for web performance and Core Web Vitals. Free online tool — compress for faster page loads.',
    intro:
      'Web-optimized images are critical for fast page loads, good Core Web Vitals scores, and SEO rankings. This tool applies web-specific optimizations including appropriate compression levels, metadata stripping, and progressive rendering for the best user experience.',
    steps: [
      'Open the Image Compressor tool on ToolPrime',
      'Upload the images you want to optimize',
      'Select "Web Optimization" mode for automatic settings',
      'Review the optimized output and file size savings',
      'Download and replace the originals on your website',
    ],
    toolId: 'image-compressor',
    useCases: [
      'Improve Largest Contentful Paint scores for hero images',
      'Optimize all images on a new website before launch',
      'Reduce page weight for mobile users on slow connections',
      'Prepare product images for Shopify or WooCommerce stores',
    ],
    faqs: [
      {
        question: 'What makes web optimization different from regular compression?',
        answer:
          'Web optimization strips metadata, enables progressive loading, and targets specific quality thresholds proven to balance visual quality with fast loading on typical connections.',
      },
      {
        question: 'Does this affect my SEO?',
        answer:
          'Positively. Smaller images improve page speed, which is a Google ranking factor. Faster pages also reduce bounce rates and improve user experience.',
      },
    ],
    relatedConversions: ['compress-png', 'compress-jpeg', 'reduce-image-size'],
  },
  {
    slug: 'png-to-compressed-png',
    from: 'PNG',
    to: 'Optimized PNG',
    title: 'Optimize PNG Images',
    description:
      'Optimize PNG files with advanced compression. Free online tool preserving transparency and reducing file size.',
    intro:
      'PNG optimization goes beyond basic compression by analyzing color palettes, removing unnecessary chunks, and applying the most efficient filter and compression strategies for each image. This tool produces the smallest possible PNG without any visual degradation.',
    steps: [
      'Open the Image Compressor tool on ToolPrime',
      'Upload your PNG file',
      'The tool analyzes and applies optimal PNG compression',
      'Compare the original and optimized file sizes',
      'Download the optimized PNG file',
    ],
    toolId: 'image-compressor',
    useCases: [
      'Optimize PNG assets for production website deployment',
      'Reduce PNG sprite sheet sizes for web applications',
      'Compress PNG diagrams and charts for documentation',
      'Shrink PNG exports from design tools like Figma',
    ],
    faqs: [
      {
        question: 'What PNG-specific optimizations are applied?',
        answer:
          'The tool optimizes filter selection per row, removes non-essential chunks (like timestamps and text), and may reduce color depth when safe.',
      },
      {
        question: 'Can this convert 24-bit PNG to 8-bit?',
        answer:
          'If the image uses fewer than 256 colors, the tool can automatically reduce it to an indexed 8-bit PNG for significant size savings.',
      },
    ],
    relatedConversions: ['compress-png', 'optimize-images-for-web', 'reduce-image-size'],
  },
  {
    slug: 'jpeg-quality-reducer',
    from: 'JPEG',
    to: 'Lower Quality JPEG',
    title: 'Reduce JPEG Quality',
    description:
      'Reduce JPEG quality level to shrink file size. Free online tool with live preview and quality slider.',
    intro:
      'When you need to hit a specific file size target — for email attachments, CMS uploads, or bandwidth budgets — this tool gives you precise control over JPEG quality. The live preview lets you find the lowest quality that still looks acceptable.',
    steps: [
      'Open the Image Compressor tool on ToolPrime',
      'Upload your JPEG image',
      'Drag the quality slider to your desired level',
      'Watch the file size update in real time',
      'Download when you reach the desired file size',
    ],
    toolId: 'image-compressor',
    useCases: [
      'Meet strict file size limits for online form submissions',
      'Create thumbnail versions of high-quality photos',
      'Reduce hero image sizes for mobile-first web design',
      'Compress photos for messaging apps with size restrictions',
    ],
    faqs: [
      {
        question: 'What quality level is best for the web?',
        answer:
          'Most web images look great at 75-80% quality. Below 60%, compression artifacts become noticeable on detailed photos.',
      },
      {
        question: 'Can I undo the quality reduction?',
        answer:
          'JPEG compression is lossy and cannot be reversed. Always keep your original file and compress a copy.',
      },
    ],
    relatedConversions: ['compress-jpeg', 'reduce-image-size', 'compress-png'],
  },

  // ─── CSS Gradient (4 entries) ─────────────────────────────────────────────────
  {
    slug: 'css-gradient-to-tailwind',
    from: 'CSS Gradient',
    to: 'Tailwind CSS',
    title: 'Convert CSS Gradient to Tailwind',
    description:
      'Convert CSS gradient code to Tailwind CSS utility classes. Free online tool for Tailwind developers.',
    intro:
      'Tailwind CSS uses utility classes for gradients, which have a different syntax than standard CSS. This tool takes any CSS linear or radial gradient and converts it to the equivalent Tailwind CSS classes, saving you time looking up class names and arbitrary values.',
    steps: [
      'Open the CSS Gradient Generator on ToolPrime',
      'Create your gradient visually or paste existing CSS',
      'Click the "Copy as Tailwind" button',
      'Paste the Tailwind classes into your HTML element',
    ],
    toolId: 'css-gradient-generator',
    useCases: [
      'Migrate existing CSS gradients to a Tailwind project',
      'Convert gradient snippets from design tools to Tailwind',
      'Quickly prototype gradient backgrounds using Tailwind classes',
    ],
    faqs: [
      {
        question: 'Does it support all gradient types?',
        answer:
          'Linear gradients map directly to Tailwind classes. Radial and conic gradients use arbitrary value syntax like bg-[radial-gradient(...)].',
      },
      {
        question: 'What Tailwind version is supported?',
        answer:
          'The output targets Tailwind CSS v3+ which has built-in gradient support with from-, via-, and to- utility classes.',
      },
    ],
    relatedConversions: ['create-linear-gradient', 'create-radial-gradient', 'hex-to-rgb'],
  },
  {
    slug: 'create-linear-gradient',
    from: 'Colors',
    to: 'CSS Linear Gradient',
    title: 'Create CSS Linear Gradient',
    description:
      'Create beautiful CSS linear gradients with a visual editor. Free online gradient generator with live preview.',
    intro:
      'Linear gradients flow in a straight line between two or more colors. They are the most commonly used gradient type in web design — for backgrounds, buttons, hero sections, and text effects. This visual editor makes it easy to craft the perfect gradient.',
    steps: [
      'Open the CSS Gradient Generator on ToolPrime',
      'Select "Linear" as the gradient type',
      'Choose your start and end colors using the color pickers',
      'Adjust the direction angle and add extra color stops',
      'Copy the generated CSS code',
    ],
    toolId: 'css-gradient-generator',
    useCases: [
      'Design eye-catching hero section backgrounds',
      'Create gradient button styles for call-to-action elements',
      'Build branded gradient overlays for card components',
      'Generate smooth color transitions for section dividers',
    ],
    faqs: [
      {
        question: 'Can I add more than two color stops?',
        answer:
          'Yes, click anywhere on the gradient bar to add additional color stops. You can add as many as you need for complex gradients.',
      },
      {
        question: 'How do I make a diagonal gradient?',
        answer:
          'Use the angle control to set any direction. Common diagonal gradients use 45deg (top-left to bottom-right) or 135deg (top-right to bottom-left).',
      },
      {
        question: 'Does it generate cross-browser compatible CSS?',
        answer:
          'The generated CSS works in all modern browsers. Vendor prefixes are not needed for current browser versions.',
      },
    ],
    relatedConversions: ['create-radial-gradient', 'create-conic-gradient', 'css-gradient-to-tailwind'],
  },
  {
    slug: 'create-radial-gradient',
    from: 'Colors',
    to: 'CSS Radial Gradient',
    title: 'Create CSS Radial Gradient',
    description:
      'Design CSS radial gradients with a visual editor. Free online tool for creating circular gradient effects.',
    intro:
      'Radial gradients emanate outward from a center point in a circular or elliptical pattern. They are perfect for spotlight effects, glowing buttons, background orbs, and creating depth in UI design. The visual editor lets you position the center and control the spread.',
    steps: [
      'Open the CSS Gradient Generator on ToolPrime',
      'Select "Radial" as the gradient type',
      'Choose colors and adjust the center position',
      'Toggle between circle and ellipse shapes',
      'Copy the CSS radial-gradient code',
    ],
    toolId: 'css-gradient-generator',
    useCases: [
      'Create spotlight or glow effects behind elements',
      'Design circular gradient backgrounds for avatars',
      'Build depth effects for card hover states',
      'Generate radial overlays for image backgrounds',
    ],
    faqs: [
      {
        question: 'What is the difference between circle and ellipse shapes?',
        answer:
          'Circle gradients are perfectly round regardless of the element dimensions. Ellipse gradients stretch to fit the element shape.',
      },
      {
        question: 'Can I move the center point?',
        answer:
          'Yes, use the position controls to place the gradient center anywhere. Common values include "center", "top left", or specific percentages.',
      },
    ],
    relatedConversions: ['create-linear-gradient', 'create-conic-gradient', 'css-gradient-to-tailwind'],
  },
  {
    slug: 'create-conic-gradient',
    from: 'Colors',
    to: 'CSS Conic Gradient',
    title: 'Create CSS Conic Gradient',
    description:
      'Create CSS conic gradients for pie charts, color wheels, and rotational effects. Free online generator.',
    intro:
      'Conic gradients rotate colors around a center point, like a color wheel. They are ideal for creating pie charts, loading spinners, decorative backgrounds, and any design that needs a sweeping angular transition between colors.',
    steps: [
      'Open the CSS Gradient Generator on ToolPrime',
      'Select "Conic" as the gradient type',
      'Add your color stops and adjust their angular positions',
      'Fine-tune the starting angle and center position',
      'Copy the CSS conic-gradient code for your stylesheet',
    ],
    toolId: 'css-gradient-generator',
    useCases: [
      'Create pure CSS pie charts without JavaScript',
      'Build color wheel pickers and hue selectors',
      'Design decorative rotating gradient backgrounds',
      'Generate loading spinner animations with CSS',
    ],
    faqs: [
      {
        question: 'Which browsers support conic-gradient?',
        answer:
          'All modern browsers (Chrome, Firefox, Safari, Edge) support conic-gradient. For older browsers, consider a fallback background color.',
      },
      {
        question: 'How do I make a pie chart with conic-gradient?',
        answer:
          'Set hard color stops at specific angles. For example, "red 0deg 120deg, blue 120deg 240deg, green 240deg 360deg" creates a three-segment pie.',
      },
    ],
    relatedConversions: ['create-linear-gradient', 'create-radial-gradient', 'css-gradient-to-tailwind'],
  },

  // ─── Color Picker (6 entries) ─────────────────────────────────────────────────
  {
    slug: 'hex-to-rgb',
    from: 'HEX',
    to: 'RGB',
    title: 'Convert HEX to RGB',
    description:
      'Convert HEX color codes to RGB values instantly. Free online color converter for designers and developers.',
    intro:
      'HEX color codes (#FF5733) are compact but not intuitive when you need individual red, green, and blue channel values. This converter breaks any HEX color into its RGB components, which is essential for CSS rgba() functions, image editing, and programmatic color manipulation.',
    steps: [
      'Open the Color Picker tool on ToolPrime',
      'Enter your HEX color code (e.g., #3B82F6)',
      'The RGB values are displayed immediately',
      'Copy the rgb() CSS value or individual channel numbers',
    ],
    toolId: 'color-picker',
    useCases: [
      'Get RGB values from brand guideline HEX codes',
      'Convert HEX to rgba() for adding transparency in CSS',
      'Extract RGB channel values for image processing scripts',
      'Translate designer HEX specs to programmatic RGB values',
    ],
    faqs: [
      {
        question: 'What is the format of the RGB output?',
        answer:
          'You get individual R, G, B values from 0-255, plus a ready-to-use CSS rgb(R, G, B) string.',
      },
      {
        question: 'Does it support shorthand HEX like #F00?',
        answer:
          'Yes, 3-character shorthand (#F00) and 8-character with alpha (#FF000080) are both supported.',
      },
    ],
    relatedConversions: ['rgb-to-hex', 'hex-to-hsl', 'rgb-to-hsl'],
  },
  {
    slug: 'rgb-to-hex',
    from: 'RGB',
    to: 'HEX',
    title: 'Convert RGB to HEX',
    description:
      'Convert RGB color values to HEX codes for CSS and design. Free online RGB to HEX converter tool.',
    intro:
      'RGB values from color pickers, design tools, or programming libraries often need to be converted to HEX for CSS stylesheets, brand guidelines, and design specs. This tool takes any R, G, B values and produces the standard 6-digit HEX code.',
    steps: [
      'Open the Color Picker tool on ToolPrime',
      'Enter the Red, Green, and Blue values (0-255)',
      'The HEX color code updates in real time',
      'Copy the HEX code with or without the # prefix',
    ],
    toolId: 'color-picker',
    useCases: [
      'Convert Photoshop RGB values to HEX for web CSS',
      'Generate HEX codes from programmatic color calculations',
      'Create consistent color references for style guides',
      'Translate color picker output to CSS-ready HEX values',
    ],
    faqs: [
      {
        question: 'Is #FFFFFF the same as rgb(255, 255, 255)?',
        answer:
          'Yes, they represent the exact same color (white). HEX is base-16 notation where FF equals 255 in decimal.',
      },
      {
        question: 'Can I include alpha transparency in HEX?',
        answer:
          'Yes, 8-digit HEX codes include alpha (e.g., #FF000080 for 50% transparent red). The last two digits represent the alpha channel.',
      },
    ],
    relatedConversions: ['hex-to-rgb', 'hex-to-hsl', 'hsl-to-hex'],
  },
  {
    slug: 'hex-to-hsl',
    from: 'HEX',
    to: 'HSL',
    title: 'Convert HEX to HSL',
    description:
      'Convert HEX color codes to HSL (Hue, Saturation, Lightness). Free online color conversion tool.',
    intro:
      'HSL is the most intuitive color model for humans — it represents color as hue (the color itself), saturation (intensity), and lightness (brightness). Converting from HEX to HSL makes it easy to create color variations, palettes, and themes.',
    steps: [
      'Open the Color Picker tool on ToolPrime',
      'Enter your HEX color code',
      'Read the HSL values: Hue (0-360), Saturation (0-100%), Lightness (0-100%)',
      'Copy the CSS hsl() value for your stylesheet',
    ],
    toolId: 'color-picker',
    useCases: [
      'Create lighter and darker variations of a brand color',
      'Build color palettes by adjusting hue while keeping saturation consistent',
      'Generate accessible color contrast by modifying lightness values',
      'Convert design tool HEX values to HSL for CSS custom properties',
    ],
    faqs: [
      {
        question: 'Why is HSL better than RGB for design?',
        answer:
          'HSL separates color identity (hue) from intensity (saturation) and brightness (lightness), making it intuitive to create variations. With RGB, changing a shade requires adjusting all three values.',
      },
      {
        question: 'How do I make a color lighter in HSL?',
        answer:
          'Increase the Lightness value. For example, hsl(210, 80%, 50%) becomes lighter at hsl(210, 80%, 70%). The hue and saturation stay the same.',
      },
    ],
    relatedConversions: ['hsl-to-hex', 'hex-to-rgb', 'rgb-to-hsl'],
  },
  {
    slug: 'hsl-to-hex',
    from: 'HSL',
    to: 'HEX',
    title: 'Convert HSL to HEX',
    description:
      'Convert HSL color values to HEX codes for web development. Free online HSL to HEX converter.',
    intro:
      'After crafting the perfect color in HSL — choosing the exact hue, adjusting saturation, and fine-tuning lightness — you often need the HEX code for CSS, SVG, or design tools. This converter produces the exact HEX equivalent of any HSL value.',
    steps: [
      'Open the Color Picker tool on ToolPrime',
      'Enter Hue (0-360), Saturation (0-100%), and Lightness (0-100%)',
      'View the resulting HEX code instantly',
      'Copy the HEX value for use in your project',
    ],
    toolId: 'color-picker',
    useCases: [
      'Convert HSL-based design tokens to HEX for browser compatibility',
      'Generate HEX values from HSL color palette calculations',
      'Translate CSS HSL variables to HEX for tools that require it',
      'Create HEX color codes for brand guidelines from HSL definitions',
    ],
    faqs: [
      {
        question: 'Is the conversion perfectly accurate?',
        answer:
          'HSL and HEX both represent the sRGB color space, so the conversion is mathematically exact with no color loss.',
      },
      {
        question: 'Can I convert HSL with alpha to 8-digit HEX?',
        answer:
          'Yes, if you provide an alpha value, the tool generates an 8-digit HEX code where the last two digits represent transparency.',
      },
    ],
    relatedConversions: ['hex-to-hsl', 'rgb-to-hex', 'hsl-to-rgb'],
  },
  {
    slug: 'rgb-to-hsl',
    from: 'RGB',
    to: 'HSL',
    title: 'Convert RGB to HSL',
    description:
      'Convert RGB color values to HSL for easier color manipulation. Free online RGB to HSL converter.',
    intro:
      'Converting RGB to HSL lets you think about colors in human-friendly terms. Instead of mixing red, green, and blue amounts, you work with hue (what color), saturation (how vivid), and lightness (how bright). This makes creating harmonious color schemes much easier.',
    steps: [
      'Open the Color Picker tool on ToolPrime',
      'Enter Red, Green, and Blue values (0-255 each)',
      'The HSL equivalent appears instantly',
      'Use the HSL values to create color variations and palettes',
    ],
    toolId: 'color-picker',
    useCases: [
      'Analyze the hue of RGB colors from image editors',
      'Convert RGB design specifications to HSL for CSS theming',
      'Calculate color harmony by comparing hue values',
      'Build dynamic color systems using HSL manipulation',
    ],
    faqs: [
      {
        question: 'What are typical HSL ranges?',
        answer:
          'Hue is 0-360 degrees (0=red, 120=green, 240=blue). Saturation is 0-100% (0=gray, 100=full color). Lightness is 0-100% (0=black, 50=normal, 100=white).',
      },
      {
        question: 'Is HSL the same as HSB/HSV?',
        answer:
          'No. HSL and HSV are different models. In HSL, 100% lightness is always white. In HSV, 100% value means the purest color. They produce different results from the same inputs.',
      },
    ],
    relatedConversions: ['hsl-to-rgb', 'rgb-to-hex', 'hex-to-hsl'],
  },
  {
    slug: 'hsl-to-rgb',
    from: 'HSL',
    to: 'RGB',
    title: 'Convert HSL to RGB',
    description:
      'Convert HSL color values to RGB for programming and image editing. Free online HSL to RGB converter.',
    intro:
      'Many programming languages, image libraries, and APIs work with RGB values. When you have designed colors in HSL for its intuitive controls, this tool converts them to exact RGB values for use in code, Canvas APIs, or image processing.',
    steps: [
      'Open the Color Picker tool on ToolPrime',
      'Enter Hue, Saturation, and Lightness values',
      'Read the RGB output (0-255 per channel)',
      'Copy the values for your programming context',
    ],
    toolId: 'color-picker',
    useCases: [
      'Convert HSL palette colors to RGB for Canvas API drawing',
      'Get RGB values for image processing libraries like Pillow or Sharp',
      'Translate CSS HSL colors to RGB for email template compatibility',
      'Generate RGB arrays for LED strip or hardware color control',
    ],
    faqs: [
      {
        question: 'Why would I use RGB instead of HSL?',
        answer:
          'Many programming APIs, image formats, and hardware interfaces only accept RGB. Converting from HSL gives you the exact channel values needed.',
      },
      {
        question: 'Are the RGB values always whole numbers?',
        answer:
          'Yes, RGB values are rounded to integers 0-255 since that is the standard 8-bit per channel representation.',
      },
    ],
    relatedConversions: ['rgb-to-hsl', 'rgb-to-hex', 'hsl-to-hex'],
  },

  // ─── QR Code (4 entries) ──────────────────────────────────────────────────────
  {
    slug: 'url-to-qr-code',
    from: 'URL',
    to: 'QR Code',
    title: 'Convert URL to QR Code',
    description:
      'Generate QR codes from any URL instantly. Free online QR code generator — download as PNG or SVG.',
    intro:
      'QR codes make it effortless to share website links in the physical world — on business cards, flyers, posters, product packaging, and presentations. This tool generates high-quality QR codes from any URL that scan reliably on all smartphone cameras.',
    steps: [
      'Open the QR Code Generator on ToolPrime',
      'Paste your URL into the input field',
      'Customize the size, colors, or add a logo if desired',
      'Download the QR code as PNG for print or SVG for scalable use',
    ],
    toolId: 'qr-code-generator',
    useCases: [
      'Add QR codes to business cards linking to your portfolio',
      'Create scannable links for restaurant menus and flyers',
      'Generate QR codes for event registration pages',
      'Link physical product packaging to online resources',
    ],
    faqs: [
      {
        question: 'What is the maximum URL length for a QR code?',
        answer:
          'QR codes can encode up to ~4,296 characters, but shorter URLs produce simpler, more reliable codes. Use a URL shortener for very long URLs.',
      },
      {
        question: 'Should I download PNG or SVG?',
        answer:
          'Use PNG for digital screens and social media. Use SVG for print materials since it scales to any size without losing quality.',
      },
      {
        question: 'Will the QR code still work if my URL changes?',
        answer:
          'No, the URL is encoded directly. If you anticipate changes, use a redirect URL that you control so you can update the destination.',
      },
    ],
    relatedConversions: ['text-to-qr-code', 'wifi-to-qr-code', 'email-to-qr-code'],
  },
  {
    slug: 'text-to-qr-code',
    from: 'Text',
    to: 'QR Code',
    title: 'Convert Text to QR Code',
    description:
      'Encode any text message into a QR code for free. Generate scannable QR codes for notes, codes, and messages.',
    intro:
      'QR codes can store plain text, not just URLs. This is useful for sharing short messages, serial numbers, coupon codes, product identifiers, or any text that needs to be quickly scanned and read by a phone or scanner application.',
    steps: [
      'Open the QR Code Generator on ToolPrime',
      'Type or paste your text message',
      'Adjust the QR code size and error correction level',
      'Download the generated QR code image',
    ],
    toolId: 'qr-code-generator',
    useCases: [
      'Print serial numbers as QR codes for inventory tracking',
      'Create scannable coupon codes for retail promotions',
      'Encode short messages for scavenger hunts or events',
      'Generate machine-readable labels for warehouse items',
    ],
    faqs: [
      {
        question: 'How much text can a QR code hold?',
        answer:
          'Up to about 4,296 alphanumeric characters at the lowest error correction level. For reliable scanning, keep text under 500 characters.',
      },
      {
        question: 'What is error correction level?',
        answer:
          'QR codes have four error correction levels (L, M, Q, H). Higher levels make the code more resilient to damage but increase its size. Level M (15%) is a good default.',
      },
    ],
    relatedConversions: ['url-to-qr-code', 'wifi-to-qr-code', 'email-to-qr-code'],
  },
  {
    slug: 'wifi-to-qr-code',
    from: 'WiFi Credentials',
    to: 'QR Code',
    title: 'Create WiFi QR Code',
    description:
      'Generate WiFi QR codes that connect phones automatically. Free online tool — guests scan to join your network.',
    intro:
      'WiFi QR codes let guests connect to your network by simply scanning with their phone camera — no typing long passwords. This tool generates QR codes using the standard WIFI: URI format supported by both iOS and Android devices.',
    steps: [
      'Open the QR Code Generator on ToolPrime',
      'Select "WiFi" as the QR code type',
      'Enter your network name (SSID), password, and security type',
      'Download the QR code and print it for your office, cafe, or home',
    ],
    toolId: 'qr-code-generator',
    useCases: [
      'Display a WiFi QR code at reception desks for office guests',
      'Print WiFi codes for Airbnb and hotel room welcome sheets',
      'Create table cards for cafe and restaurant WiFi access',
      'Share home WiFi with visitors without dictating the password',
    ],
    faqs: [
      {
        question: 'Which devices can scan WiFi QR codes?',
        answer:
          'All iPhones running iOS 11+ and Android phones with version 10+ support scanning WiFi QR codes natively from the camera app.',
      },
      {
        question: 'Is my WiFi password stored anywhere?',
        answer:
          'No, the password is encoded directly in the QR code image on your device. Nothing is sent to any server.',
      },
      {
        question: 'Does it work with hidden networks?',
        answer:
          'Yes, there is a "hidden network" toggle that adds the H:true flag to the WiFi URI, prompting the device to connect to a non-broadcasting SSID.',
      },
    ],
    relatedConversions: ['url-to-qr-code', 'text-to-qr-code', 'email-to-qr-code'],
  },
  {
    slug: 'email-to-qr-code',
    from: 'Email Address',
    to: 'QR Code',
    title: 'Create Email QR Code',
    description:
      'Generate QR codes that open a pre-filled email on scan. Free online tool for business cards and marketing.',
    intro:
      'An email QR code opens the user\'s mail client with a pre-filled recipient, subject line, and optional body text when scanned. This is perfect for business cards, feedback forms, support contacts, and any situation where you want to make emailing you frictionless.',
    steps: [
      'Open the QR Code Generator on ToolPrime',
      'Select "Email" as the QR code type',
      'Enter the recipient email, subject, and optional body text',
      'Download and print the QR code on business cards or signage',
    ],
    toolId: 'qr-code-generator',
    useCases: [
      'Add email QR codes to business cards for instant contact',
      'Create feedback QR codes for conference booths and events',
      'Print support-request QR codes on product packaging',
      'Generate pre-filled order inquiry codes for marketing flyers',
    ],
    faqs: [
      {
        question: 'What email fields can be pre-filled?',
        answer:
          'You can pre-fill the To address, Subject line, CC, BCC, and Body text. The QR code uses the standard mailto: URI format.',
      },
      {
        question: 'Does it work with all email clients?',
        answer:
          'Yes, the mailto: format is universal and opens the default email app on any smartphone, whether it is Gmail, Outlook, Apple Mail, or others.',
      },
    ],
    relatedConversions: ['url-to-qr-code', 'text-to-qr-code', 'wifi-to-qr-code'],
  },

  // ─── Diff Checker (3 entries) ─────────────────────────────────────────────────
  {
    slug: 'compare-two-texts',
    from: 'Two Texts',
    to: 'Diff Report',
    title: 'Compare Two Texts',
    description:
      'Compare two text blocks side by side and highlight differences. Free online diff checker tool.',
    intro:
      'Finding differences between two versions of text — whether code, documents, or configuration files — is tedious by hand. This diff tool highlights additions, deletions, and changes line by line with clear color coding, similar to Git diff output.',
    steps: [
      'Open the Diff Checker tool on ToolPrime',
      'Paste the original text in the left panel',
      'Paste the modified text in the right panel',
      'Click Compare to see highlighted differences',
      'Review additions (green), deletions (red), and changes',
    ],
    toolId: 'diff-checker',
    useCases: [
      'Compare two versions of a document before merging changes',
      'Verify what changed between two code reviews',
      'Check contract or policy revisions for specific edits',
      'Compare API response payloads from different environments',
    ],
    faqs: [
      {
        question: 'Does it show character-level differences?',
        answer:
          'Yes, within changed lines the tool highlights the specific characters that differ, not just the entire line.',
      },
      {
        question: 'Can I compare very long texts?',
        answer:
          'The tool handles texts of thousands of lines efficiently. All processing happens in your browser with no upload limits.',
      },
    ],
    relatedConversions: ['compare-two-files', 'find-text-differences'],
  },
  {
    slug: 'compare-two-files',
    from: 'Two Files',
    to: 'Diff Report',
    title: 'Compare Two Files',
    description:
      'Upload and compare two files to see every difference. Free online file diff tool with side-by-side view.',
    intro:
      'When you have two versions of a file and need to identify exactly what changed, this tool provides a clear side-by-side comparison. Upload any text-based files — code, config, CSV, log files — and instantly see every addition, deletion, and modification.',
    steps: [
      'Open the Diff Checker tool on ToolPrime',
      'Upload the original file using the left upload button',
      'Upload the modified file using the right upload button',
      'The tool compares them and highlights all differences',
      'Navigate between changes using the arrow buttons',
    ],
    toolId: 'diff-checker',
    useCases: [
      'Compare configuration files after a deployment change',
      'Identify differences between development and production configs',
      'Review changes in CSV data exports from different dates',
      'Compare log files from two different runs to find anomalies',
    ],
    faqs: [
      {
        question: 'Which file types are supported?',
        answer:
          'Any text-based file works — .txt, .json, .xml, .csv, .js, .py, .sql, .html, .css, .md, log files, and more.',
      },
      {
        question: 'Are my files uploaded to a server?',
        answer:
          'No, files are read and compared entirely in your browser. Nothing is uploaded or stored anywhere.',
      },
    ],
    relatedConversions: ['compare-two-texts', 'find-text-differences'],
  },
  {
    slug: 'find-text-differences',
    from: 'Text',
    to: 'Highlighted Differences',
    title: 'Find Text Differences',
    description:
      'Spot every difference between two text versions with color-coded highlighting. Free online diff tool.',
    intro:
      'Whether you are proofreading, reviewing edits, or checking translations, finding subtle differences between two text versions is critical. This tool uses a diff algorithm to detect and highlight every change, including single-character edits that are easy to miss.',
    steps: [
      'Open the Diff Checker tool on ToolPrime',
      'Enter the first version of the text',
      'Enter the second version of the text',
      'Review the color-coded diff output',
      'Use the summary to see counts of additions, deletions, and changes',
    ],
    toolId: 'diff-checker',
    useCases: [
      'Proofread translated documents against the original version',
      'Verify that find-and-replace operations changed only intended text',
      'Spot unauthorized changes in legal or compliance documents',
    ],
    faqs: [
      {
        question: 'Can it handle whitespace-only differences?',
        answer:
          'Yes, and you can toggle a setting to ignore whitespace changes if you only care about content differences.',
      },
      {
        question: 'Does it support inline and side-by-side views?',
        answer:
          'Both views are available. Side-by-side is best for short texts; inline (unified) view works better for long documents.',
      },
    ],
    relatedConversions: ['compare-two-texts', 'compare-two-files'],
  },

  // ─── SQL Formatter (3 entries) ────────────────────────────────────────────────
  {
    slug: 'format-sql-query',
    from: 'SQL',
    to: 'Formatted SQL',
    title: 'Format SQL Query',
    description:
      'Beautify SQL queries with proper indentation and keyword casing. Free online SQL formatter tool.',
    intro:
      'Messy SQL queries are hard to read, debug, and review. This formatter applies consistent indentation, keyword uppercasing, and logical line breaks to make any SQL query instantly readable, whether it is a simple SELECT or a complex multi-JOIN query.',
    steps: [
      'Open the SQL Formatter tool on ToolPrime',
      'Paste your unformatted SQL query',
      'Choose your preferred indent style and keyword case',
      'Click Format to beautify the query',
      'Copy the clean, readable SQL output',
    ],
    toolId: 'sql-formatter',
    useCases: [
      'Clean up auto-generated SQL from ORMs for code review',
      'Format complex reporting queries for documentation',
      'Standardize SQL style across team members in a project',
      'Make legacy stored procedures readable for maintenance',
    ],
    faqs: [
      {
        question: 'Which SQL dialects are supported?',
        answer:
          'The formatter supports standard SQL, MySQL, PostgreSQL, SQL Server (T-SQL), Oracle PL/SQL, and SQLite syntax.',
      },
      {
        question: 'Does formatting change the query behavior?',
        answer:
          'No, formatting only changes whitespace and letter case of keywords. The query logic and results are completely unchanged.',
      },
      {
        question: 'Can I format multiple statements at once?',
        answer:
          'Yes, separate statements with semicolons and the formatter will handle each one independently.',
      },
    ],
    relatedConversions: ['minify-sql', 'beautify-sql'],
  },
  {
    slug: 'minify-sql',
    from: 'SQL',
    to: 'Minified SQL',
    title: 'Minify SQL Query',
    description:
      'Minify SQL queries by removing comments and extra whitespace. Free online SQL minifier for compact storage.',
    intro:
      'Minified SQL removes all comments, unnecessary whitespace, and line breaks to produce the most compact query string. This is useful for embedding SQL in code strings, storing queries in database tables, or reducing log output verbosity.',
    steps: [
      'Open the SQL Formatter tool on ToolPrime',
      'Paste your formatted SQL query',
      'Click the Minify button',
      'Copy the single-line compact SQL output',
    ],
    toolId: 'sql-formatter',
    useCases: [
      'Compress SQL for storage in application config tables',
      'Create compact query strings for ORM raw query methods',
      'Reduce SQL log output size in production environments',
    ],
    faqs: [
      {
        question: 'Does minifying remove SQL comments?',
        answer:
          'Yes, both single-line (--) and multi-line (/* */) comments are stripped during minification.',
      },
      {
        question: 'Will the minified query still work correctly?',
        answer:
          'Absolutely. Only whitespace and comments are removed. All SQL keywords, identifiers, and values remain unchanged.',
      },
    ],
    relatedConversions: ['format-sql-query', 'beautify-sql', 'minify-json'],
  },
  {
    slug: 'beautify-sql',
    from: 'SQL',
    to: 'Beautified SQL',
    title: 'Beautify SQL',
    description:
      'Beautify SQL with aligned columns, indented subqueries, and uppercase keywords. Free online SQL beautifier.',
    intro:
      'SQL beautification goes beyond basic formatting by aligning column lists, indenting subqueries and CTEs consistently, and applying professional styling conventions that make complex queries a pleasure to read and maintain.',
    steps: [
      'Open the SQL Formatter tool on ToolPrime',
      'Paste your SQL query',
      'Select beautification options (alignment, keyword case, indent width)',
      'Click Beautify to apply professional formatting',
      'Copy the polished SQL query',
    ],
    toolId: 'sql-formatter',
    useCases: [
      'Prepare SQL queries for inclusion in technical documentation',
      'Clean up complex analytical queries with multiple CTEs',
      'Format SQL for presentations and code walkthroughs',
      'Standardize query formatting before committing to version control',
    ],
    faqs: [
      {
        question: 'What is the difference between Format and Beautify?',
        answer:
          'Format applies basic indentation and line breaks. Beautify adds column alignment, consistent spacing around operators, and smarter subquery handling.',
      },
      {
        question: 'Does it handle Common Table Expressions (CTEs)?',
        answer:
          'Yes, WITH clauses and CTEs are properly indented and separated, with each CTE block clearly delineated.',
      },
    ],
    relatedConversions: ['format-sql-query', 'minify-sql'],
  },

  // ─── Regex Tester (3 entries) ─────────────────────────────────────────────────
  {
    slug: 'test-regex-pattern',
    from: 'Regex Pattern',
    to: 'Match Results',
    title: 'Test Regex Pattern',
    description:
      'Test regular expressions with real-time match highlighting. Free online regex tester with explanation.',
    intro:
      'Writing regex is only half the challenge — testing it against real data is where bugs surface. This tool highlights matches in real time as you type, shows capture groups, and explains what each part of your pattern does in plain English.',
    steps: [
      'Open the Regex Tester tool on ToolPrime',
      'Enter your regular expression pattern',
      'Paste test strings in the input area',
      'See matches highlighted in real time with capture group details',
      'Adjust your pattern until all expected matches are correct',
    ],
    toolId: 'regex-tester',
    useCases: [
      'Debug complex regex patterns against sample data before deployment',
      'Learn regex by experimenting with patterns and seeing instant results',
      'Validate email, phone, or URL patterns against edge cases',
      'Test data extraction patterns for web scraping projects',
    ],
    faqs: [
      {
        question: 'Which regex flavor does this tool use?',
        answer:
          'The tool uses JavaScript regex (ECMAScript), which is the standard for web browsers and Node.js applications.',
      },
      {
        question: 'Does it show capture groups?',
        answer:
          'Yes, each capture group is highlighted in a different color and listed separately with its matched content.',
      },
      {
        question: 'Can I test with multiple flag combinations?',
        answer:
          'Yes, toggle flags like global (g), case-insensitive (i), multiline (m), dotAll (s), and unicode (u) independently.',
      },
    ],
    relatedConversions: ['validate-regex', 'regex-to-javascript'],
  },
  {
    slug: 'validate-regex',
    from: 'Regex Pattern',
    to: 'Validation Report',
    title: 'Validate Regular Expression',
    description:
      'Check if your regex is valid and see detailed error messages. Free online regex validator tool.',
    intro:
      'Invalid regex patterns cause runtime errors that can crash your application. This tool validates your pattern before you use it in code, providing clear error messages that point to exactly where the syntax issue is — missing brackets, unescaped characters, or invalid quantifiers.',
    steps: [
      'Open the Regex Tester tool on ToolPrime',
      'Enter your regular expression',
      'The tool immediately validates the syntax',
      'Fix any errors highlighted in the pattern',
      'Once valid, test against sample data to verify behavior',
    ],
    toolId: 'regex-tester',
    useCases: [
      'Validate user-submitted regex patterns before storing them',
      'Check regex syntax when porting between programming languages',
      'Debug RegExp constructor errors in JavaScript applications',
    ],
    faqs: [
      {
        question: 'What types of errors does it detect?',
        answer:
          'Unmatched parentheses, brackets, and braces; invalid escape sequences; empty groups; invalid quantifier targets; and invalid flag combinations.',
      },
      {
        question: 'Does it check for performance issues?',
        answer:
          'It warns about potentially catastrophic backtracking patterns (like nested quantifiers) that could freeze your application.',
      },
    ],
    relatedConversions: ['test-regex-pattern', 'regex-to-javascript'],
  },
  {
    slug: 'regex-to-javascript',
    from: 'Regex Pattern',
    to: 'JavaScript Code',
    title: 'Convert Regex to JavaScript',
    description:
      'Generate ready-to-use JavaScript code from regex patterns. Free online tool with match, replace, and test examples.',
    intro:
      'Once you have a working regex, you need to use it in code. This tool generates JavaScript snippets showing how to use your pattern with RegExp.test(), String.match(), String.replace(), and String.matchAll() — ready to paste into your codebase.',
    steps: [
      'Open the Regex Tester tool on ToolPrime',
      'Enter and test your regex pattern',
      'Click "Export as JavaScript"',
      'Choose the operation type (test, match, replace, or split)',
      'Copy the generated JavaScript code snippet',
    ],
    toolId: 'regex-tester',
    useCases: [
      'Generate JavaScript validation code from tested regex patterns',
      'Create search-and-replace code snippets for text processing',
      'Export regex as reusable JavaScript utility functions',
      'Build form validation code from pattern prototypes',
    ],
    faqs: [
      {
        question: 'Does it escape special characters for RegExp constructor?',
        answer:
          'Yes, when generating code that uses new RegExp(), backslashes and other special characters are properly double-escaped.',
      },
      {
        question: 'Can I get TypeScript code instead?',
        answer:
          'The JavaScript output works in TypeScript as-is. The generated code uses standard RegExp APIs that are fully typed in TypeScript.',
      },
    ],
    relatedConversions: ['test-regex-pattern', 'validate-regex'],
  },

  // ─── Word Counter (2 entries) ─────────────────────────────────────────────────
  {
    slug: 'count-words-in-text',
    from: 'Text',
    to: 'Word Count',
    title: 'Count Words in Text',
    description:
      'Count words, sentences, and paragraphs in any text. Free online word counter tool with reading time estimate.',
    intro:
      'Whether you are writing a blog post, essay, or social media caption, knowing your word count is essential. This tool provides an instant breakdown of words, sentences, paragraphs, and estimated reading time as you type or paste your content.',
    steps: [
      'Open the Word Counter tool on ToolPrime',
      'Paste or type your text into the editor',
      'View the live word count, sentence count, and paragraph count',
      'Check the estimated reading time at the top',
    ],
    toolId: 'word-counter',
    useCases: [
      'Check blog post length against SEO content guidelines',
      'Verify essay word count for academic requirements',
      'Measure social media post length before publishing',
      'Track progress toward daily writing goals',
    ],
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer:
          'Reading time is based on an average reading speed of 200-250 words per minute, which is typical for adult readers of online content.',
      },
      {
        question: 'Are hyphenated words counted as one or two words?',
        answer:
          'Hyphenated words like "well-known" are counted as a single word, which is consistent with most word processing software.',
      },
    ],
    relatedConversions: ['character-count-online'],
  },
  {
    slug: 'character-count-online',
    from: 'Text',
    to: 'Character Count',
    title: 'Character Count Online',
    description:
      'Count characters with and without spaces. Free online character counter for tweets, meta descriptions, and more.',
    intro:
      'Many platforms have strict character limits — Twitter/X (280), meta descriptions (~155), SMS (160), and ad copy. This tool counts characters in real time, both with and without spaces, so you can craft content that fits within any limit.',
    steps: [
      'Open the Word Counter tool on ToolPrime',
      'Type or paste your text',
      'View the character count (with spaces) and (without spaces)',
      'Trim your text to meet your target character limit',
    ],
    toolId: 'word-counter',
    useCases: [
      'Fit tweets and social media posts within character limits',
      'Write SEO meta descriptions under 155 characters',
      'Craft SMS messages within the 160-character limit',
      'Check ad headline and description lengths for Google Ads',
    ],
    faqs: [
      {
        question: 'Does it count Unicode characters correctly?',
        answer:
          "Yes, emoji and accented characters are each counted as one character. Some platforms count emoji as two characters — check your platform's specific rules.",
      },
      {
        question: 'Are newlines counted as characters?',
        answer:
          'Newlines are included in the "with spaces" count but excluded from the "without spaces" count, consistent with standard text length measurement.',
      },
    ],
    relatedConversions: ['count-words-in-text'],
  },

  // ─── Timestamp Converter (4 entries) ──────────────────────────────────────────
  {
    slug: 'unix-to-date',
    from: 'Unix Timestamp',
    to: 'Human-Readable Date',
    title: 'Convert Unix Timestamp to Date',
    description:
      'Convert Unix timestamps to readable dates and times. Free online epoch converter with timezone support.',
    intro:
      'Unix timestamps are used extensively in databases, APIs, and log files, but they are unreadable to humans. This tool converts any epoch timestamp (seconds or milliseconds since January 1, 1970) to a formatted date and time in your local timezone or UTC.',
    steps: [
      'Open the Timestamp Converter on ToolPrime',
      'Enter the Unix timestamp (seconds or milliseconds)',
      'View the converted date and time in multiple formats',
      'Select your timezone or use UTC for universal reference',
    ],
    toolId: 'timestamp-converter',
    useCases: [
      'Decode timestamps in API responses and database records',
      'Convert log file timestamps to readable dates for debugging',
      'Verify token expiration times from JWT payloads',
      'Translate cron job timestamps to calendar dates',
    ],
    faqs: [
      {
        question: 'Does it support millisecond timestamps?',
        answer:
          'Yes, the tool auto-detects whether your input is in seconds (10 digits) or milliseconds (13 digits) and converts accordingly.',
      },
      {
        question: 'What timezone is used by default?',
        answer:
          "Your browser's local timezone is used by default. You can switch to UTC or any other timezone using the dropdown.",
      },
      {
        question: 'Can it handle negative timestamps?',
        answer:
          'Yes, negative timestamps represent dates before January 1, 1970 (the Unix epoch). For example, -86400 is December 31, 1969.',
      },
    ],
    relatedConversions: ['date-to-unix', 'timestamp-to-iso', 'epoch-to-human-readable'],
  },
  {
    slug: 'date-to-unix',
    from: 'Date',
    to: 'Unix Timestamp',
    title: 'Convert Date to Unix Timestamp',
    description:
      'Convert any date and time to a Unix epoch timestamp. Free online tool with timezone-aware conversion.',
    intro:
      'When building APIs, setting cookie expirations, or scheduling tasks, you often need dates as Unix timestamps. This tool converts any date and time — with full timezone awareness — to both seconds and milliseconds epoch values.',
    steps: [
      'Open the Timestamp Converter on ToolPrime',
      'Select the date and time using the picker or type it manually',
      'Choose the timezone for the input date',
      'Copy the Unix timestamp in seconds or milliseconds',
    ],
    toolId: 'timestamp-converter',
    useCases: [
      'Generate epoch timestamps for API request parameters',
      'Calculate Unix timestamps for cookie and token expiration',
      'Set scheduled job times using epoch values',
      'Convert calendar dates to timestamps for database queries',
    ],
    faqs: [
      {
        question: 'What is the difference between seconds and milliseconds?',
        answer:
          'Seconds since epoch is the standard Unix timestamp (10 digits). Milliseconds (13 digits) is used by JavaScript Date.now() and many modern APIs.',
      },
      {
        question: 'Does the timezone affect the timestamp?',
        answer:
          'Yes, the same local time in different timezones produces different Unix timestamps. UTC is timezone-neutral and most commonly used.',
      },
    ],
    relatedConversions: ['unix-to-date', 'timestamp-to-iso', 'epoch-to-human-readable'],
  },
  {
    slug: 'timestamp-to-iso',
    from: 'Timestamp',
    to: 'ISO 8601',
    title: 'Convert Timestamp to ISO 8601',
    description:
      'Convert Unix timestamps to ISO 8601 date format. Free online tool for standard datetime strings.',
    intro:
      'ISO 8601 (e.g., 2024-01-15T09:30:00Z) is the international standard for date and time representation. It is the required format for many APIs, JSON data, and international systems. This tool converts any Unix timestamp to a properly formatted ISO 8601 string.',
    steps: [
      'Open the Timestamp Converter on ToolPrime',
      'Enter a Unix timestamp (seconds or milliseconds)',
      'View the ISO 8601 formatted output',
      'Copy the string with or without timezone offset',
    ],
    toolId: 'timestamp-converter',
    useCases: [
      'Format timestamps for ISO 8601-compliant API responses',
      'Convert database epoch values to ISO strings for JSON output',
      'Generate standardized datetime strings for log aggregation',
      'Create ISO dates for XML and SOAP service integrations',
    ],
    faqs: [
      {
        question: 'What does the T and Z mean in ISO 8601?',
        answer:
          'T separates the date and time components. Z indicates UTC (Zulu time). A timezone offset like +05:30 can replace Z for local times.',
      },
      {
        question: 'Does it include milliseconds in the output?',
        answer:
          'Optionally, yes. You can choose between second precision (2024-01-15T09:30:00Z) and millisecond precision (2024-01-15T09:30:00.000Z).',
      },
    ],
    relatedConversions: ['unix-to-date', 'date-to-unix', 'epoch-to-human-readable'],
  },
  {
    slug: 'epoch-to-human-readable',
    from: 'Epoch Time',
    to: 'Human-Readable Format',
    title: 'Convert Epoch to Human-Readable',
    description:
      'Make epoch timestamps readable with formatted dates, relative times, and timezone conversion. Free online tool.',
    intro:
      'Epoch timestamps appear everywhere in tech — server logs, database dumps, JWT tokens, API responses. This tool not only converts them to formatted dates but also shows relative time ("3 hours ago"), day of the week, and week number for maximum context.',
    steps: [
      'Open the Timestamp Converter on ToolPrime',
      'Paste the epoch timestamp from your log or API',
      'See the full date breakdown: date, time, day of week, relative time',
      'Switch between timezones to understand when it happened locally',
    ],
    toolId: 'timestamp-converter',
    useCases: [
      'Quickly understand when an event occurred from server logs',
      'Decode token expiration timestamps in JWT debugging',
      'Make sense of epoch values in database query results',
      'Convert event timestamps for incident postmortem analysis',
    ],
    faqs: [
      {
        question: 'What is the epoch?',
        answer:
          'The Unix epoch is January 1, 1970, 00:00:00 UTC. Unix timestamps count the number of seconds that have elapsed since that moment.',
      },
      {
        question: 'How do I tell if a number is a timestamp?',
        answer:
          'Current timestamps in seconds are 10 digits (starting with 17...). In milliseconds they are 13 digits (starting with 17...). This tool accepts both.',
      },
    ],
    relatedConversions: ['unix-to-date', 'date-to-unix', 'timestamp-to-iso'],
  },
]

export function getFormatConversionBySlug(slug: string): FormatConversion | undefined {
  return formatConversions.find(c => c.slug === slug)
}
