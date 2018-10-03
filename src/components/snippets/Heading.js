import React from 'react'

export default function Heading({
                                    loading,
                                    snippets,
                                    onNewSnippet,
                                    onReloadSnippets
                                }) {
    return (
        <div>
            <div className="snippets-heading">
                <h2 className="snippets-heading__title">Snippets</h2>
                <button
                    className="btn snippets-heading__btn"
                    onClick={onNewSnippet}
                    disabled={loading}
                >
                    New Snippet
                </button>
                <button
                    className="btn snippets-heading__btn"
                    onClick={onReloadSnippets}
                    disabled={loading || snippets.length === 0}
                >
                    <i className="fa fa-refresh" />
                </button>
            </div>
        </div>
    )
}
