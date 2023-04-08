import { Tagged } from ".";
import {
  WithError,
  WithJsonData,
  WithQuery,
  WithQueryOutput,
  WithShowError,
  WithShowInfoBanner,
} from "./states";

export type Action =
  | Loaded
  | UpdateQuery
  | UpdateJson
  | UpdateQueryOutput
  | ToggleInfoBanner
  | SetError
  | ToggleError;

type Loaded = Tagged<"Loaded"> & WithJsonData & WithQuery;

export function isLoaded(x: Action): x is Loaded {
  return x.tag === "Loaded";
}

type UpdateQuery = Tagged<"UpdateQuery"> & WithQuery;

export function isUpdateQuery(x: Action): x is UpdateQuery {
  return x.tag === "UpdateQuery";
}

type UpdateJson = Tagged<"UpdateJson"> & WithJsonData;

export function isUpdateJson(x: Action): x is UpdateJson {
  return x.tag === "UpdateJson";
}

type UpdateQueryOutput = Tagged<"UpdateQueryOutput"> & WithQueryOutput;

export function isUpdateQueryOutput(x: Action): x is UpdateQueryOutput {
  return x.tag === "UpdateQueryOutput";
}

type ToggleInfoBanner = Tagged<"ToggleInfoBanner"> & WithShowInfoBanner;

export function isToggleInfoBanner(x: Action): x is ToggleInfoBanner {
  return x.tag === "ToggleInfoBanner";
}

type SetError = Tagged<"SetError"> & WithError;

export function isSetError(x: Action): x is SetError {
  return x.tag === "SetError";
}

type ToggleError = Tagged<"ToggleError"> & WithShowError;

export function isToggleError(x: Action): x is ToggleError {
  return x.tag === "ToggleError";
}
