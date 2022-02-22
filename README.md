# UTF-8 -> CP1251 prototype

1. Use `generate-table.py` to generate a charmap from 8-bit char points (corresponding to CP1251) to UTF-8;
2. Use [patched Font Converter](https://abbradar.moe/me/banglejs-font.html), select generated charmap and generate a font;
3. Use font together with reverse charmap (can be generated with the same script) and decoding function in `deecode.js` to display Russian text from UTF-8 strings.
