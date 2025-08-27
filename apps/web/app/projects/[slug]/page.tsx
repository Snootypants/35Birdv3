import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

async function getProject(slug: string) {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await remark()
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()
    
    return {
      slug,
      contentHtml,
      title: data.title || 'Untitled',
      description: data.description || '',
      tech: data.tech || [],
      ...data,
    }
  } catch (error) {
    return null
  }
}

export default async function ProjectPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = await getProject(params.slug)
  
  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    )
  }
  
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      {project.description && (
        <p className="text-xl text-muted-foreground mb-4">{project.description}</p>
      )}
      {project.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech: string) => (
            <span
              key={tech}
              className="text-sm px-3 py-1 bg-primary/10 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: project.contentHtml }}
      />
    </article>
  )
}