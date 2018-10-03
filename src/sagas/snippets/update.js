import {takeLatest, put, call} from 'redux-saga/effects'
import {update} from '../../services/snippets'
import navigateTo from '../../services/navigation'

function* updateSnippet(action) {
    yield put({type: 'UPDATE_PENDING'});

    try {
        const updatedSnippet = yield call(update, action.payload);
        yield put({type: 'UPDATE_SUCCESS', payload: updatedSnippet});
        yield put({type: 'FETCH'});
        navigateTo('/home/snippets');
    } catch (error) {
        yield put({type: 'UPDATE_FAILURE'});
        console.error(error);
        yield put(navigateTo('/error'));
    }
}

export default function* watchUpdateSnippet() {
    yield takeLatest('UPDATE', updateSnippet)
}
