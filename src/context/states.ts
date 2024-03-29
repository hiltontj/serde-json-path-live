import { Tagged } from ".";

export type State = Loading | Ready;

export const initialize = (): Loading => ({
  tag: "Loading",
});

export type Loading = Tagged<"Loading">;

export function isLoading(x: State): x is Loading {
  return x.tag === "Loading";
}

export type Ready = Tagged<"Ready"> &
  WithJsonData &
  WithQuery &
  WithQueryOutput &
  WithIsLocated &
  WithShowInfoBanner &
  WithError &
  WithShowError;

export function isReady(x: State): x is Ready {
  return x.tag === "Ready";
}

export interface WithJsonData {
  json: string;
}

export interface WithQuery {
  query: string;
}

export interface WithQueryOutput {
  queryOutput: any[];
}

export interface WithIsLocated {
  isLocated: boolean;
}

export interface WithShowInfoBanner {
  showInfoBanner: boolean;
}

export interface WithShowError {
  showError: boolean;
}

export interface WithError {
  error: string;
}
