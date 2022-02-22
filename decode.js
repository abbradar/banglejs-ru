// Convert UTF-8 to CP1251.

const cp1251Charmap = {
  "1026": 128,
  "1027": 129,
  "8218": 130,
  "1107": 131,
  "8222": 132,
  "8230": 133,
  "8224": 134,
  "8225": 135,
  "8364": 136,
  "8240": 137,
  "1033": 138,
  "8249": 139,
  "1034": 140,
  "1036": 141,
  "1035": 142,
  "1039": 143,
  "1106": 144,
  "8216": 145,
  "8217": 146,
  "8220": 147,
  "8221": 148,
  "8226": 149,
  "8211": 150,
  "8212": 151,
  "8482": 153,
  "1113": 154,
  "8250": 155,
  "1114": 156,
  "1116": 157,
  "1115": 158,
  "1119": 159,
  "160": 160,
  "1038": 161,
  "1118": 162,
  "1032": 163,
  "164": 164,
  "1168": 165,
  "166": 166,
  "167": 167,
  "1025": 168,
  "169": 169,
  "1028": 170,
  "171": 171,
  "172": 172,
  "173": 173,
  "174": 174,
  "1031": 175,
  "176": 176,
  "177": 177,
  "1030": 178,
  "1110": 179,
  "1169": 180,
  "181": 181,
  "182": 182,
  "183": 183,
  "1105": 184,
  "8470": 185,
  "1108": 186,
  "187": 187,
  "1112": 188,
  "1029": 189,
  "1109": 190,
  "1111": 191,
  "1040": 192,
  "1041": 193,
  "1042": 194,
  "1043": 195,
  "1044": 196,
  "1045": 197,
  "1046": 198,
  "1047": 199,
  "1048": 200,
  "1049": 201,
  "1050": 202,
  "1051": 203,
  "1052": 204,
  "1053": 205,
  "1054": 206,
  "1055": 207,
  "1056": 208,
  "1057": 209,
  "1058": 210,
  "1059": 211,
  "1060": 212,
  "1061": 213,
  "1062": 214,
  "1063": 215,
  "1064": 216,
  "1065": 217,
  "1066": 218,
  "1067": 219,
  "1068": 220,
  "1069": 221,
  "1070": 222,
  "1071": 223,
  "1072": 224,
  "1073": 225,
  "1074": 226,
  "1075": 227,
  "1076": 228,
  "1077": 229,
  "1078": 230,
  "1079": 231,
  "1080": 232,
  "1081": 233,
  "1082": 234,
  "1083": 235,
  "1084": 236,
  "1085": 237,
  "1086": 238,
  "1087": 239,
  "1088": 240,
  "1089": 241,
  "1090": 242,
  "1091": 243,
  "1092": 244,
  "1093": 245,
  "1094": 246,
  "1095": 247,
  "1096": 248,
  "1097": 249,
  "1098": 250,
  "1099": 251,
  "1100": 252,
  "1101": 253,
  "1102": 254,
  "1103": 255
};

// Inefficient; need an efficient way to convert Uint8Array to String.
const decodeString = (arr) => {
  let out = "";
  for (let c of arr) {
    out = out + String.fromCharCode(c);
  }
  return out;
};

const invalidCharacter = '_'.charCodeAt(0);
const unknownCharacter = invalidCharacter;

const decodeUtf8 = (charmap, str) => {
  const length = str.length;
  let outLength = 0;
  let i = 0;
  const out = Uint8Array(length);
  while (i < length) {
    const chr = str.charCodeAt(i);
    console.log("current char code", chr);
    if (chr < 0x80) {
      out[outLength++] = chr;
      i += 1;
      continue;
    }

    let codePoint;

    const chr2 = str.charCodeAt(i + 1);
    console.log("current char code2", chr2);
    if ((chr2 & 0xC0) !== 0x80) {
      out[outLength++] = invalidCharacter;
      i += 1;
      continue;
    }
    if (chr < 0xE0 && chr >= 0xC0) {
      codePoint = (chr & 0x1F) << 6 | (chr2 & 0x3F);
      i += 2;
    } else {
      const chr3 = str.charCodeAt(i + 2);
      console.log("current char code3", chr3);
      if ((chr3 & 0xC0) !== 0x80) {
        out[outLength++] = invalidCharacter;
        i += 1;
        continue;
      }
      if (chr < 0xF0 && chr >= 0xE0) {
        codePoint = (chr & 0xF) << 12 | (chr2 & 0x3F) << 6 | (chr3 & 0x3F);
        i += 3;
      } else {
        const chr4 = str.charCodeAt(i + 3);
        console.log("current char code4", chr3);
        if ((chr4 & 0xC0) !== 0x80) {
          out[outLength++] = invalidCharacter;
          i += 1;
          continue;
        }
        if (chr < 0xF8 && chr >= 0xF0) {
          codePoint = (chr & 0xF) << 18 | (chr2 & 0x3F) << 12 | (chr3 & 0x3F) << 6 | (chr4 & 0x3F) << 6;
          i += 4;
        } else {
          out[outLength++] = invalidCharacter;
          i += 1;
          continue;
        }
      }
    }

    const decoded = charmap[codePoint];
    console.log("code point", codePoint, "decoded", decoded);
    out[outLength++] = decoded === undefined ? unknownCharacter : decoded;
  }
  console.log("out length", outLength, i);
  return decodeString(out.slice(0, outLength));
};

