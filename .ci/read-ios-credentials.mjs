// Turns EAS's injected iOS credentials into a certificate and a profile.
// The build log names the target only.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const raw = readFileSync(0, 'utf8').trim();
const parsed = JSON.parse(raw);
const targets = Array.isArray(parsed)
  ? parsed.filter((entry) => entry?.distributionCertificate && entry?.provisioningProfileBase64)
  : Object.entries(parsed)
      .filter(([, entry]) => entry?.distributionCertificate && entry?.provisioningProfileBase64)
      .map(([name, entry]) => ({ targetName: name, ...entry }));

if (targets.length !== 1) {
  const names = targets.map((entry) => entry.targetName).filter(Boolean);
  console.error(`expected one iOS signing target, found ${targets.length}${names.length ? `: ${names.join(', ')}` : ''}`);
  process.exit(1);
}

const [target] = targets;
const dir = '/tmp/exact-sign';
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/cert.p12`, Buffer.from(target.distributionCertificate.dataBase64, 'base64'));
writeFileSync(`${dir}/profile.mobileprovision`, Buffer.from(target.provisioningProfileBase64, 'base64'));
writeFileSync(`${dir}/password`, target.distributionCertificate.password, { mode: 0o600 });
console.error(`signing target ${target.targetName ?? 'ios'}`);
