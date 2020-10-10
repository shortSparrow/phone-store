import {AppStateInterface} from './appStateInterface';
import { phoneState, hotPriceState } from './phonesInterfaces';

export interface RootStateInterface {
    appState: AppStateInterface,
    phonesState: phoneState,
    hotPricePhones: hotPriceState
}