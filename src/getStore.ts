import { Action, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// action type(s)
export const APP_START = 'APP_START';
export const ADD_HISTORY = 'ADD_HISTORY';
export const RESET_GAME = 'RESET_GAME';
export const UPDATE_SCORE = 'UPDATE_SCORE';


export type APP_START_TYPE = typeof APP_START;
export type ADD_HISTORY_TYPE = typeof ADD_HISTORY;
export type RESET_GAME_TYPE = typeof RESET_GAME;
export type UPDATE_SCORE_TYPE = typeof UPDATE_SCORE;

export interface IAppStartAction extends Action<APP_START_TYPE> {
  type: APP_START_TYPE;
}

export interface IAddHistoryAction extends Action<ADD_HISTORY_TYPE> {
  type: ADD_HISTORY_TYPE;
  payload: History,
}

export interface IUpdateScoreAction extends Action<UPDATE_SCORE_TYPE> {
  type: UPDATE_SCORE_TYPE;
  payload: boolean | null;
}

export interface IResetGameAction extends Action<RESET_GAME_TYPE> {
  type: RESET_GAME_TYPE;
}

export type TAppActions = IAppStartAction | IAddHistoryAction | IResetGameAction | IUpdateScoreAction;


// action builder(s)
export const appStartAction: () => IAppStartAction = () => ({
  type: APP_START,
});
export const addHistoryAction: (data) => IAddHistoryAction = (data) => ({
  type: ADD_HISTORY,
  payload: data,
});
export const resetGameAction: () => IResetGameAction = () => ({
  type: RESET_GAME,
});
export const updateScoreAction: (data) => IUpdateScoreAction = (data) => ({
  type: UPDATE_SCORE,
  payload: data,
});

// state definition
export interface IAppState {
  started: boolean;
  scoreBot: number;
  scorePlayer: number;
  round: number;
  history: History[];
}

export const initialState: IAppState = {
  started: false,
  scoreBot: 0,
  scorePlayer: 0,
  round: 0,
  history: [],
};

// app reducer
export function appReducer(state: IAppState = initialState, action: TAppActions | Action) {
  switch (action.type) {
    case APP_START:
      return {
        ...state,
        started: true,
      };
    case RESET_GAME:
      return {
        ...state,
        ...initialState,
      };
    case ADD_HISTORY:
      return {
        ...state,
        history: [
          ...state.history,
          //@ts-ignore
          action.payload,
        ],
      };
    case UPDATE_SCORE:
      return {
        ...state,
        round: state.round + 1,
        //@ts-ignore
        scorePlayer: action.payload ? state.scorePlayer + 1 : state.scorePlayer - 1,
        //@ts-ignore
        scoreBot: action.payload === null ? state.scoreBot - 1 : action.payload ? state.scoreBot - 1 : state.scoreBot + 1,
      };
    default:
      return state;
  }
}

// started state selector
export const isAppStarted = (state: IAppState) => state.started;
export const scoreBotSelector = (state: IAppState) => state.scoreBot;
export const scorePlayerSelector = (state: IAppState) => state.scorePlayer;
export const historySelector = (state: IAppState) => state.history;
export const roundSelector = (state: IAppState) => state.round;

export type AppStore = Store<IAppState, TAppActions | Action>;

export default function getStore(): AppStore {
  const store = createStore(appReducer, composeWithDevTools(applyMiddleware()));
  return store;
}
