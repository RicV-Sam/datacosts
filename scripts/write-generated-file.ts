import { readFile, writeFile } from 'node:fs/promises';

function normalizeLineEndings(value: string): string {
  return value.replace(/\r\n?/g, '\n');
}

export async function writeGeneratedTextIfChanged(filePath: string, nextContent: string): Promise<boolean> {
  let currentContent: string | null = null;
  try {
    currentContent = await readFile(filePath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }

  const normalizedNext = normalizeLineEndings(nextContent);
  if (currentContent !== null && normalizeLineEndings(currentContent) === normalizedNext) return false;

  const newline = currentContent?.includes('\r\n') ? '\r\n' : '\n';
  const output = newline === '\n' ? normalizedNext : normalizedNext.replace(/\n/g, newline);
  await writeFile(filePath, output, 'utf8');
  return true;
}
