import {takeLatest, put, call} from 'redux-saga/effects'
import {create} from '../../services/snippets'
import navigateTo from '../../services/navigation'

function* createSnippet(action) {
    yield put({type: 'CREATE_PENDING'});

    try {
        const newSnippet = yield call(create, action.payload);
        yield put({type: 'CREATE_SUCCESS', payload: newSnippet});
        navigateTo('/home/snippets')
    } catch (error) {
        yield put({type: 'CREATE_FAILURE'});
        console.error(error);
        yield put(navigateTo('/error'));
    }
}

export default function* watchCreateSnippet() {
    yield takeLatest('CREATE', createSnippet)
}
