import type { ToolContent } from './tool-content'

export const toolContent5: Record<string, ToolContent> = {
  "markdown-editor": {
    whatIs: {
      heading: "What Is a Markdown Editor?",
      body: "A Markdown editor is a writing tool that lets you format text using lightweight syntax instead of toolbar buttons or complex word-processing menus. Markdown uses simple characters like # for headings, ** for bold, and - for bullet lists to define structure and emphasis. The syntax was created by John Gruber in 2004 to let people write in plain text that is still easy to read before rendering.\n\nOnline Markdown editors typically feature a split-pane interface: you write raw Markdown on one side and see the formatted output on the other in real time. This live preview workflow eliminates the guess-and-check cycle of writing Markdown in a plain text file and then opening it separately to confirm the output. Syntax highlighting for fenced code blocks is another essential feature, as developers frequently embed snippets in documentation and README files. A browser-based editor like this one requires no installation and works on any device, making it ideal for quick edits, note-taking, and drafting technical content on the go."
    },
    useCases: {
      heading: "Popular Use Cases",
      items: [
        {
          title: "README and Documentation",
          description: "Draft GitHub README files, project wikis, and API documentation with instant preview so you can verify formatting before committing."
        },
        {
          title: "Blog Post Drafting",
          description: "Write blog posts in Markdown, preview them with proper heading hierarchy and emphasis, then copy the HTML to paste into your CMS."
        },
        {
          title: "Note-Taking and Knowledge Bases",
          description: "Take structured notes with headings, lists, and code snippets that render cleanly, making them easier to scan and share with teammates."
        },
        {
          title: "Email and Report Formatting",
          description: "Compose formatted content quickly using Markdown shortcuts, then copy the rendered HTML into email clients or report templates."
        }
      ]
    },
    tips: {
      heading: "Tips for Writing Markdown",
      items: [
        {
          title: "Use Heading Hierarchy",
          description: "Start with a single # for the page title, then use ## and ### for subsections. Skipping heading levels hurts readability and accessibility."
        },
        {
          title: "Fenced Code Blocks with Language Tags",
          description: "Wrap code in triple backticks and specify the language (e.g. ```javascript) to enable syntax highlighting in the preview output."
        },
        {
          title: "Reference-Style Links",
          description: "For documents with many links, use reference-style syntax [text][id] to keep paragraphs readable and manage URLs in one place at the bottom."
        },
        {
          title: "Preview Before Publishing",
          description: "Always check the rendered output for broken links, unclosed formatting, and heading hierarchy before copying or exporting your Markdown."
        }
      ]
    }
  },

  "markdown-to-pdf": {
    whatIs: {
      heading: "What Is Markdown to PDF Conversion?",
      body: "Markdown to PDF conversion transforms lightweight Markdown text into a portable, print-ready PDF document. Markdown files are easy to write and version-control, but they are not suitable for sharing with people who expect polished, paginated documents. Converting to PDF bridges that gap by rendering headings, lists, tables, code blocks, and inline formatting into a universally readable file format.\n\nThe conversion process typically parses the Markdown into HTML, styles it with a clean typographic layout, and then generates a paginated PDF using a rendering engine. Browser-based converters handle the entire pipeline on your device without uploading content to a server, which is important when working with confidential notes, contracts, or internal documentation. The resulting PDF can be emailed, printed, or archived while preserving the exact formatting you see in the preview. This workflow is especially popular among developers, technical writers, and students who author content in Markdown but need to deliver it as a professional-looking document."
    },
    useCases: {
      heading: "Popular Use Cases",
      items: [
        {
          title: "Technical Documentation Export",
          description: "Convert project docs, changelogs, and specifications written in Markdown into PDFs for stakeholders who prefer traditional document formats."
        },
        {
          title: "Resume and Cover Letter",
          description: "Maintain your resume in Markdown for easy version control, then export it to PDF whenever you need a polished copy to send to recruiters."
        },
        {
          title: "Meeting Notes and Reports",
          description: "Turn structured meeting notes with action items and tables into downloadable PDFs that can be shared via email or archived for compliance."
        },
        {
          title: "Student Assignments",
          description: "Write essays and lab reports in Markdown with headings and references, then export them as PDFs that meet submission formatting requirements."
        }
      ]
    },
    tips: {
      heading: "Tips for Better PDF Output",
      items: [
        {
          title: "Keep Tables Simple",
          description: "PDF renderers handle basic tables well, but deeply nested or very wide tables may overflow the page. Keep columns concise for best results."
        },
        {
          title: "Use Headings for Page Structure",
          description: "Clear heading hierarchy (H1, H2, H3) translates into a well-organized PDF with visual separation between sections."
        },
        {
          title: "Preview Before Downloading",
          description: "Check the live preview to catch formatting issues like broken lists or missing line breaks before generating the PDF file."
        },
        {
          title: "Avoid Extremely Long Code Blocks",
          description: "Very long code blocks may span multiple pages awkwardly. Consider trimming examples to the essential lines for cleaner PDF output."
        }
      ]
    }
  }
}
