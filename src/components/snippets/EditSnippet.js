import React, { Component } from 'react'
import { connect } from 'react-redux'
import navigateTo from '../../services/navigation'
import { UPDATE } from '../../actions'
import { selectCurrentSnippet } from '../../selectors/snippets'
import SnippetForm from './SnippetForm'

class EditSnippetPage extends Component{
  handleSubmit = (payload) => {
    const { id } = this.props.snippet
    payload = { ...payload, id };
    this.props.updateSnippet(payload);
    navigateTo('/home/snippets')
  };

  render() {
    const { snippet } = this.props;

    return (
      <div>
        <h2>Edit snippet</h2>
        {snippet && <SnippetForm snippet={snippet} onSubmit={this.handleSubmit} />}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const snippet = selectCurrentSnippet(state, ownProps.match.params.id)
  return {
    snippet
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSnippet: (payload) => dispatch({ type: UPDATE, payload })
  }
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(EditSnippetPage)
