export default function GalleryPage() {
  const galleryItems = [
    { id: 1, title: 'Project Screenshot 1', type: 'image' },
    { id: 2, title: 'Design Concept', type: 'image' },
    { id: 3, title: 'Architecture Diagram', type: 'diagram' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Image placeholder</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}