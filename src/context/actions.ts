import { Tagged } from ".";
import { WithJsonData, WithJsonPathParser, WithQuery, WithQueryOutput } from "./states";

export type Action =
  | Loaded
  | UpdateQuery
  | UpdateJson
  | UpdateQueryOutput
;

type Loaded = Tagged<'Loaded'>
  & WithJsonPathParser
  & WithJsonData
  & WithQuery
;

export function isLoaded(x: Action): x is Loaded {
  return x.tag === 'Loaded';
}


type UpdateQuery = Tagged<'UpdateQuery'>
  & WithQuery
;

export function isUpdateQuery(x: Action): x is UpdateQuery {
  return x.tag === 'UpdateQuery';
}


type UpdateJson = Tagged<'UpdateJson'>
  & WithJsonData
;

export function isUpdateJson(x: Action): x is UpdateJson {
  return x.tag === 'UpdateJson';
}


type UpdateQueryOutput = Tagged<'UpdateQueryOutput'>
  & WithQueryOutput
;

export function isUpdateQueryOutput(x: Action): x is UpdateQueryOutput {
  return x.tag === 'UpdateQueryOutput';
}
