import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FETCH_IF_NEEDED,
  FETCH,
  DELETE
} from '../../actions'
import { selectSnippets } from '../../selectors/snippets'
import navigateTo from '../../services/navigation'
import SnippetsHeading from './Heading'
import SnippetsList from './SnippetList'

class SnippetsPage extends Component {
  componentDidMount() {
    this.props.fetchSnippetsIfNeeded()
  }

  handleDeleteSnippet = (id) => {
    if (window.confirm('Do you want to delete this text snippet?')) {
      this.props.deleteSnippet(id)
    }
  }

  handleNewSnippet = () => {
    const { url } = this.props.match
    navigateTo(`${url}/new`)
  }

  handleEditSnippet = (id) => {
    const { url } = this.props.match
    navigateTo(`${url}/${id}/edit`)
  }

  handleReloadSnippets = () => {
    this.props.fetchSnippets()
  }

  render() {
    const { items: snippets, loading } = this.props.snippets;
    const { url } = this.props.match;

    return (
      <div>
        <SnippetsHeading
          loading={loading}
          snippets={snippets}
          onNewSnippet={this.handleNewSnippet}
          onReloadSnippets={this.handleReloadSnippets}
        />

        <SnippetsList
          loading={loading}
          snippets={snippets}
          url={url}
          onEditSnippet={this.handleEditSnippet}
          onDeleteSnippet={this.handleDeleteSnippet}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    snippets: selectSnippets(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSnippetsIfNeeded: () => dispatch({ type: FETCH_IF_NEEDED }),
    deleteSnippet: (id) => dispatch({ type: DELETE, id }),
    fetchSnippets: () => dispatch({ type: FETCH })
  }
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(SnippetsPage)
