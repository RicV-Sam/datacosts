import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, stat, utimes, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { writeGeneratedTextIfChanged } from '../scripts/write-generated-file';

test('line-ending-only generated output does not rewrite a tracked-style file', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wp1-generated-clean-'));
  const file = path.join(root, 'sitemap.xml');
  try {
    await writeFile(file, 'one\r\ntwo\r\n', 'utf8');
    const fixedTime = new Date('2026-01-01T00:00:00.000Z');
    await utimes(file, fixedTime, fixedTime);
    const before = await stat(file);
    const changed = await writeGeneratedTextIfChanged(file, 'one\ntwo\n');
    const after = await stat(file);
    assert.equal(changed, false);
    assert.equal(after.mtimeMs, before.mtimeMs);
    assert.equal(await readFile(file, 'utf8'), 'one\r\ntwo\r\n');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('meaningful generated changes preserve the checked-out newline convention', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'wp1-generated-change-'));
  const file = path.join(root, '_redirects');
  try {
    await writeFile(file, 'old\r\n', 'utf8');
    const changed = await writeGeneratedTextIfChanged(file, 'new\n');
    assert.equal(changed, true);
    assert.equal(await readFile(file, 'utf8'), 'new\r\n');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
