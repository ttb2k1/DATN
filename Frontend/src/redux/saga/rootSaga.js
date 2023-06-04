import { all, takeEvery } from 'redux-saga/effects';
import appSaga from './appSaga';

export default sagas = function* (){
    yield all([takeEvery('OPEN_CANVAS', appSaga)])
}

