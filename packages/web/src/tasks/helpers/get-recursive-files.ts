import fs from 'node:fs';
import path from 'node:path';

export async function getRecursiveFiles(
  extensions: string[] | null,
  exclude: RegExp | null,
  dirs: string[]
): Promise<string[]> {
  if (!dirs.length) return [];

  const files: string[] = [];
  const dir = dirs[0];
  const pending = dirs.slice(1);

  const normalExtensions = extensions
    ? extensions.map((extension) => {
        return extension.startsWith('.') ? extension : `.${extension}`;
      })
    : null;

  const items = await new Promise<string[]>((resolve, reject) => {
    return fs.readdir(dir, (err, res) => (err ? reject(err) : resolve(res)));
  });

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = await new Promise<fs.Stats>((resolve, reject) => {
      return fs.stat(itemPath, (err, res) => {
        return err ? reject(err) : resolve(res);
      });
    });

    if (!exclude || !exclude.exec(itemPath)) {
      if (stats.isDirectory()) {
        pending.push(itemPath);
      } else {
        const ext = path.extname(itemPath);
        if (!normalExtensions || normalExtensions.includes(ext)) {
          files.push(itemPath);
        }
      }
    }
  }

  return files.concat(
    await getRecursiveFiles(normalExtensions, exclude, pending)
  );
}
