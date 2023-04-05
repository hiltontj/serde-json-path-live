import * as Actions from "./actions";
import * as States from "./states";

type Reducer<S> = (state: S, action: Actions.Action) => States.State;

const reducer: Reducer<States.State> = (state, action) => {
  console.debug('REDUCING', action, state);
  if (States.isLoading(state)) {
    return reduceLoading(state, action);
  } else if (States.isReady(state)) {
    return reduceReady(state, action);
  }
  return state;
}

const reduceLoading: Reducer<States.Loading> = (state, action) => {
  if (Actions.isLoaded(action)) {
    const { json, query, parser } = action;
    return {
      tag: 'Ready',
      json,
      query,
      parser,
      output: [],
    };
  }
  return state;
}

const reduceReady: Reducer<States.Ready> = (state, action) => {
  if (Actions.isUpdateJson(action)) {
    const { json } = action;
    return { ...state, json };
  } else if (Actions.isUpdateQuery(action)) {
    const { query } = action;
    return {...state, query };
  } else if (Actions.isUpdateQueryOutput(action)) {
    const { output } = action;
    return { ...state, output }
  }
  return state;
}

export default reducer;