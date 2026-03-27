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
}
