import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

async function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  
  try {
    const filenames = fs.readdirSync(postsDirectory)
    const posts = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug: filename.replace('.mdx', ''),
          title: data.title || filename,
          date: data.date || null,
          excerpt: data.excerpt || '',
        }
      })
      .sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        return 0
      })
    
    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No blog posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-8">
              <a href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary">
                  {post.title}
                </h2>
                {post.date && (
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                )}
                {post.excerpt && (
                  <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                )}
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}