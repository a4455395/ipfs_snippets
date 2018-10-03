import {takeLatest, put, call} from 'redux-saga/effects'
import {destroy} from '../../services/snippets'
import navigateTo from '../../services/navigation'

function* deleteSnippet(action) {
    yield put({type: 'DELETE_PENDING', id: action.id});

    try {
        yield call(destroy, action.id);
        yield put({type: 'DELETE_SUCCESS', id: action.id});
    } catch (error) {
        yield put({type: 'DELETE_FAILURE'});
        console.error(error);
        yield put(navigateTo('/error'))
    }
}

export default function* watchDeleteSnippet() {
    yield takeLatest('DELETE', deleteSnippet)
}
