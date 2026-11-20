import { readFileSync, writeFileSync } from 'node:fs';

const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const sbom = JSON.parse(readFileSync('sbom.json', 'utf8'));

const integrityByPurl = new Map();
for (const [path, pkg] of Object.entries(lock.packages)) {
  if (!path || !pkg.integrity || !pkg.version) continue;
  const name = path.split('node_modules/').pop();
  const purl = `pkg:npm/${encodeURIComponent(name).replace(/%2F/g, '/')}@${pkg.version}`;
  integrityByPurl.set(purl, pkg.integrity);
}

for (const component of sbom.components) {
  const integrity = integrityByPurl.get(component.purl);
  if (!integrity) continue;
  const [alg, base64] = integrity.split('-');
  component.hashes = [
    { alg: `SHA-${alg.slice(3)}`, content: Buffer.from(base64, 'base64').toString('hex') },
  ];
}

const missing = sbom.components.filter((component) => !component.hashes?.length);
if (missing.length) {
  throw new Error(`Sem hash no lockfile para: ${missing.map((c) => c.purl).join(', ')}`);
}

writeFileSync('sbom.json', `${JSON.stringify(sbom, null, 2)}\n`);
