import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

async function getProjects() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')
  
  try {
    const filenames = fs.readdirSync(projectsDirectory)
    const projects = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const filePath = path.join(projectsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug: filename.replace('.mdx', ''),
          title: data.title || filename,
          description: data.description || '',
          tech: data.tech || [],
          featured: data.featured || false,
        }
      })
    
    return projects
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="border rounded-lg p-6 hover:bg-secondary transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              {project.description && (
                <p className="text-muted-foreground mb-4">{project.description}</p>
              )}
              {project.tech.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-primary/10 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}