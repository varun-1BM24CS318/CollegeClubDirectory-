export function SiteFooter() {
  return (
    <footer className="mt-12 border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-medium">College Club Directory</p>
            <p className="text-sm text-muted-foreground">Connecting students with communities.</p>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Example University. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
