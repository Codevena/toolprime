import type { ToolContent } from './tool-content'

export const toolContent2: Record<string, ToolContent> = {
  'base64-encode-decode': {
    whatIs: {
      heading: 'What Is Base64 Encoding?',
      body: 'Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 ASCII characters. It converts every three bytes of input into four printable characters, making it safe to transmit binary data through text-only channels like email or JSON.\n\nThe encoding is essential whenever raw binary data — such as images, files, or cryptographic output — needs to be embedded in a text-based format. Without Base64, special bytes could be misinterpreted or stripped by protocols designed for plain text.\n\nDespite its ubiquity, Base64 is purely an encoding and not a form of encryption. Anyone can decode a Base64 string instantly, so it should never be used to protect sensitive information.',
    },
    useCases: {
      heading: 'Common Uses for Base64 Encoding',
      items: [
        {
          title: 'Embedding Images in HTML/CSS',
          description:
            'Convert small images to data URIs so they load inline without additional HTTP requests, improving page speed for icons and sprites.',
        },
        {
          title: 'Email Attachments (MIME)',
          description:
            'MIME encoding uses Base64 to embed binary file attachments inside plain-text email messages, ensuring safe delivery across mail servers.',
        },
        {
          title: 'JWT Tokens',
          description:
            'JSON Web Tokens encode their header and payload sections as Base64URL strings, allowing structured auth data to travel in HTTP headers.',
        },
        {
          title: 'Data URLs in Web Applications',
          description:
            'Encode fonts, SVGs, or small files directly into CSS or JavaScript bundles, reducing external dependencies during page rendering.',
        },
      ],
    },
    tips: {
      heading: 'Tips for Working with Base64',
      items: [
        {
          title: 'Expect a 33% Size Increase',
          description:
            'Base64 output is roughly one-third larger than the original binary. Avoid encoding large files inline where a direct URL would be more efficient.',
        },
        {
          title: 'Base64 Is Not Encryption',
          description:
            'Encoding is fully reversible by anyone. Never rely on Base64 to hide passwords, API keys, or other secrets in your codebase.',
        },
        {
          title: 'Use URL-Safe Variants When Needed',
          description:
            'Standard Base64 includes + and / characters that break URLs. Use the Base64URL alphabet (replacing them with - and _) for query strings and tokens.',
        },
        {
          title: 'Strip Padding When Size Matters',
          description:
            'The trailing = padding characters are optional for many decoders. Removing them saves a few bytes in bandwidth-sensitive contexts like JWTs.',
        },
      ],
    },
    comparison: {
      heading: 'Encoding Methods Compared',
      headers: ['Method', 'Use Case', 'Size Overhead', 'Character Set'],
      rows: [
        [
          'Base64',
          'Binary data in text channels',
          '~33%',
          'A-Z, a-z, 0-9, +, /',
        ],
        [
          'URL Encoding',
          'Special characters in URLs',
          'Variable (up to 3x per char)',
          'ASCII with %XX escapes',
        ],
        [
          'Hex Encoding',
          'Debugging, checksums, color codes',
          '100%',
          '0-9, A-F',
        ],
      ],
    },
  },

  'image-compressor': {
    whatIs: {
      heading: 'What Is Image Compression?',
      body: 'Image compression reduces the file size of a picture by removing redundant or less important visual data. There are two main approaches: lossy compression discards information the human eye is unlikely to notice, while lossless compression reorganizes data without any quality loss.\n\nSmaller images load faster, consume less bandwidth, and improve Core Web Vitals scores — all critical factors for search engine rankings and user experience. A single uncompressed hero image can add several megabytes to a page.\n\nModern compression algorithms let you achieve dramatic size reductions with virtually no perceptible quality difference, especially when you choose the right format and quality setting for each image.',
    },
    useCases: {
      heading: 'Common Uses for Image Compression',
      items: [
        {
          title: 'Website Performance Optimization',
          description:
            'Compress images before uploading to reduce page weight, speed up load times, and improve Lighthouse performance scores significantly.',
        },
        {
          title: 'Email Attachments',
          description:
            'Shrink photos below email size limits so recipients can download them quickly without bouncing or clogging their inbox storage.',
        },
        {
          title: 'Social Media Uploads',
          description:
            'Pre-compress images to avoid aggressive platform re-compression that often introduces visible artifacts and color banding.',
        },
        {
          title: 'Cloud Storage Savings',
          description:
            'Reduce the size of photo libraries and backups to save on storage costs and speed up sync across devices.',
        },
      ],
    },
    tips: {
      heading: 'Tips for Compressing Images',
      items: [
        {
          title: 'Target File Sizes for the Web',
          description:
            'Aim for under 200 KB per image on web pages. Hero images can be up to 300 KB; thumbnails should stay below 50 KB.',
        },
        {
          title: 'Choose the Right Format',
          description:
            'Use JPEG for photographs, PNG for graphics with transparency, and WebP when broad browser support is acceptable for best results.',
        },
        {
          title: 'Find the Quality Sweet Spot',
          description:
            'JPEG quality between 70-85% offers the best balance of file size and visual fidelity. Below 60% artifacts become noticeable.',
        },
        {
          title: 'Resize Before Compressing',
          description:
            'Downscale images to their display dimensions first. Compressing a 4000px photo only to display it at 800px wastes bytes.',
        },
      ],
    },
    comparison: {
      heading: 'Image Formats Compared',
      headers: [
        'Format',
        'Best For',
        'Transparency',
        'Compression',
        'Browser Support',
      ],
      rows: [
        [
          'JPEG',
          'Photographs, complex scenes',
          'No',
          'Lossy',
          'Universal',
        ],
        [
          'PNG',
          'Graphics, logos, screenshots',
          'Yes',
          'Lossless',
          'Universal',
        ],
        [
          'WebP',
          'Web images (photos and graphics)',
          'Yes',
          'Both lossy and lossless',
          'All modern browsers',
        ],
      ],
    },
  },

  'lorem-ipsum-generator': {
    whatIs: {
      heading: 'What Is Lorem Ipsum?',
      body: 'Lorem Ipsum is dummy placeholder text used in the design and publishing industries since the 1500s. Its origins trace back to sections 1.10.32 and 1.10.33 of "De Finibus Bonorum et Malorum" by the Roman philosopher Cicero, written in 45 BC.\n\nDesigners and developers use Lorem Ipsum because its Latin-like word distribution closely mimics the visual rhythm of real English text. This lets reviewers focus on layout, typography, and spacing without being distracted by readable content.\n\nWhile it looks like gibberish, the standard Lorem Ipsum passage has been intentionally scrambled from Cicero\'s original, making it a time-tested industry standard for mockups and prototypes.',
    },
    useCases: {
      heading: 'Common Uses for Lorem Ipsum',
      items: [
        {
          title: 'Web Design Mockups',
          description:
            'Fill page layouts with realistic text blocks to evaluate visual hierarchy, column widths, and whitespace before final copy is written.',
        },
        {
          title: 'Print Layout Proofing',
          description:
            'Populate brochures, magazines, and book templates to verify pagination, margins, and typographic flow before publication.',
        },
        {
          title: 'UI Prototyping',
          description:
            'Insert placeholder text into app interfaces to test component sizing, text wrapping, and responsive behavior across screen sizes.',
        },
        {
          title: 'Presentation Templates',
          description:
            'Add filler text to slide decks and proposal templates so stakeholders can evaluate the design independently from content.',
        },
      ],
    },
    tips: {
      heading: 'Tips for Using Placeholder Text',
      items: [
        {
          title: 'Use Real Content When Possible',
          description:
            'For final design reviews, substitute actual copy. Lorem Ipsum hides content-related layout issues like overlong headlines or short paragraphs.',
        },
        {
          title: 'Never Ship Lorem Ipsum to Production',
          description:
            'Placeholder text in live products looks unprofessional and hurts SEO. Always search your codebase for "lorem" before deploying.',
        },
        {
          title: 'Consider Alternative Placeholder Text',
          description:
            'Hipster Ipsum, Cupcake Ipsum, or language-specific fillers can add levity to internal reviews while still serving as placeholders.',
        },
        {
          title: 'Match the Expected Content Length',
          description:
            'Generate placeholder text that approximates the real word count. Too much or too little filler gives a misleading sense of the layout.',
        },
      ],
    },
  },

  'unit-converter': {
    whatIs: {
      heading: 'What Is Unit Conversion?',
      body: 'Unit conversion is the process of expressing a measurement in a different unit while preserving its actual value. The world primarily uses two systems: the metric system (meters, kilograms, liters) adopted by most countries, and the imperial system (feet, pounds, gallons) still common in the United States.\n\nAccurate conversions are critical in science, engineering, cooking, and everyday life. A single error — like confusing pounds with kilograms — can ruin a recipe, compromise structural integrity, or even cause mission-critical failures, as the Mars Climate Orbiter disaster famously demonstrated.\n\nA reliable unit converter eliminates manual math errors and handles the dozens of conversion factors that are impractical to memorize.',
    },
    useCases: {
      heading: 'Common Uses for Unit Conversion',
      items: [
        {
          title: 'International Travel',
          description:
            'Convert miles to kilometers, Fahrenheit to Celsius, and gallons to liters when navigating roads, weather, and fuel stops abroad.',
        },
        {
          title: 'Cooking and Baking Recipes',
          description:
            'Translate cups to grams or fluid ounces to milliliters when following recipes from different countries or scaling portions.',
        },
        {
          title: 'Engineering Calculations',
          description:
            'Switch between metric and imperial units for material specifications, tolerances, and cross-border manufacturing standards.',
        },
        {
          title: 'Scientific Research',
          description:
            'Convert between SI and CGS units or handle derived units like pascals to PSI for consistent data reporting in papers.',
        },
      ],
    },
    tips: {
      heading: 'Tips for Accurate Unit Conversion',
      items: [
        {
          title: 'Fluid Ounces vs Dry Ounces',
          description:
            'Fluid ounces measure volume while dry ounces measure weight. They are not interchangeable — a cup of flour weighs differently than a cup of water.',
        },
        {
          title: 'Temperature Conversion Formulas',
          description:
            'Celsius to Fahrenheit: multiply by 9/5 then add 32. For a quick estimate, double the Celsius value and add 30.',
        },
        {
          title: 'Mind Your Precision',
          description:
            'Round conversions appropriately for your context. Cooking tolerates rounding; scientific work and engineering do not.',
        },
        {
          title: 'Watch Out for Regional Variations',
          description:
            'A US gallon (3.785 L) differs from an Imperial gallon (4.546 L). Always confirm which system a measurement references.',
        },
      ],
    },
  },

  'percentage-calculator': {
    whatIs: {
      heading: 'What Is a Percentage?',
      body: 'A percentage is a way of expressing a number as a fraction of 100. The word itself comes from the Latin "per centum," meaning "by the hundred." The percent sign (%) was standardized in the 17th century and has been a cornerstone of mathematics and commerce ever since.\n\nPercentages make it easy to compare ratios of different magnitudes on a common scale. Whether you are calculating a 15% tip, a 30% discount, or a 7.5% annual return, the underlying math is the same: multiply the base value by the percentage divided by 100.\n\nDespite their simplicity, percentage calculations trip people up surprisingly often — especially when dealing with successive increases and decreases, where intuition frequently misleads.',
    },
    useCases: {
      heading: 'Common Uses for Percentage Calculations',
      items: [
        {
          title: 'Discounts and Sales Tax',
          description:
            'Quickly determine the final price after a percentage discount or calculate the tax amount added to a purchase total.',
        },
        {
          title: 'Grade Calculations',
          description:
            'Convert raw scores to percentages to evaluate academic performance and determine letter grades on a standardized scale.',
        },
        {
          title: 'Tip Calculation',
          description:
            'Figure out a 15%, 18%, or 20% tip at restaurants without fumbling with mental arithmetic or pulling out a calculator.',
        },
        {
          title: 'Financial Returns and Interest',
          description:
            'Compute investment gains, loan interest, or savings growth using percentage-based annual rates and compound formulas.',
        },
        {
          title: 'Data Analysis',
          description:
            'Express changes in metrics as percentage increases or decreases to communicate trends clearly in reports and dashboards.',
        },
      ],
    },
    tips: {
      heading: 'Tips for Percentage Calculations',
      items: [
        {
          title: 'Increase vs Decrease Formulas',
          description:
            'Percentage increase: ((new - old) / old) x 100. Percentage decrease uses the same formula — a negative result indicates a drop.',
        },
        {
          title: 'A Common Mistake to Avoid',
          description:
            'A 50% increase followed by a 50% decrease does not return you to the original value. 100 becomes 150, then drops to 75.',
        },
        {
          title: 'Mental Math Shortcuts',
          description:
            'To find 15%, calculate 10% (move the decimal) and add half of that. For 25%, divide by 4. These tricks speed up everyday math.',
        },
        {
          title: 'Percentage Points vs Percentages',
          description:
            'Going from 10% to 15% is a 5 percentage-point increase but a 50% relative increase. Confusing the two is a common communication error.',
        },
      ],
    },
  },
}
