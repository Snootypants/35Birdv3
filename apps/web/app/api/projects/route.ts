import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export async function GET() {
  const dir = path.join(process.cwd(), 'content', 'projects');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const items = files
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.mdx?$/, ''),
        title: data.title ?? 'Untitled',
        summary: data.summary ?? '',
        cover_url: data.cover_url ?? null,
        tags: data.tags ?? [],
        created_at: data.created_at ?? null
      };
    });
  return new Response(JSON.stringify(items), { headers: { 'content-type': 'application/json' } });
}