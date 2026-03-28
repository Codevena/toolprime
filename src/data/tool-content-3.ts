import type { ToolContent } from './tool-content'

export const toolContent3: Record<string, ToolContent> = {
  'url-encode-decode': {
    whatIs: {
      heading: 'What Is URL Encoding?',
      body: 'URL encoding, also known as percent-encoding, is a mechanism defined in RFC 3986 for representing special characters in a Uniform Resource Identifier. Characters that carry reserved meaning in URLs — such as &, =, ?, /, and # — must be encoded so they are interpreted as literal data rather than structural delimiters.\n\nThe encoding process replaces each unsafe byte with a percent sign followed by two hexadecimal digits (e.g., a space becomes %20). This ensures that any string, regardless of the characters it contains, can be safely transmitted in a URL without ambiguity or data loss.',
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        {
          title: 'Building API Query Strings',
          description:
            'Encode parameter values that may contain special characters like ampersands, equals signs, or unicode text before appending them to request URLs.',
        },
        {
          title: 'Handling Special Characters in URLs',
          description:
            'Safely include file names, user input, or multilingual text in URL paths without breaking the link structure.',
        },
        {
          title: 'Form Data Submission',
          description:
            'HTML forms using application/x-www-form-urlencoded content type require all field values to be percent-encoded before transmission.',
        },
        {
          title: 'Deep Linking and Redirects',
          description:
            'Encode callback URLs and redirect targets passed as query parameters so nested URLs do not conflict with the outer URL structure.',
        },
      ],
    },
    tips: {
      heading: 'Tips & Best Practices',
      items: [
        {
          title: 'encodeURIComponent vs encodeURI',
          description:
            'Use encodeURIComponent for individual query values. Use encodeURI only when encoding a full URL — it leaves reserved delimiters intact.',
        },
        {
          title: 'Avoid Double-Encoding',
          description:
            'Encoding an already-encoded string turns %20 into %2520. Always decode first if you are unsure whether the input is already encoded.',
        },
        {
          title: 'Spaces: %20 vs +',
          description:
            'RFC 3986 uses %20 for spaces in URLs. The plus sign (+) for spaces is specific to HTML form encoding (application/x-www-form-urlencoded).',
        },
        {
          title: 'Encode Before Concatenation',
          description:
            'Always encode individual parameter values before joining them with & and =. Encoding the entire query string after assembly breaks delimiters.',
        },
      ],
    },
  },

  'case-converter': {
    whatIs: {
      heading: 'What Are Naming Conventions?',
      body: 'Naming conventions are standardized rules for formatting identifiers in code, databases, and written content. Consistent casing improves readability, reduces cognitive load, and prevents bugs caused by mismatched references in case-sensitive environments.\n\nDifferent ecosystems have adopted distinct styles: JavaScript favors camelCase, Python uses snake_case, CSS relies on kebab-case, and C# prefers PascalCase. A case converter tool lets you instantly transform text between these formats, streamlining refactoring and ensuring your naming stays consistent across every layer of your stack.',
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        {
          title: 'Code Refactoring',
          description:
            'Quickly rename variables, functions, or class names from one casing convention to another when migrating between languages or updating style guides.',
        },
        {
          title: 'Database Column Naming',
          description:
            'Convert application-layer camelCase fields to snake_case columns expected by SQL databases like PostgreSQL or MySQL.',
        },
        {
          title: 'CSS Class Names',
          description:
            'Transform component names into kebab-case format following BEM methodology or standard CSS naming conventions.',
        },
        {
          title: 'API Field Standardization',
          description:
            'Normalize JSON response keys to a single convention (e.g., camelCase) regardless of how the backend database stores them.',
        },
      ],
    },
    tips: {
      heading: 'Tips & Best Practices',
      items: [
        {
          title: 'Follow Language Conventions',
          description:
            'Python and Ruby prefer snake_case. JavaScript and TypeScript use camelCase. C# and Java classes use PascalCase. Follow the ecosystem standard.',
        },
        {
          title: 'Consistency Over Preference',
          description:
            'Pick one convention per context and enforce it everywhere. Mixed casing in a codebase causes confusion and increases maintenance burden.',
        },
        {
          title: 'Handle Acronyms Carefully',
          description:
            'Decide whether acronyms stay uppercase (getHTTPResponse) or follow normal casing (getHttpResponse) and apply the rule uniformly.',
        },
        {
          title: 'Automate with Linters',
          description:
            'Use ESLint, Pylint, or similar tools to enforce naming conventions automatically so deviations are caught before code review.',
        },
      ],
    },
    comparison: {
      heading: 'Case Styles Compared',
      headers: ['Style', 'Example', 'Common In', 'Best For'],
      rows: [
        ['camelCase', 'getUserName', 'JavaScript, TypeScript, Java', 'Variables, functions, object keys'],
        ['snake_case', 'get_user_name', 'Python, Ruby, SQL, Rust', 'Database columns, config files'],
        ['PascalCase', 'GetUserName', 'C#, TypeScript, React components', 'Classes, types, components'],
        ['kebab-case', 'get-user-name', 'HTML, CSS, URLs, CLI flags', 'CSS classes, URL slugs, filenames'],
        ['SCREAMING_SNAKE', 'GET_USER_NAME', 'Most languages (constants)', 'Environment vars, constants'],
      ],
    },
  },

  'timestamp-converter': {
    whatIs: {
      heading: 'What Is a Unix Timestamp?',
      body: 'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC — a reference point known as the Unix epoch. This simple integer representation makes it trivial for systems to store, compare, and calculate date differences without worrying about time zones, daylight saving rules, or calendar quirks.\n\nVirtually every programming language, database, and operating system supports epoch time internally. Converting between a raw timestamp like 1711584000 and a human-readable date such as "March 28, 2024 00:00 UTC" is a fundamental operation in software development and system administration.',
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        {
          title: 'Debugging Application Logs',
          description:
            'Convert epoch timestamps found in log files into readable dates to quickly pinpoint when errors or events occurred.',
        },
        {
          title: 'Database Timestamp Fields',
          description:
            'Interpret integer timestamp columns stored in SQL or NoSQL databases and verify they correspond to the expected dates.',
        },
        {
          title: 'API Date Handling',
          description:
            'Many REST and GraphQL APIs return dates as Unix timestamps. Convert them for display or transform human dates into timestamps for requests.',
        },
        {
          title: 'Cron Job Scheduling',
          description:
            'Calculate exact timestamps for future cron executions or verify that scheduled tasks ran at the correct epoch time.',
        },
      ],
    },
    tips: {
      heading: 'Tips & Best Practices',
      items: [
        {
          title: 'Seconds vs Milliseconds',
          description:
            'Unix timestamps are in seconds. JavaScript Date.now() returns milliseconds. A 13-digit number is likely milliseconds — divide by 1000.',
        },
        {
          title: 'Always Store in UTC',
          description:
            'Store and transmit timestamps in UTC. Convert to local time zones only at the presentation layer to avoid offset errors.',
        },
        {
          title: 'The Year 2038 Problem',
          description:
            'A 32-bit signed integer overflows on January 19, 2038. Use 64-bit integers or language-native date types to future-proof your systems.',
        },
        {
          title: 'Prefer ISO 8601 for Display',
          description:
            'When exposing dates to users or APIs, ISO 8601 format (2024-03-28T00:00:00Z) is unambiguous, sortable, and internationally understood.',
        },
      ],
    },
  },

  'hash-generator': {
    whatIs: {
      heading: 'What Is a Hash Function?',
      body: 'A cryptographic hash function takes an arbitrary input and produces a fixed-length output — called a digest — that acts as a unique fingerprint for that data. The process is deterministic: identical inputs always produce identical hashes. Crucially, hash functions are one-way; you cannot reverse-engineer the original input from its digest.\n\nStrong hash algorithms exhibit collision resistance, meaning it is computationally infeasible to find two different inputs that produce the same hash. This property makes hashing essential for verifying data integrity, securing passwords, and generating digital signatures across virtually every area of computing.',
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        {
          title: 'File Integrity Verification',
          description:
            'Compare hash digests before and after file transfers to confirm that data was not corrupted or tampered with during transmission.',
        },
        {
          title: 'Password Storage',
          description:
            'Store salted hashes of passwords instead of plaintext. Authentication compares hashes, so the original password is never exposed.',
        },
        {
          title: 'Digital Signatures',
          description:
            'Sign the hash of a document rather than the document itself. This is faster and proves both authenticity and integrity.',
        },
        {
          title: 'Data Deduplication',
          description:
            'Hash file contents to generate unique identifiers. Matching hashes indicate duplicate data, enabling efficient storage optimization.',
        },
      ],
    },
    tips: {
      heading: 'Tips & Best Practices',
      items: [
        {
          title: 'Never Use MD5 or SHA-1 for Security',
          description:
            'Both algorithms have known collision attacks. Use SHA-256 or SHA-512 for any security-sensitive operation like signatures or integrity checks.',
        },
        {
          title: 'Always Salt Password Hashes',
          description:
            'A unique random salt per password defeats rainbow table attacks. Use bcrypt, scrypt, or Argon2 — not raw SHA — for password hashing.',
        },
        {
          title: 'Hashing Is Not Encryption',
          description:
            'Hashing is a one-way operation with no decryption key. Encryption is reversible with the correct key. Do not confuse the two concepts.',
        },
        {
          title: 'Verify Checksums from Trusted Sources',
          description:
            'When downloading software, compare the published hash against your computed hash. Ensure the hash itself comes from a trusted channel.',
        },
      ],
    },
    comparison: {
      heading: 'Hash Algorithms Compared',
      headers: ['Algorithm', 'Output Length', 'Security', 'Speed', 'Use Case'],
      rows: [
        ['MD5', '128 bits (32 hex chars)', 'Broken — collisions found', 'Very fast', 'Non-security checksums only'],
        ['SHA-1', '160 bits (40 hex chars)', 'Deprecated — practical attacks exist', 'Fast', 'Legacy systems, git commits'],
        ['SHA-256', '256 bits (64 hex chars)', 'Strong — no known attacks', 'Moderate', 'Digital signatures, certificates, blockchain'],
        ['SHA-512', '512 bits (128 hex chars)', 'Strong — larger security margin', 'Moderate', 'High-security applications, password hashing'],
      ],
    },
  },

  'regex-tester': {
    whatIs: {
      heading: 'What Are Regular Expressions?',
      body: 'Regular expressions (regex) are sequences of characters that define search patterns. Rooted in formal language theory and finite automata, they provide a concise syntax for matching, extracting, and manipulating text. Nearly every programming language includes a regex engine, making them an indispensable tool for developers.\n\nA regex pattern can range from a simple literal string to a complex expression with quantifiers, character classes, lookaheads, and capture groups. While powerful, regex can be difficult to read and debug, which is why a live tester with instant highlighting is invaluable for building and validating patterns.',
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        {
          title: 'Input Validation',
          description:
            'Validate formats like email addresses, phone numbers, postal codes, and credit card numbers on both client and server sides.',
        },
        {
          title: 'Log Parsing',
          description:
            'Extract timestamps, error codes, IP addresses, and other structured data from unstructured or semi-structured log files.',
        },
        {
          title: 'Search and Replace',
          description:
            'Perform powerful find-and-replace operations in text editors and build scripts using capture groups and backreferences.',
        },
        {
          title: 'Data Extraction and Scraping',
          description:
            'Pull specific fields from HTML, CSV, or plain text when a full parser is not necessary or available.',
        },
      ],
    },
    tips: {
      heading: 'Tips & Best Practices',
      items: [
        {
          title: 'Avoid Catastrophic Backtracking',
          description:
            'Nested quantifiers like (a+)+ cause exponential backtracking. Use atomic groups or possessive quantifiers to keep performance predictable.',
        },
        {
          title: 'Use Non-Capturing Groups',
          description:
            'Write (?:...) instead of (...) when you do not need the matched text. This improves clarity and can boost engine performance.',
        },
        {
          title: 'Test Edge Cases Thoroughly',
          description:
            'Always test with empty strings, extremely long input, special characters, and unicode. Regex that works on happy paths often fails on edges.',
        },
        {
          title: 'Prioritize Readability',
          description:
            'Use the verbose/extended flag (x) to add comments and whitespace. A regex others can read is far more valuable than a clever one-liner.',
        },
      ],
    },
  },
}
