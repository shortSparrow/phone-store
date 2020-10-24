import {AppStateInterface} from './appStateInterface';
import { phoneState, hotPriceState } from './phonesInterfaces';
import {favoriteDeviceState} from './favoriteDevice';

export interface RootStateInterface {
    appState: AppStateInterface,
    phonesState: phoneState,
    hotPricePhones: hotPriceState,
    favoritesDevice: favoriteDeviceState
}