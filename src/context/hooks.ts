import * as States from "./states";
import { useSerdeJsonPathDispatch, useSerdeJsonPathState } from ".";

export type QueryUpdater = (query: string) => void;

export const useQuery = (): string => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return state.query;
  } else {
    throw new Error("attempted to useQuery before ready");
  }
};

export const useUpdateQuery = (): QueryUpdater => {
  const dispatch = useSerdeJsonPathDispatch();
  return (query: string) => dispatch({ tag: "UpdateQuery", query });
};

export const useJsonData = (): string => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return state.json;
  } else {
    throw new Error("attempted to useJsonData before ready");
  }
};

export type JsonDataUpdater = (json: string) => void;

export const useJsonDataUpdater = (): JsonDataUpdater => {
  const dispatch = useSerdeJsonPathDispatch();
  return (json: string) => dispatch({ tag: "UpdateJson", json });
};

export const useOutput = (): any[] => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return state.queryOutput;
  } else {
    throw new Error("attempted to useOutput before ready");
  }
};

export type OutputUpdaterFn = (output: any[]) => void;

export const useOutputUpdater = (): OutputUpdaterFn => {
  const dispatch = useSerdeJsonPathDispatch();
  return (output: any[]) =>
    dispatch({ tag: "UpdateQueryOutput", queryOutput: output });
};

export type ToggleInfoBannerFn = (show: boolean) => void;

export const useToggleInfoBanner = (): ToggleInfoBannerFn => {
  const dispatch = useSerdeJsonPathDispatch();
  return (show: boolean) =>
    dispatch({ tag: "ToggleInfoBanner", showInfoBanner: show });
};

export const useShowInfoBanner = (): boolean => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return state.showInfoBanner;
  } else {
    throw new Error("attempted to useShowInfoBanner before ready");
  }
};

export const useError = (): string => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return state.error;
  } else {
    throw new Error("attempted to useError before ready");
  }
};

export type SetErrorFn = (message: string) => void;

export const useSetError = (): SetErrorFn => {
  const dispatch = useSerdeJsonPathDispatch();
  return (error: string) => dispatch({ tag: "SetError", error });
};

export const useShowError = (): boolean => {
  const state = useSerdeJsonPathState();
  if (States.isReady(state)) {
    return state.showError;
  } else {
    throw new Error("attempted to useShowError before ready");
  }
};
export type ToggleErrorFn = (show: boolean) => void;

export const useToggleError = (): ToggleErrorFn => {
  const dispatch = useSerdeJsonPathDispatch();
  return (showError: boolean) => dispatch({ tag: "ToggleError", showError });
};
