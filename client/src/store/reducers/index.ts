import {combineReducers, Reducer, AnyAction} from 'redux';
import {appState}  from './appState'
import { AppStateInterface } from '../../interfaces/appStateInterface';


// export interface ApplicationState {
//     appState: AppStateInterface;
//   }

// export default combineReducers<AppStateInterface, AnyAction>({appState});

export const rootReducer = combineReducers({
    appState,
  })
  
  export type RootState = ReturnType<typeof rootReducer>