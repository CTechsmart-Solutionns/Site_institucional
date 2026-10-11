// Gera favicon, ícones, logo.png e og-image.png em <out>/ com textos convertidos em path (fonte Sora).
import opentype from 'opentype.js';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const [fontDir, out] = process.argv.slice(2);
const font = (w) => { const b = fs.readFileSync(path.join(fontDir, `sora-latin-${w}-normal.woff`)); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
// O opentype.js corrompe pontos de glifos reutilizados (NaN) com estes WOFF; reabrimos a fonte por glifo.
const fresh = (w) => () => font(w);
const bold = { w: 700 }, regular = { w: 400 }, semi = { w: 600 };
for (const f of [bold, regular, semi]) Object.assign(f, { base: font(f.w), get: fresh(f.w) });

const C = { marinho: '#0B1F33', petroleo: '#0E7490', ciano: '#67E8F9', nevoa: '#F3F8F9', ardosia: '#4A5B6B', branco: '#FFFFFF' };

const symbol = (stroke, accent, { simple = false } = {}) => `
  <path d="M47.56 16.44 L22.7 12.07 L10 32 L22.7 51.93 L47.56 47.56 M10 32 H38" stroke="${stroke}" stroke-width="${simple ? 5.5 : 3.5}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  ${simple ? '' : `<circle cx="22.7" cy="12.07" r="4.5" fill="${stroke}"/><circle cx="10" cy="32" r="5" fill="${stroke}"/><circle cx="22.7" cy="51.93" r="4.5" fill="${stroke}"/>`}
  <circle cx="47.56" cy="16.44" r="${simple ? 7 : 5.5}" fill="${accent}"/><circle cx="47.56" cy="47.56" r="${simple ? 7 : 5.5}" fill="${accent}"/><circle cx="40" cy="32" r="${simple ? 7 : 5.5}" fill="${accent}"/>`;

// toPathData() do opentype.js 2.0 gera NaN; serializamos os comandos manualmente.
const toD = (p) => p.commands.map((c) => c.type + [c.x1, c.y1, c.x2, c.y2, c.x, c.y].filter((v) => v !== undefined).map((v) => v.toFixed(2)).join(' ')).join('');
// Glifo a glifo (getPath da string inteira gera NaN em algumas palavras com a Sora).
function layout(f, str, size, letterSpacing = 0) {
  const scale = size / f.base.unitsPerEm;
  let x = 0;
  const glyphs = [];
  const chars = [...str];
  chars.forEach((ch, i) => {
    const g = f.base.charToGlyph(ch);
    glyphs.push([ch, x]);
    x += g.advanceWidth * scale + letterSpacing * size;
    if (i < chars.length - 1) x += f.base.getKerningValue(g, f.base.charToGlyph(chars[i + 1])) * scale;
  });
  return { glyphs, width: x };
}
const text = (f, str, x, y, size, fill, letterSpacing = 0) => {
  const d = layout(f, str, size, letterSpacing).glyphs.map(([ch, gx]) => toD(f.get().charToGlyph(ch).getPath(x + gx, y, size))).join('');
  return `<path d="${d}" fill="${fill}"/>`;
};
const width = (f, str, size, letterSpacing = 0) => layout(f, str, size, letterSpacing).width;

// Assinatura horizontal, origem (x,y) = canto sup. esquerdo do símbolo; escala s (1 = 38px de símbolo).
function lockup(x, y, s, dark = false) {
  const stroke = dark ? C.branco : C.marinho;
  const accent = dark ? C.ciano : C.petroleo;
  const markW = 38 * s, markH = 40 * s;
  const tx = x + markW + 6 * s;
  const nameSize = 19 * s;
  const ctechW = width(bold, 'CTech', nameSize, -0.02);
  const baseline = y + markH / 2 + 2 * s;
  return `
  <svg x="${x}" y="${y}" width="${markW}" height="${markH}" viewBox="4 6 50 52">${symbol(stroke, accent)}</svg>
  ${text(bold, 'CTech', tx, baseline, nameSize, stroke, -0.02)}
  ${text(regular, 'smart', tx + ctechW, baseline, nameSize, accent, -0.02)}
  ${text(semi, 'SOLUTIONS', tx, baseline + 9 * s, 6 * s, dark ? '#B6C3CF' : C.ardosia, 0.42)}`;
}

const svgDoc = (w, h, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ''}${body}</svg>`;

fs.mkdirSync(out, { recursive: true });

// favicon.svg — versão simplificada; troca para negativo no tema escuro do navegador.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 4 52 56">
<style>.s{stroke:${C.marinho}}.a{fill:${C.petroleo}}@media (prefers-color-scheme:dark){.s{stroke:${C.branco}}.a{fill:${C.ciano}}}</style>
<path class="s" d="M47.56 16.44 L22.7 12.07 L10 32 L22.7 51.93 L47.56 47.56 M10 32 H38" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<circle class="a" cx="47.56" cy="16.44" r="7"/><circle class="a" cx="47.56" cy="47.56" r="7"/><circle class="a" cx="40" cy="32" r="7"/></svg>`;
fs.writeFileSync(path.join(out, 'favicon.svg'), favicon);

// favicon.ico (32px PNG embutido)
const fav32 = await sharp(Buffer.from(favicon.replace(/<style>.*<\/style>/s, '').replace(/class="s"/g, `stroke="${C.marinho}"`).replace(/class="a"/g, `fill="${C.petroleo}"`)), { density: 300 })
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6); ico.writeUInt8(32, 7); ico.writeUInt8(0, 8); ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12); ico.writeUInt32LE(fav32.length, 14); ico.writeUInt32LE(22, 18);
fs.writeFileSync(path.join(out, 'favicon.ico'), Buffer.concat([ico, fav32]));

// Ícone de app / avatar: símbolo em negativo sobre Azul-marinho.
const appIcon = (size) => svgDoc(size, size,
  `<svg x="${size * 0.18}" y="${size * 0.17}" width="${size * 0.64}" height="${size * 0.66}" viewBox="4 6 50 52">${symbol(C.branco, C.ciano)}</svg>`, C.marinho);
for (const [name, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(Buffer.from(appIcon(size))).png().toFile(path.join(out, name));
}

// logo.png — assinatura horizontal (JSON-LD Organization).
await sharp(Buffer.from(svgDoc(600, 180, lockup(40, 30, 3), C.branco))).png().toFile(path.join(out, 'logo.png'));

// og-image.png 1200×630
const lines = ['Atendimento, agenda e gestão', 'conectados em uma só plataforma.'];
const og = svgDoc(1200, 630, `
  ${lockup(80, 70, 2)}
  ${text(semi, 'SOFTWARE PARA CLÍNICAS E LABORATÓRIOS', 80, 290, 22, C.petroleo, 0.2)}
  ${lines.map((l, i) => text(bold, l, 80, 370 + i * 72, 60, C.marinho, -0.03)).join('')}
  ${text(regular, 'Chatbot de atendimento · Fast-Lab', 80, 545, 28, C.ardosia)}
  <rect x="0" y="618" width="1200" height="12" fill="${C.petroleo}"/>`, C.nevoa);
await sharp(Buffer.from(og)).png().toFile(path.join(out, 'og-image.png'));

console.log('ok', fs.readdirSync(out));
