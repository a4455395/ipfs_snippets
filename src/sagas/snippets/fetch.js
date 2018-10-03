import {takeLatest, put, call, select} from 'redux-saga/effects'
import {fetch} from '../../services/snippets'
import navigateTo from '../../services/navigation'
import {selectSnippets} from '../../selectors/snippets'

function* fetchSnippets() {
    yield put({type: 'FETCH_PENDING'});

    try {
        const snippetsFromApi = yield call(fetch);
        yield put({type: 'FETCH_SUCCESS', payload: snippetsFromApi});
    } catch (error) {
        yield put({type: 'FETCH_FAILURE'});
        console.error(error);
        yield put(navigateTo('/error'))
    }
}

export function* watchFetchSnippets() {
    yield takeLatest('FETCH', fetchSnippets)
}

function* fetchSnippetsIfNeeded() {
    const {items: snippets} = yield select(selectSnippets);
    if (!snippets.length) {
        yield call(fetchSnippets)
    }
}

export function* watchFetchSnippetsIfNeeded() {
    yield takeLatest('FETCH_IF_NEEDED', fetchSnippetsIfNeeded)
}
