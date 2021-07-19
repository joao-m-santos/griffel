import { takeEvery, all } from "redux-saga/effects";

import { selectWorkspace, fetchTrainings } from "./workers";

function* watchSelectWorkspace() {
  yield takeEvery("SELECT_WORKSPACE", selectWorkspace);
}

function* watchFetchTrainings() {
  yield takeEvery("TRAININGS_FETCH_REQUESTED", fetchTrainings);
}

export default function* rootSaga() {
  yield all([watchSelectWorkspace(), watchFetchTrainings()]);
}
