import { Dispatcher } from ".";
import { getJsonExample, getQueryExample } from "../helpers";
const wasm = import("serde-json-path");

export const load = async (dispatch: Dispatcher) => {
  const sjp = await wasm;
  const json = JSON.stringify(getJsonExample(), null, 2);
  const query = getQueryExample();

  dispatch({
    tag: "Loaded",
    parser: sjp.parse_json,
    json,
    query,
  });
};
