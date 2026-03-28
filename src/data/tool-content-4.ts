import type { ToolContent } from './tool-content'

export const toolContent4: Record<string, ToolContent> = {
  "sql-formatter": {
    whatIs: {
      heading: "What Is SQL Formatting?",
      body: "SQL formatting transforms raw, compressed, or inconsistently styled SQL queries into clean, readable code with proper indentation and keyword placement. Well-formatted SQL is essential for teams that collaborate on database logic, making queries easier to scan, debug, and maintain.\n\nDifferent SQL dialects such as MySQL, PostgreSQL, SQL Server, and SQLite each have unique syntax extensions. A good formatter respects these dialect differences while applying consistent style rules like uppercase keywords, aligned columns, and indented subqueries. Readable SQL reduces errors and speeds up code reviews significantly."
    },
    useCases: {
      heading: "Common Use Cases",
      items: [
        {
          title: "Code Reviews",
          description: "Format messy SQL before submitting pull requests so reviewers can focus on logic rather than deciphering dense one-line queries."
        },
        {
          title: "Debugging Complex Queries",
          description: "Break apart deeply nested joins and subqueries into readable blocks to quickly isolate the clause causing unexpected results."
        },
        {
          title: "Technical Documentation",
          description: "Produce consistently styled SQL examples for internal wikis, API docs, or onboarding guides that new team members can follow."
        },
        {
          title: "Learning SQL",
          description: "Visualize query structure with proper indentation to understand how SELECT, JOIN, WHERE, and GROUP BY clauses relate to each other."
        }
      ]
    },
    tips: {
      heading: "SQL Formatting Best Practices",
      items: [
        {
          title: "Consistent Keyword Casing",
          description: "Choose uppercase or lowercase for SQL keywords and stick with it across your entire codebase to maintain a uniform style."
        },
        {
          title: "Indent Subqueries",
          description: "Nest subqueries one level deeper than the parent query so readers can instantly distinguish between outer and inner logic."
        },
        {
          title: "Use Meaningful Table Aliases",
          description: "Replace generic aliases like a, b, c with descriptive short names like ord, cust, or prod for self-documenting queries."
        },
        {
          title: "Break Long WHERE Clauses",
          description: "Place each condition on its own line with the AND or OR operator aligned vertically to improve scannability of filter logic."
        }
      ]
    }
  },

  "diff-checker": {
    whatIs: {
      heading: "What Is a Diff?",
      body: "A diff is a comparison between two texts that highlights exactly what was added, removed, or changed. Diff algorithms like Myers and patience diff work by finding the longest common subsequence between inputs, then marking everything else as an insertion or deletion.\n\nDiff tools offer line-level comparison for structural changes and word-level comparison for fine-grained edits within a single line. Whether you are reviewing code, tracking document revisions, or auditing configuration files, a visual diff makes it easy to spot every change at a glance without reading both versions in full."
    },
    useCases: {
      heading: "Common Use Cases",
      items: [
        {
          title: "Code Review",
          description: "Compare file versions before and after changes to verify that only intended modifications were made in a pull request."
        },
        {
          title: "Document Versioning",
          description: "Track revisions between drafts of contracts, proposals, or articles to see exactly which sentences were rewritten or removed."
        },
        {
          title: "Configuration Changes",
          description: "Audit server or application config file updates to catch unintended modifications before deploying to production environments."
        },
        {
          title: "Contract Comparison",
          description: "Highlight differences between original and revised legal agreements so stakeholders can review only the clauses that changed."
        }
      ]
    },
    tips: {
      heading: "Tips for Effective Diff Comparison",
      items: [
        {
          title: "Write Meaningful Commit Messages",
          description: "Describe why a change was made so future diffs have context, not just raw additions and deletions without explanation."
        },
        {
          title: "Review Before You Merge",
          description: "Always inspect the full diff one final time before merging branches to catch last-minute issues or accidental leftover code."
        },
        {
          title: "Mind Whitespace Sensitivity",
          description: "Toggle whitespace visibility when comparing code to distinguish meaningful indentation changes from insignificant trailing space edits."
        },
        {
          title: "Choose Unified or Split View",
          description: "Use unified view for quick scanning of small changes and split side-by-side view when comparing large files with many edits."
        }
      ]
    }
  },

  "css-gradient-generator": {
    whatIs: {
      heading: "What Are CSS Gradients?",
      body: "CSS gradients are image values generated by the browser that create smooth transitions between two or more colors. Unlike image files, gradients are resolution-independent, require zero HTTP requests, and can be animated with CSS transitions for dynamic effects.\n\nCSS supports three gradient types: linear gradients that flow in a straight direction, radial gradients that radiate outward from a center point, and conic gradients that sweep around a central angle. All modern browsers fully support gradient syntax, making them a reliable and performant choice for backgrounds, overlays, and decorative UI elements."
    },
    useCases: {
      heading: "Common Use Cases",
      items: [
        {
          title: "Backgrounds and Hero Sections",
          description: "Create eye-catching full-width hero banners with smooth color transitions that load instantly without external image dependencies."
        },
        {
          title: "Button Hover Effects",
          description: "Apply subtle gradient shifts on hover to give interactive elements depth and visual feedback without JavaScript or image sprites."
        },
        {
          title: "Text Gradients",
          description: "Combine background-clip with gradient backgrounds to apply colorful gradient fills to headings and display typography elements."
        },
        {
          title: "Decorative Borders",
          description: "Use border-image with gradient values to create colorful, dynamic borders that stand out more than flat solid-color alternatives."
        }
      ]
    },
    tips: {
      heading: "Gradient Design Tips",
      items: [
        {
          title: "Limit Color Stops",
          description: "Stick to two or three color stops for clean, professional gradients. Too many stops create muddy, unfocused transitions."
        },
        {
          title: "Test on Dark and Light Modes",
          description: "Verify gradient contrast and readability in both color schemes since colors that work on white may wash out on dark backgrounds."
        },
        {
          title: "Consider Performance",
          description: "Avoid animating complex gradients with many stops on low-powered devices. Simple gradients with CSS transitions perform best."
        },
        {
          title: "Use Directional Angles",
          description: "Specify exact degree values like 135deg instead of vague keywords for precise control over linear gradient direction across layouts."
        }
      ]
    },
    comparison: {
      heading: "Gradient Types Compared",
      headers: ["Type", "CSS Function", "Best For", "Direction Control", "Browser Support"],
      rows: [
        ["Linear", "linear-gradient()", "Backgrounds, stripes, progress bars", "Angle or keyword (to right, 45deg)", "All modern browsers, IE10+"],
        ["Radial", "radial-gradient()", "Spotlights, glows, circular highlights", "Shape and position (circle at center)", "All modern browsers, IE10+"],
        ["Conic", "conic-gradient()", "Pie charts, color wheels, clock faces", "Start angle and position (from 90deg)", "All modern browsers, no IE"]
      ]
    }
  },

  "favicon-generator": {
    whatIs: {
      heading: "What Is a Favicon?",
      body: "A favicon is a small icon associated with a website that appears in browser tabs, bookmarks, history lists, and search results. Originally introduced by Internet Explorer 5 in 1999 as a 16x16 pixel ICO file, favicons have evolved into a multi-format requirement for modern web platforms.\n\nToday, browsers and operating systems expect multiple favicon sizes ranging from 16x16 for tabs to 512x512 for Progressive Web App splash screens. Apple devices require apple-touch-icon at 180x180, while Android uses the web app manifest to reference larger icons. Generating all required sizes from a single source image ensures consistent branding everywhere."
    },
    useCases: {
      heading: "Common Use Cases",
      items: [
        {
          title: "Website Branding",
          description: "Display your logo or brand mark consistently across browser tabs, making your site instantly recognizable among dozens of open tabs."
        },
        {
          title: "PWA Icons",
          description: "Generate the full set of manifest icons required for Progressive Web Apps to look polished when installed on home screens."
        },
        {
          title: "Bookmark Recognition",
          description: "Help users quickly locate your site in crowded bookmark bars and reading lists through a distinctive, memorable small icon."
        },
        {
          title: "Browser Tab Identification",
          description: "Provide a clear visual anchor in the browser tab strip so users can switch back to your site without reading tab titles."
        }
      ]
    },
    tips: {
      heading: "Favicon Design Tips",
      items: [
        {
          title: "Keep It Simple",
          description: "Use bold shapes and minimal detail because favicons render as small as 16x16 pixels where fine lines become invisible."
        },
        {
          title: "Try SVG Favicons",
          description: "Modern browsers support SVG favicons that scale perfectly to any size and can adapt to dark mode with CSS media queries."
        },
        {
          title: "Test on Dark and Light Tabs",
          description: "Check your favicon against both light and dark browser themes to ensure it remains visible and does not blend into backgrounds."
        },
        {
          title: "Include the ICO Fallback",
          description: "Always provide a traditional favicon.ico file for older browsers and tools that do not support PNG or SVG favicon formats."
        }
      ]
    }
  },

  "invoice-generator": {
    whatIs: {
      heading: "What Is an Invoice?",
      body: "An invoice is a commercial document issued by a seller to a buyer that itemizes products or services provided, their quantities, agreed prices, and payment terms. Invoices serve as a legal record of a transaction and are essential for accounting, tax compliance, and cash flow management.\n\nKey components include a unique invoice number, issue and due dates, seller and buyer details, line items with descriptions and amounts, tax calculations, and the total due. Many jurisdictions require specific information on invoices such as VAT numbers or business registration IDs, making a structured generator invaluable for compliance."
    },
    useCases: {
      heading: "Common Use Cases",
      items: [
        {
          title: "Freelancer Billing",
          description: "Create professional invoices for client projects with itemized hours, rates, and payment terms without needing accounting software."
        },
        {
          title: "Small Business Invoicing",
          description: "Generate branded invoices with your company logo and details for product sales, service agreements, or recurring subscriptions."
        },
        {
          title: "Contractor Payments",
          description: "Produce clear invoices for subcontractor work that document scope, deliverables, and agreed compensation for both parties' records."
        },
        {
          title: "Expense Tracking",
          description: "Maintain a numbered archive of all issued invoices to simplify bookkeeping, tax preparation, and annual financial reporting."
        }
      ]
    },
    tips: {
      heading: "Invoicing Best Practices",
      items: [
        {
          title: "Include Payment Terms",
          description: "Clearly state when payment is due, such as Net 30, and list accepted payment methods to avoid delays and confusion."
        },
        {
          title: "Use Sequential Numbering",
          description: "Assign unique, sequential invoice numbers for easy reference, dispute resolution, and compliance with accounting audit requirements."
        },
        {
          title: "Keep Detailed Records",
          description: "Store copies of every invoice issued and received for at least the legally required retention period in your jurisdiction."
        },
        {
          title: "Specify Currency Clearly",
          description: "Always indicate the currency code such as USD, EUR, or GBP on international invoices to prevent payment amount misunderstandings."
        }
      ]
    }
  }
}
