import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className="page section-block">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Back Home</Link>
    </div>
  )
}
