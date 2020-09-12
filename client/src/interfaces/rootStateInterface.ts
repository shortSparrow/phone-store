import {AppStateInterface} from './appStateInterface';
import { phoneState } from './phonesInterfaces';

export interface RootStateInterface {
    appState: AppStateInterface,
    phonesState: phoneState
}