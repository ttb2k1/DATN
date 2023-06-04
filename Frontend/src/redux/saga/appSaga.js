import { call, put } from "redux-saga/effects";

function* updateOpen(openCanvas){
    yield put({type: 'OPEN_CANVAS', payload: action.payload})
}

export default function* (action) {
  console.log('App Saga - Action: ', action);
  yield call(updateOpen, action.payload.openCanvas);
}
