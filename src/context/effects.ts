import { Dispatcher } from ".";
import { getJsonExample, getQueryExample } from "../helpers";
const wasm = import('serde-json-path');

export const load = async (dispatch: Dispatcher) => {
  const sjp = await wasm;
  console.debug(sjp);
  const json = JSON.stringify(getJsonExample(), null, 2);
  const query = getQueryExample();

  dispatch({
    tag: 'Loaded',
    parser: (json: any, query: string) => sjp.parse_json(json, query),
    json,
    query,
  });
}