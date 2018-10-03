import React from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import SnippetsPage from './snippets/SnippetsPage'
import CreateSnippetPagePage from './snippets/CreateSnippet'
import EditSnippetPage from './snippets/EditSnippet'
import SnippetPage from './snippets/SnippetPage'

export default function AdminPage({ match: { url } }) {
  return (
    <div>
      <div className="header">
        <div className="container">
          <Link to="/home" className="header__brand">
            IPFS text snippet editor
          </Link>
        </div>
      </div>

      <div className="container">
        <Switch>
          <Route
            exact
            path={`${url}`}
            render={() => <Redirect to={`${url}/snippets`} />}
          />
          <Route exact path={`${url}/snippets`} component={SnippetsPage} />
          <Route exact path={`${url}/snippets/new`} component={CreateSnippetPagePage} />
          <Route exact path={`${url}/snippets/:id`} component={SnippetPage} />
          <Route
            exact
            path={`${url}/snippets/:id/edit`}
            component={EditSnippetPage}
          />
          <Redirect to="/error" />
        </Switch>
      </div>
    </div>
  )
}
