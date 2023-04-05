import React from 'react';
import * as States from './states';
import { Action } from './actions';
import reducer from './reducer';
import { load } from './effects';

export type Tagged<T extends string> = { tag: T };
export type Dispatcher = React.Dispatch<Action>;

const StateContext = React.createContext<States.State | null>(null);
const DispatchContext = React.createContext<Dispatcher | null>(null);

interface SerdeJsonPathProviderProps {
  children: React.ReactNode;
}

export const SerdeJsonPathProvider = ({ children }: SerdeJsonPathProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, States.initialize());

  React.useEffect(() => {
    if (States.isLoading(state)) {
      load(dispatch);
    } else if (States.isReady(state)) {
       // TODO: any effects on ready?
    }
  }, [state])

  if (States.isLoading(state)) {
    return <>Loading...</>;
  }
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export const useSerdeJsonPathState = (): States.State => {
  const state = React.useContext(StateContext);
  if (state === null || state === undefined) {
    throw new Error('useSerdeJsonPathState must be used within a SerdeJsonPathProvider');
  }
  return state;
}

export const useSerdeJsonPathDispatch = (): Dispatcher => {
  const dispatch = React.useContext(DispatchContext);
  if (dispatch === null || dispatch === undefined) {
    throw new Error('useSerdeJsonPathDispatch must be used within a SerdeJsonPathProvider');
  }
  return dispatch;
}
