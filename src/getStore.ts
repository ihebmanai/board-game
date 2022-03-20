import { Action, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// action type(s)
export const APP_START = 'APP_START';
export type APP_START_TYPE = typeof APP_START;
export interface IAppStartAction extends Action<APP_START_TYPE> {
  type: APP_START_TYPE;
}

export type TAppActions = IAppStartAction;

// action builder(s)
export const appStartAction: () => IAppStartAction = () => ({
  type: APP_START,
});

// state definition
export interface IAppState {
  started: boolean;
}

export const initialState: IAppState = {
  started: false,
};

// app reducer
export function appReducer(state: IAppState = initialState, action: TAppActions | Action) {
  switch (action.type) {
    case APP_START:
      return {
        ...state,
        started: true,
      };
    default:
      return state;
  }
}

// started state selector
export const isAppStarted = (state: IAppState) => state.started;

export type AppStore = Store<IAppState, TAppActions | Action>;

export default function getStore(): AppStore {
  const store = createStore(appReducer, composeWithDevTools(applyMiddleware()));
  return store;
}
