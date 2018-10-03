import React from 'react'
import { Link } from 'react-router-dom'


export default function SnippetsList(props) {
  const { loading, snippets, url, onEditSnippet, onDeleteSnippet } = props

  if (loading) return <p>Loading...</p>
  if (snippets.length === 0) return <div>No snippets.</div>

  return (
    <ul className="snippets">
      {snippets.map(snippet => (
        <li className="snippets__item" key={snippet.id}>
          <Link className="snippets__title" to={`${url}/${snippet.id}`}>
            {snippet.title}
          </Link>
          <button
            className="btn snippets__btn"
            onClick={() => onEditSnippet(snippet.id)}
            title="Edit"
          >
            <i className="fa fa-pencil-square-o" />
          </button>
          <button
            className="btn snippets__btn"
            onClick={() => onDeleteSnippet(snippet.id)}
            title="Delete"
          >
            <i className="fa fa-trash-o" />
          </button>
        </li>
      ))}
    </ul>
  )
}
