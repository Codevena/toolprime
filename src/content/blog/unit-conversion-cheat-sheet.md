---
title: "Unit Conversion Cheat Sheet for Developers"
description: "Quick reference tables for common unit conversions: bytes, time, distance, weight, and temperature. Essential for developers working across systems."
date: 2026-03-20
category: reference
tags: [reference, conversions, developer]
relatedTools: [unit-converter, percentage-calculator]
---

Developers frequently need to convert between units — bytes to megabytes for storage calculations, milliseconds to human-readable time for debugging, or metric to imperial for international projects. This cheat sheet covers the most common conversions with ready-to-use reference tables.

Bookmark this page or use the [Unit Converter](/unit-converter) for instant calculations.

## Digital Storage

Digital storage is measured in bytes, with larger units using either binary (powers of 1024) or decimal (powers of 1000) prefixes. The distinction matters: a "1 TB" hard drive holds 1,000,000,000,000 bytes (decimal), but your operating system reports it as 931 GB (binary).

### Binary (IEC) Units

| Unit | Bytes | Practical Reference |
|------|-------|-------------------|
| 1 KiB (Kibibyte) | 1,024 | A short text file |
| 1 MiB (Mebibyte) | 1,048,576 | A high-quality photo |
| 1 GiB (Gibibyte) | 1,073,741,824 | ~20 minutes of HD video |
| 1 TiB (Tebibyte) | 1,099,511,627,776 | ~250 hours of HD video |

### Decimal (SI) Units

| Unit | Bytes | Used By |
|------|-------|---------|
| 1 KB (Kilobyte) | 1,000 | Network speeds, drive manufacturers |
| 1 MB (Megabyte) | 1,000,000 | File downloads, email limits |
| 1 GB (Gigabyte) | 1,000,000,000 | Mobile data plans, drive capacities |
| 1 TB (Terabyte) | 1,000,000,000,000 | Cloud storage, hard drives |

### Quick Conversions

- 1 GB = 1,024 MB (binary) or 1,000 MB (decimal)
- 1 TB = 1,024 GB (binary) or 1,000 GB (decimal)
- 1 MB = 8 Megabits (Mb) — important for network speeds
- 100 Mbps internet = 12.5 MB/s actual download speed

**Developer tip**: When calculating file sizes in code, use binary units (1024). When displaying sizes to users, consider using decimal units (1000) to match expectations from drive manufacturers and network providers.

## Time

Time conversions are constant sources of bugs in software. Off-by-one errors, timezone confusion, and inconsistent units cause more subtle issues than most developers realize.

### Reference Table

| From | To | Multiplier |
|------|------|-----------|
| 1 second | 1,000 milliseconds | x 1,000 |
| 1 minute | 60 seconds | x 60 |
| 1 hour | 3,600 seconds | x 3,600 |
| 1 day | 86,400 seconds | x 86,400 |
| 1 week | 604,800 seconds | x 604,800 |
| 1 year | 31,536,000 seconds | x 31,536,000 (approx) |

### Useful Constants for Code

```
1 second  = 1_000 ms
1 minute  = 60_000 ms
1 hour    = 3_600_000 ms
1 day     = 86_400_000 ms
1 week    = 604_800_000 ms
```

### Common Timeout Values

| Use Case | Typical Value |
|----------|--------------|
| API request timeout | 5,000-30,000 ms |
| Database query timeout | 5,000-60,000 ms |
| Session timeout | 1,800,000 ms (30 min) |
| JWT token expiry | 3,600 s (1 hour) |
| Cache TTL (short) | 300 s (5 minutes) |
| Cache TTL (long) | 86,400 s (24 hours) |

Use the [Timestamp Converter](/timestamp-converter) to convert between Unix timestamps and human-readable dates when debugging time-related issues.

## Length / Distance

### Metric to Imperial

| Metric | Imperial | Factor |
|--------|----------|--------|
| 1 millimeter (mm) | 0.0394 inches | x 0.0394 |
| 1 centimeter (cm) | 0.3937 inches | x 0.3937 |
| 1 meter (m) | 3.2808 feet | x 3.2808 |
| 1 kilometer (km) | 0.6214 miles | x 0.6214 |

### Imperial to Metric

| Imperial | Metric | Factor |
|----------|--------|--------|
| 1 inch (in) | 2.54 cm | x 2.54 (exact) |
| 1 foot (ft) | 30.48 cm | x 30.48 |
| 1 yard (yd) | 0.9144 m | x 0.9144 |
| 1 mile (mi) | 1.6093 km | x 1.6093 |

