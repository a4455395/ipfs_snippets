import React from 'react'
import { connect } from 'react-redux'
import { selectCurrentSnippet } from '../../selectors/snippets'


function SnippetPage({ snippet }) {
  return (
    <div>
      {snippet && (
        <div>
          <h2>{snippet.title}</h2>
          <div>{snippet.body}</div>
        </div>
      )}
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    snippet: selectCurrentSnippet(state, ownProps.match.params.id)
  }
}

const connector = connect(
  mapStateToProps
)

export default connector(SnippetPage)
