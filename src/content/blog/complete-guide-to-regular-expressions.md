---
title: "The Complete Guide to Regular Expressions"
description: "Learn regex from basics to advanced: character classes, quantifiers, groups, lookaheads, and practical patterns for everyday development."
date: 2026-03-27
category: tutorial
tags: [regex, programming, developer]
relatedTools: [regex-tester, json-formatter, diff-checker]
---

Regular expressions (regex) are patterns that match text. They are used in every programming language, text editor, command-line tool, and database system. Despite their reputation for being cryptic, regex patterns follow logical rules that become intuitive with practice.

This guide takes you from the fundamentals to advanced techniques, with practical patterns you can use immediately. Open the [Regex Tester](/regex-tester) in another tab to follow along.

## The Basics

A regex pattern is a sequence of characters that defines a search pattern. The simplest regex is a literal string: the pattern `hello` matches the text "hello" exactly. From there, special characters add flexibility.

### Literal Characters

Most characters in a regex match themselves. The pattern `cat` matches the substring "cat" in "concatenate", "catalog", and "the cat sat". Case matters by default — `cat` does not match "Cat" unless you enable the case-insensitive flag.

### The Dot (Wildcard)

The dot `.` matches any single character except a newline. The pattern `c.t` matches "cat", "cot", "cut", and "c@t". It does not match "ct" (no character between c and t) or "cart" (two characters between c and t).

With the dotall flag (`s`), the dot also matches newline characters.

### Escaping Special Characters

The characters `\ . * + ? ^ $ { } [ ] ( ) |` have special meanings in regex. To match them literally, prefix with a backslash. To match a literal dot, use `\.`. To match a literal backslash, use `\\`.

This is the most common regex mistake: forgetting to escape a character that has special meaning. A pattern like `3.14` matches "3.14" but also "3x14" and "3-14" because the dot is a wildcard.

## Character Classes

Character classes match one character from a defined set.

### Square Brackets

`[abc]` matches any single character that is a, b, or c. `[a-z]` matches any lowercase letter. `[A-Z]` matches any uppercase letter. `[0-9]` matches any digit. You can combine ranges: `[a-zA-Z0-9]` matches any alphanumeric character.

A caret inside brackets negates the class: `[^abc]` matches any character that is NOT a, b, or c. `[^0-9]` matches any non-digit character.

### Shorthand Character Classes

Regex provides shortcuts for common character classes:

| Shorthand | Meaning | Equivalent |
|-----------|---------|------------|
| `\d` | Any digit | `[0-9]` |
| `\D` | Any non-digit | `[^0-9]` |
| `\w` | Any word character | `[a-zA-Z0-9_]` |
| `\W` | Any non-word character | `[^a-zA-Z0-9_]` |
| `\s` | Any whitespace | `[ \t\n\r\f\v]` |
| `\S` | Any non-whitespace | `[^ \t\n\r\f\v]` |

These shorthands make patterns more concise. `\d{3}-\d{4}` matches phone number formats like "555-1234".

## Quantifiers

Quantifiers specify how many times the preceding element should repeat.

### Basic Quantifiers

| Quantifier | Meaning |
|------------|---------|
| `*` | Zero or more |
| `+` | One or more |
| `?` | Zero or one (optional) |
| `{n}` | Exactly n times |
| `{n,}` | n or more times |
| `{n,m}` | Between n and m times |

Examples:
- `colou?r` matches both "color" and "colour" (the u is optional)
- `\d+` matches one or more digits: "1", "42", "12345"
- `\d{3}` matches exactly three digits: "123" but not "12" or "1234"
- `\d{2,4}` matches 2, 3, or 4 digits

### Greedy vs. Lazy Matching

By default, quantifiers are greedy — they match as much text as possible. Adding `?` after a quantifier makes it lazy, matching as little as possible.

Consider matching HTML tags in the text `<b>bold</b> and <i>italic</i>`:

- Greedy `<.+>` matches `<b>bold</b> and <i>italic</i>` (everything from the first `<` to the last `>`)
- Lazy `<.+?>` matches `<b>`, `</b>`, `<i>`, `</i>` (each individual tag)

This distinction is critical when parsing structured text. When in doubt, use lazy quantifiers and test with the [Regex Tester](/regex-tester).

## Anchors

Anchors match positions in the string, not characters.

| Anchor | Meaning |
|--------|---------|
| `^` | Start of string (or line in multiline mode) |
| `$` | End of string (or line in multiline mode) |
| `\b` | Word boundary |
| `\B` | Non-word boundary |

Examples:
- `^hello` matches "hello world" but not "say hello"
- `world$` matches "hello world" but not "world peace"
- `\bcat\b` matches "the cat sat" but not "concatenate" (word boundaries prevent partial matches)

Word boundaries are incredibly useful for matching whole words without accidentally matching substrings.

## Groups and Alternation

### Capturing Groups

Parentheses `()` create capturing groups that serve two purposes: grouping elements for quantifiers and capturing matched text for extraction.

The pattern `(\d{3})-(\d{4})` applied to "555-1234" captures two groups:
- Group 1: "555"
- Group 2: "1234"

In JavaScript:
```javascript
const match = "555-1234".match(/(\d{3})-(\d{4})/)
// match[1] = "555", match[2] = "1234"
```

