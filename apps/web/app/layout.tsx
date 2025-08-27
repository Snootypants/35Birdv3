import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ui/theme-provider';

export const metadata: Metadata = {
  title: '35Bird — projects, games, blog',
  description: 'Builds, games, and experiments by Caleb Belshe'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <a href="/" className="text-xl font-bold">35BIRD</a>
                <div className="flex gap-6">
                  <a href="/projects" className="hover:text-muted-foreground">Projects</a>
                  <a href="/games" className="hover:text-muted-foreground">Games</a>
                  <a href="/blog" className="hover:text-muted-foreground">Blog</a>
                  <a href="/gallery" className="hover:text-muted-foreground">Gallery</a>
                </div>
              </nav>
            </header>
            {children}
            <footer className="border-t mt-20">
              <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-muted-foreground">
                © {new Date().getFullYear()} 35Bird
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}