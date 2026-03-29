import type { ToolContent } from './tool-content'

export const toolContent6: Record<string, ToolContent> = {
  "json-to-csv": {
    whatIs: {
      heading: "What Is JSON to CSV Conversion?",
      body: "JSON (JavaScript Object Notation) and CSV (Comma-Separated Values) are two of the most widely used data interchange formats. JSON excels at representing structured, hierarchical data with nested objects and arrays, while CSV provides a flat, tabular format that spreadsheet applications like Microsoft Excel and Google Sheets can open natively.\n\nConverting between these formats is a routine task for developers, data analysts, and anyone working with APIs or databases. A JSON-to-CSV converter flattens nested object properties into dot-notation column headers, ensuring no data is lost during the transformation. The reverse direction — CSV to JSON — takes tabular rows and turns them into an array of key-value objects, ready for consumption by web applications, REST APIs, or NoSQL databases.\n\nThis tool performs both conversions entirely in your browser. No data is uploaded to a server, so sensitive datasets remain private. It handles edge cases like missing keys across objects, arrays within fields, and special characters in CSV cells."
    },
    useCases: {
      heading: "Popular Use Cases",
      items: [
        {
          title: "API Data Export",
          description: "Download JSON responses from REST APIs and convert them to CSV for analysis in spreadsheet tools, pivot tables, and charting applications."
        },
        {
          title: "Database Migration",
          description: "Transform CSV exports from relational databases into JSON for import into NoSQL stores like MongoDB, Firebase, or DynamoDB."
        },
        {
          title: "Report Generation",
          description: "Convert structured JSON datasets into CSV files that non-technical stakeholders can open in Excel to create reports and dashboards."
        },
        {
          title: "Data Cleaning Pipelines",
          description: "Round-trip data through both formats to normalize structure — flatten nested JSON, inspect in a spreadsheet, then convert back to clean JSON."
        }
      ]
    },
    tips: {
      heading: "Tips for Clean Conversions",
      items: [
        {
          title: "Flatten Before Converting",
          description: "Deeply nested JSON with more than two or three levels produces very long dot-notation headers. Pre-flatten your data or restructure it for cleaner CSV output."
        },
        {
          title: "Use Consistent Keys",
          description: "When all objects in a JSON array share the same keys, the resulting CSV is clean and complete. Missing keys produce empty cells, which may confuse downstream tools."
        },
        {
          title: "Quote Special Characters",
          description: "CSV fields that contain commas, newlines, or double quotes must be enclosed in quotes. This tool handles quoting automatically using the RFC 4180 standard."
        },
        {
          title: "Include Headers in CSV Input",
          description: "When converting CSV to JSON, always include a header row. The first row defines the property names for each JSON object in the output array."
        }
      ]
    },
    comparison: {
      heading: "JSON vs CSV Comparison",
      headers: ["Feature", "JSON", "CSV"],
      rows: [
        ["Structure", "Hierarchical (nested objects and arrays)", "Flat (rows and columns)"],
        ["Human Readability", "Moderate — requires formatting", "High — opens in any spreadsheet"],
        ["File Size", "Larger due to key repetition", "Smaller for tabular data"],
        ["Schema Flexibility", "Flexible — each object can differ", "Rigid — all rows share columns"],
        ["Tool Support", "APIs, databases, programming languages", "Excel, Google Sheets, SQL imports"],
      ]
    }
  },
  "image-to-base64": {
    whatIs: {
      heading: "What Is Image to Base64 Encoding?",
      body: "Base64 is a binary-to-text encoding scheme that represents binary data — such as image files — as a string of printable ASCII characters. When you encode an image to Base64, the resulting string can be embedded directly into HTML, CSS, or JSON without requiring a separate file reference or HTTP request.\n\nThe most common use of Base64-encoded images is the data URI scheme. A data URI looks like data:image/png;base64,iVBORw0KGgo... and can be placed in an <img> tag's src attribute or a CSS background-image property. This technique eliminates an extra network round-trip, which is especially valuable for small images like icons, logos, and UI sprites.\n\nBase64 encoding increases the data size by approximately 33%, so it is best suited for small assets under 10-20 KB. For larger images, serving them as separate files with proper caching headers is more efficient. This tool processes your image entirely in the browser using the FileReader API — no data is uploaded to a server, keeping your files private and the conversion instant."
    },
    useCases: {
      heading: "Popular Use Cases",
      items: [
        {
          title: "HTML Email Templates",
          description: "Email clients often block external images by default. Embedding small logos and icons as Base64 data URIs ensures they display immediately without requiring the recipient to allow remote images."
        },
        {
          title: "Single-File HTML Documents",
          description: "Create self-contained HTML files with all images inline — perfect for reports, invoices, or documentation that needs to be shared as a single file."
        },
        {
          title: "CSS Background Images",
          description: "Embed tiny UI icons and patterns directly in your stylesheet to reduce HTTP requests and speed up initial page rendering for critical above-the-fold content."
        },
        {
          title: "API Payloads and Configs",
          description: "Store small image thumbnails or avatars as Base64 strings in JSON API responses, database records, or configuration files where binary storage is not available."
        }
      ]
    },
    tips: {
      heading: "Tips for Effective Base64 Encoding",
      items: [
        {
          title: "Keep Images Small",
          description: "Base64 adds about 33% overhead. For images larger than 10-20 KB, serving the file separately with browser caching is typically more efficient than inline encoding."
        },
        {
          title: "Use the Right MIME Type",
          description: "Always include the correct MIME type in the data URI prefix (image/png, image/jpeg, image/svg+xml). An incorrect type may cause browsers to fail rendering the image."
        },
        {
          title: "Prefer SVG When Possible",
          description: "SVG files are already text-based and compress well. For icons and simple graphics, an SVG file is usually smaller and more flexible than a Base64-encoded raster image."
        },
        {
          title: "Consider WebP Format",
          description: "If browser support allows, convert images to WebP before encoding to Base64. WebP provides significantly better compression than PNG or JPEG for the same quality."
        }
      ]
    },
    comparison: {
      heading: "Data URI vs External Image",
      headers: ["Factor", "Data URI (Base64)", "External File"],
      rows: [
        ["HTTP Requests", "Zero — inline in HTML/CSS", "One per image"],
        ["File Size", "~33% larger than original", "Original binary size"],
        ["Browser Caching", "Cached with the HTML/CSS document", "Cached independently"],
        ["Best For", "Small icons, logos, email images", "Large photos, hero images"],
        ["Maintenance", "Harder to update (embedded in code)", "Easy to replace file on server"],
      ]
    }
  }
}