### Developer Reference

| Screen Context | Size |
|---------------|------|
| 1 CSS pixel | 1/96 inch (0.26 mm) at 96 DPI |
| iPhone screen width | 375-430 CSS pixels |
| Typical laptop | 1366-1920 CSS pixels |
| A4 paper | 210 x 297 mm (8.27 x 11.69 in) |
| US Letter | 216 x 279 mm (8.5 x 11 in) |

## Weight / Mass

### Metric to Imperial

| Metric | Imperial | Factor |
|--------|----------|--------|
| 1 gram (g) | 0.0353 oz | x 0.0353 |
| 1 kilogram (kg) | 2.2046 lbs | x 2.2046 |
| 1 metric ton (t) | 2,204.6 lbs | x 2,204.6 |

### Imperial to Metric

| Imperial | Metric | Factor |
|----------|--------|--------|
| 1 ounce (oz) | 28.3495 g | x 28.3495 |
| 1 pound (lb) | 0.4536 kg | x 0.4536 |

### Quick Mental Math

- **kg to lbs**: Double and add 10% (70 kg: 70 x 2 = 140, + 14 = 154 lbs; actual: 154.3)
- **lbs to kg**: Halve and subtract 10% (150 lbs: 150 / 2 = 75, - 7.5 = 67.5 kg; actual: 68.0)

## Temperature

### Formulas

- **Celsius to Fahrenheit**: F = (C x 9/5) + 32
- **Fahrenheit to Celsius**: C = (F - 32) x 5/9
- **Celsius to Kelvin**: K = C + 273.15

### Key Reference Points

| Description | Celsius | Fahrenheit | Kelvin |
|-------------|---------|------------|--------|
| Absolute zero | -273.15 | -459.67 | 0 |
| Water freezes | 0 | 32 | 273.15 |
| Room temperature | 20-22 | 68-72 | 293-295 |
| Body temperature | 37 | 98.6 | 310.15 |
| Water boils | 100 | 212 | 373.15 |

### Quick Mental Math

- **C to F**: Double and add 30 (gives approximate value; 20 C: 40 + 30 = 70 F; actual: 68 F)
- **F to C**: Subtract 30 and halve (72 F: 42 / 2 = 21 C; actual: 22.2 C)

## Volume (Cooking)

| Unit | Milliliters | US Cups |
|------|------------|---------|
| 1 teaspoon (tsp) | 4.93 mL | 1/48 cup |
| 1 tablespoon (tbsp) | 14.79 mL | 1/16 cup |
| 1 fluid ounce (fl oz) | 29.57 mL | 1/8 cup |
| 1 cup (US) | 236.59 mL | 1 cup |
| 1 pint (US) | 473.18 mL | 2 cups |
| 1 quart (US) | 946.35 mL | 4 cups |
| 1 gallon (US) | 3,785.41 mL | 16 cups |
| 1 liter | 1,000 mL | 4.23 cups |

**Note**: UK/Imperial cups (284 mL) and Australian cups (250 mL) differ from US cups (237 mL). Always check which system a recipe uses.

## CSS Units

For front-end developers, CSS units deserve their own reference:

| Unit | Relative To | Common Use |
|------|------------|------------|
| px | Viewport | Borders, shadows, fixed elements |
| rem | Root font size (default 16px) | Font sizes, spacing, margins |
| em | Parent font size | Component-relative sizing |
| % | Parent element | Widths, responsive layouts |
| vw | 1% of viewport width | Full-width elements |
| vh | 1% of viewport height | Full-height sections |
| ch | Width of the "0" character | Max line lengths for readability |

### Common CSS Conversions (at 16px root)

| rem | Pixels |
|-----|--------|
| 0.25rem | 4px |
| 0.5rem | 8px |
| 0.75rem | 12px |
| 1rem | 16px |
| 1.25rem | 20px |
| 1.5rem | 24px |
| 2rem | 32px |
| 3rem | 48px |
| 4rem | 64px |

## Using the Unit Converter

For conversions not covered in these tables, or when you need precise values with many decimal places, use the [Unit Converter](/unit-converter). It covers hundreds of unit combinations across length, weight, temperature, volume, area, speed, time, and digital storage.

Keep this cheat sheet handy for the quick lookups you do every day. For everything else, there is always a converter tool a click away.
