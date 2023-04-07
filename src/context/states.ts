import { Tagged } from ".";

export type State =
  | Loading
  | Ready;

export const initialize = (): Loading => ({
  tag: 'Loading'
});

export type Loading = Tagged<'Loading'>;

export function isLoading(x: State): x is Loading {
  return x.tag === 'Loading';
}

export type Ready = Tagged<'Ready'>
  & WithJsonPathParser
  & WithJsonData
  & WithQuery
  & WithQueryOutput
  & WithShowInfoBanner
  & WithError
  & WithShowError
;

export function isReady(x: State): x is Ready {
  return x.tag === 'Ready';
}

export interface WithJsonPathParser {
  parser: (json: any, query: string) => any;
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

export interface WithShowInfoBanner {
  showInfoBanner: boolean;
}

export interface WithShowError {
  showError: boolean;
}

export interface WithError {
  error: string;
}
