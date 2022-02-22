#!/usr/bin/env python3

import json

ENCODING = "cp1251"
# MIN = 0x20
MIN = 0x80
MAX = 0x100

charmap = {}

for enc in range(MIN, MAX):
    try:
        dec = ord(bytes([enc]).decode(ENCODING))
    except UnicodeDecodeError:
        continue
    # charmap[enc] = dec
    charmap[dec] = enc

print(json.dumps(charmap, indent=2))