const helloWorld = '\xd0\x9f\xd1\x80\xd0\xb8\xd0\xb2\xd0\xb5\xd1\x82, \xd0\xbc\xd0\xb8\xd1\x80!';
const helloDecoded = decodeUtf8(cp1251Charmap, helloWorld);
const helloTest = '\xcf\xf0\xe8\xe2\xe5\xf2, \xec\xe8\xf0!';
console.log("Decode sucessful:", helloDecoded === helloTest);

Graphics.prototype.setFontUnifont = function(scale) {
  // Actual height 16 (15 - 0)
  this.setFontCustom(atob("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D/wAAAAAD/wDAADAAMADAA/8AAAAAA/8AIAAgACAAIAP/AAAAAAH+AgECAQIBAgEB/gAAAAAD/wIAAgACAAIAA/8AAAAAA/8CIAIgAiACIAHAAAAAAAH+AgECAQIBAgEBhgAAAAACAAIAAgAD/wIAAgACAAAAAwAAwQAzAAwAMADAAwAAAAHwAggCCAf/AggCCAHwAAADAwDMADAAMADMAwMAAAAAA/8AAQABAAEAAQP/AAHAAAPwAAgACAAIABAD/wAAAAAD/wABAAED/wABAAED/wP/AAEAAQP/AAEAAQP/AAHAAAIAAgAD/wAhACEAIQAeAAAD/wAhACEAHgAAA/8AAAAAA/8AIQAhACEAIQAeAAAAAAECAiECIQIhASIA/AAAAAAD/wAgAf4CAQIBAf4AAAAAAcMCLAIwAiACIAP/AAAAAABOAJEAkQCRAJIAfwAAAAAB/gKBBIEEgQSBCH4AAAAAAP8AkQCRAJEAkQBuAAAAAAD/AIAAgACAAIAAgAAAAAAAD4AxAMEAgQCBAP8AAYAAAH4AkQCRAJEAkQByAAAAAADDACQAGAD/ABgAJADDAAAAQgCRAJEAkQCZAGYAAAAAAP8AAwAMADAAwAD/AAAAAAD/CAMEDAQwCMAA/wAAAAAA/wAQACgARACCAIEAAAAAAAEABgD4AIAAgAD/AAAAAAD/AGAAGAAYAGAA/wAAAAAA/wAQABAAEAAQAP8AAAAAAH4AgQCBAIEAgQB+AAAAAAD/AIAAgACAAIAA/wAAAAAA/8BCAIEAgQCBAH4AAAAAAH4AgQCBAIEAgQBCAAAAAACAAIAAgAD/AIAAgACAAAAAwEAwwA8ADAAwAMAAAAAAAH4AgQCBB//AgQCBAH4AAADDACQAGAAYACQAwwAAAAAA/wABAAEAAQABAP8AAcAAAPgABAAEAAQACAD/AAAAAAD/AAEAAQD/AAEAAQD/AP8AAQABAP8AAQABAP8AAcAAAIAAgAD/ABEAEQARAA4AAAD/ABEAEQAOAAAA/wAAAAAA/wARABEAEQARAA4AAAAAAEIAkQCRAJEAUgA8AAAAAAD/ABAAfgCBAIEAfgAAAAAAcQCKAIwAiACIAP8AAA="), 32, atob("CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAgICAgICAgICAgICAgICAgICAgICAgIAAgICAgICAgICAgICAgICAgICAgIAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg="), 16+(scale<<8)+(1<<16));
  return this;
}

g.clear();
g.setFontUnifont(1);
g.drawString(helloTest, 10, 10);