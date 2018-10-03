import { all } from 'redux-saga/effects'
import { watchFetchSnippetsIfNeeded, watchFetchSnippets } from './snippets/fetch'
import watchDeleteSnippet from './snippets/delete'
import watchCreateSnippet from './snippets/create'
import watchUpdateSnippet from './snippets/update'

export default function* rootSaga() {
  yield all([
    watchFetchSnippetsIfNeeded(),
    watchFetchSnippets(),
    watchDeleteSnippet(),
    watchCreateSnippet(),
    watchUpdateSnippet()
  ])
}