### Named Capturing Groups

Named groups use the syntax `(?<name>...)` for self-documenting patterns:

```
(?<areaCode>\d{3})-(?<number>\d{4})
```

Accessing named groups is clearer than using numeric indices, especially in complex patterns with many groups.

### Non-Capturing Groups

When you need grouping for structure but do not need the captured value, use non-capturing groups `(?:...)`. They are slightly more efficient and keep your group numbering clean.

`(?:Mr|Mrs|Ms)\.?\s+\w+` matches titles with names without capturing the title separately.

### Alternation

The pipe `|` acts as an OR operator. `cat|dog` matches "cat" or "dog". Use groups to limit the scope of alternation: `gr(a|e)y` matches "gray" or "grey".

Without groups, alternation applies to the entire pattern: `gray|grey` also works but `gr(a|e)y` is more precise and reveals the intent.

## Lookaheads and Lookbehinds

Lookarounds match a position based on what comes before or after, without including that text in the match. They are zero-width assertions — they check a condition but consume no characters.

### Positive Lookahead

`(?=...)` matches a position followed by the pattern inside. `\d+(?= dollars)` matches the number in "100 dollars" but not in "100 euros". The word "dollars" is checked but not included in the match.

### Negative Lookahead

`(?!...)` matches a position NOT followed by the pattern. `\d+(?! dollars)` matches numbers that are not followed by " dollars".

### Positive Lookbehind

`(?<=...)` matches a position preceded by the pattern. `(?<=\$)\d+` matches "100" in "$100" but not in "100" (requires the dollar sign before the digits).

### Negative Lookbehind

`(?<!...)` matches a position NOT preceded by the pattern. `(?<!\$)\d+` matches numbers not preceded by a dollar sign.

### Practical Lookaround Example

To match passwords that contain at least one digit and one uppercase letter:

```
^(?=.*\d)(?=.*[A-Z]).{8,}$
```

This uses two positive lookaheads at the start: one checks for a digit anywhere in the string, another checks for an uppercase letter. Both must succeed before the `.{8,}` matches 8 or more characters.

## Flags

Flags modify how the regex engine processes the pattern.

| Flag | Name | Effect |
|------|------|--------|
| `g` | Global | Find all matches, not just the first |
| `i` | Case-insensitive | `a` matches both "a" and "A" |
| `m` | Multiline | `^` and `$` match line boundaries, not just string boundaries |
| `s` | Dotall | `.` matches newline characters too |
| `u` | Unicode | Enable full Unicode matching |

In most cases, you want the global flag enabled. In the [Regex Tester](/regex-tester), you can toggle each flag independently to see how they affect your matches.

## Practical Patterns

Here are battle-tested patterns for common validation tasks. Each one has been refined to balance strictness with practical usability.

### Email Address (Basic)

```
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

This covers 99% of real email addresses. A fully RFC 5322 compliant pattern is thousands of characters long and not practical — use a basic regex for format checking and verify with a confirmation email.

### URL

```
^https?:\/\/[a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+(:\d+)?(\/[-a-zA-Z0-9@:%._+~#=]*)*(\?[-a-zA-Z0-9@:%._+~#&=]*)?(#[-a-zA-Z0-9_]*)?$
```

### IPv4 Address

```
^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$
```

Each octet must be 0-255. The pattern uses alternation to handle the three numeric ranges: 250-255, 200-249, and 0-199.

### Date (YYYY-MM-DD)

```
^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$
```

This validates the format and restricts months to 01-12 and days to 01-31. It does not validate that the day is valid for the given month (February 30 would pass). For full date validation, use a date parsing library.

### Hex Color Code

```
^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$
```

Matches both 3-digit shorthand (#FFF) and 6-digit (#FFFFFF) hex colors.

## Performance Considerations

### Catastrophic Backtracking

Certain regex patterns can cause exponential backtracking, effectively hanging the regex engine. The classic example is `(a+)+b` tested against a string of many "a" characters with no "b". The engine tries every possible way to divide the "a"s between the inner and outer repetition before giving up.

Avoid nested quantifiers on the same characters. If your pattern takes noticeably long on certain inputs, simplify it.

### Anchoring

Always anchor patterns when validating entire strings. Without `^` and `$`, the pattern `\d{3}-\d{4}` matches "555-1234" inside "call 555-1234 now". With anchors, `^\d{3}-\d{4}$` only matches if the entire string is in that format.

### Character Class Optimization

`[a-zA-Z]` is faster than `[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]`. Use ranges in character classes whenever possible.

## Debugging Regex

When a pattern does not work as expected:

1. **Start simple**: Build the pattern incrementally, testing after each addition
2. **Use a tester**: The [Regex Tester](/regex-tester) shows matches in real time as you modify the pattern
3. **Check flags**: Case-insensitive and multiline modes change matching behavior significantly
4. **Test edge cases**: Empty strings, strings with only whitespace, strings with special characters
5. **Reduce greediness**: If your pattern matches too much, try lazy quantifiers

Regular expressions are a skill that improves with practice. Start with the basics — literal matching, character classes, and quantifiers — and gradually incorporate groups, lookarounds, and flags as needed. Keep the [Regex Tester](/regex-tester) bookmarked for quick experimentation.
