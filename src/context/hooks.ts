import * as States from './states';
import { useSerdeJsonPathDispatch, useSerdeJsonPathState } from ".";

export type QueryUpdater = (query: string) => void;

export const useQuery = (): string => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return state.query;
  } else {
    throw new Error('attempted to useQuery before ready');
  }
}

export const useUpdateQuery = (): QueryUpdater => {
  const dispatch = useSerdeJsonPathDispatch();
  return (query: string) => dispatch({ tag: 'UpdateQuery', query });
}

export const useJsonData = (): string => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return state.json;
  } else {
    throw new Error('attempted to useJsonData before ready');
  }
}

export type JsonDataUpdater = (json: string) => void;

export const useJsonDataUpdater = (): JsonDataUpdater => {
  const dispatch = useSerdeJsonPathDispatch();
  return (json: string) => dispatch({ tag: 'UpdateJson', json });
}

export type ParseFn = (json: any, query: string) => any[];

export const useParser = (): ParseFn => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return (json: any, query: string) => state.parser(json, query);
  } else {
    throw new Error('attempted to useParser before ready');
  }
}

export const useOutput = (): any[] => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return state.output;
  } else {
    throw new Error('attempted to useOutput before ready');
  }
}

export type OutputUpdaterFn = (output: any[]) => void

export const useOutputUpdater = (): OutputUpdaterFn => {
  const dispatch = useSerdeJsonPathDispatch();
  return (output: any[]) => dispatch({ tag: 'UpdateQueryOutput', output });
}