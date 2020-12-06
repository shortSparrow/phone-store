import { combineReducers, Reducer, AnyAction } from 'redux';
import { appState } from './appState';
import { phone } from './phones';
import { favoritesDevice } from './favoritesDevice';
import { cartDeviceList } from './cartDeviceList';
import { tablet } from './tablets'
import {accessories} from './accessories'

import { AppStateInterface } from '../../interfaces/appStateInterface';


// export interface ApplicationState {
//     appState: AppStateInterface;
//   }

// export default combineReducers<AppStateInterface, AnyAction>({appState});

export const rootReducer = combineReducers({
  appState,
  phone,
  favoritesDevice,
  cartDeviceList,
  tablet,
  accessories
})

export type RootState = ReturnType<typeof rootReducer>