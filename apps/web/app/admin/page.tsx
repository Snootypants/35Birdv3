export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Blog Posts</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-muted-foreground">Total posts</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-muted-foreground">Total projects</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Gallery Items</h2>
          <p className="text-3xl font-bold">3</p>
          <p className="text-muted-foreground">Total items</p>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
            Create New Blog Post
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 ml-4">
            Add Project
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 ml-4">
            Upload to Gallery
          </button>
        </div>
      </div>
    </div>
  )
}