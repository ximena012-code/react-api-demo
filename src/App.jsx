import { useEffect, useState } from 'react'

const API = 'https://jsonplaceholder.typicode.com/posts?_limit=8'

export default function App() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setStatus('loading')
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status)
        return r.json()
      })
      .then((data) => {
        if (!alive) return
        setPosts(data)
        setStatus('success')
      })
      .catch((e) => {
        if (!alive) return
        setError(e.message || 'Error de red')
        setStatus('error')
      })
    return () => { alive = false }
  }, [])

  return (
    <main className="wrap">
      <header>
        <h1>React API Demo</h1>
        <p>Listado de posts desde JSONPlaceholder (loading / error / success).</p>
      </header>

      {status === 'loading' && <p className="state">Cargando posts…</p>}
      {status === 'error' && <p className="state error">No se pudo cargar: {error}</p>}
      {status === 'success' && (
        <ul className="list">
          {posts.map((p) => (
            <li key={p.id}>
              <strong>#{p.id}</strong>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
