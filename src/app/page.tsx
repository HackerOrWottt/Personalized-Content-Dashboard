export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-red-gradient bg-clip-text text-transparent">
          🎯 Personalized Content Dashboard
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-dark-surface p-6 rounded-lg border border-dark-border">
            <h2 className="text-xl font-semibold mb-4 text-accent-red">📰 News Feed</h2>
            <p className="text-dark-muted">Latest news articles based on your preferences.</p>
          </div>
          
          <div className="bg-dark-surface p-6 rounded-lg border border-dark-border">
            <h2 className="text-xl font-semibold mb-4 text-accent-red">🎬 Movies</h2>
            <p className="text-dark-muted">Trending movies and recommendations.</p>
          </div>
          
          <div className="bg-dark-surface p-6 rounded-lg border border-dark-border">
            <h2 className="text-xl font-semibold mb-4 text-accent-red">💬 Social</h2>
            <p className="text-dark-muted">Latest social media posts and updates.</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-dark-muted">
            Dashboard is loading... Complex features coming soon!
          </p>
        </div>
      </div>
    </div>
  )
}
