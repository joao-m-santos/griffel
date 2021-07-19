import assert from "assert";
import { select, put, call } from "redux-saga/effects";

import {
  getWorkspaceFromList,
  selectWorkspace,
  fetchTrainings
} from "../store/workers";
import service from "../api/service";

const mockWorkspace = { id: "2", name: "My Workspace #2" };

test("selectWorkspace SUCCESS", () => {
  const gen = selectWorkspace({ payload: "2" });

  assert.deepStrictEqual(
    gen.next().value,
    select(getWorkspaceFromList, "2"),
    "Should get workspace list from store"
  );

  assert.deepStrictEqual(
    gen.next(mockWorkspace).value,
    put({ type: "WORKSPACE_SELECTED", payload: mockWorkspace }),
    "Should dispatch WORKSPACE_SELECTED"
  );
});

test("selectWorkspace FAIL", () => {
  const gen = selectWorkspace({ payload: "2" });

  assert.deepStrictEqual(
    gen.next().value,
    select(getWorkspaceFromList, "2"),
    "Should get workspace list from store"
  );

  assert.deepStrictEqual(
    gen.throw().value,
    put({ type: "WORKSPACE_DESELECTED" }),
    "Should dispatch WORKSPACE_DESELECTED"
  );
});

test("fetchTrainings SUCCESS", () => {
  const workspaceId = "2";
  const gen = fetchTrainings({ payload: workspaceId });

  assert.deepStrictEqual(
    gen.next().value,
    put({ type: "SET_LOADING", payload: true }),
    "Should dispatch a SET_LOADING action with payload as true"
  );

  assert.deepStrictEqual(
    gen.next().value,
    call(service.getTrainingsByWorkspace, workspaceId),
    "Should call the API"
  );

  const response = [];

  assert.deepStrictEqual(
    gen.next(response).value,
    put({ type: "TRAININGS_FETCH_SUCCEEDED", payload: response }),
    "Should dispatch a TRAININGS_FETCH_SUCCEEDED"
  );

  assert.deepStrictEqual(
    gen.next().value,
    put({ type: "SET_LOADING", payload: false }),
    "Should dispatch a SET_LOADING action with payload as false"
  );
});

test("fetchTrainings FAIL", () => {
  const workspaceId = "2";
  const gen = fetchTrainings({ payload: workspaceId });

  assert.deepStrictEqual(
    gen.next().value,
    put({ type: "SET_LOADING", payload: true }),
    "Should dispatch a SET_LOADING action with payload as true"
  );

  assert.deepStrictEqual(
    gen.next().value,
    call(service.getTrainingsByWorkspace, workspaceId),
    "Should call the API"
  );

  const error = { message: "error" };

  assert.deepStrictEqual(
    gen.throw(error).value,
    put({ type: "TRAININGS_FETCH_FAILED", message: "error" }),
    "Should dispatch a TRAININGS_FETCH_FAILED"
  );

  assert.deepStrictEqual(
    gen.next().value,
    put({ type: "SET_LOADING", payload: false }),
    "Should dispatch a SET_LOADING action with payload as false"
  );
});
