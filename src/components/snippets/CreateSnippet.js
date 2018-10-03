import React, {Component} from 'react'
import {connect} from 'react-redux'
import navigateTo from '../../services/navigation'
import {CREATE} from '../../actions'
import SnippetForm from './SnippetForm'

class CreateSnippet extends Component {

    handleSubmit = (payload) => {
        this.props.createSnippet(payload)
        navigateTo('/home/snippets')
    }

    render() {
        return (
            <div>
                <h3>Create text snippet</h3>
                <SnippetForm onSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => ({
        createSnippet: (payload) => dispatch({type: CREATE, payload})
    })
)(CreateSnippet);
