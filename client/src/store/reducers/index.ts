import {combineReducers, Reducer, AnyAction} from 'redux';
import {appState}  from './appState';
import {phonesState}  from './phones';
import { AppStateInterface } from '../../interfaces/appStateInterface';


// export interface ApplicationState {
//     appState: AppStateInterface;
//   }

// export default combineReducers<AppStateInterface, AnyAction>({appState});

export const rootReducer = combineReducers({
    appState,
    phonesState,
  })
  
  export type RootState = ReturnType<typeof rootReducer>