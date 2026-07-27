type PlaceholderPageProps = {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main
      aria-label={`${title} page`}
      className="min-h-screen bg-bg-app p-6"
    >
      <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
      <p className="mt-2 text-text-muted">Coming soon.</p>
    </main>
  )
}
