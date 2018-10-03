import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="container">
      <div className="error-page">
        <h1>Something went wrong</h1>
        <div>
          Start at <Link to="/">to home</Link>
        </div>
      </div>
    </div>
  )
}
