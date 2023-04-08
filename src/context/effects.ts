import { Dispatcher } from ".";
import { getJsonExample, getQueryExample } from "../helpers";

export const load = async (dispatch: Dispatcher) => {
  const json = JSON.stringify(getJsonExample(), null, 2);
  const query = getQueryExample();

  dispatch({
    tag: "Loaded",
    json,
    query,
  });
};
