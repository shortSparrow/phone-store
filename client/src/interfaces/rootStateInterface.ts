import {AppStateInterface} from './appStateInterface';
import { phoneState } from './phonesInterfaces';
import {favoriteDeviceState} from './favoriteDevice';
import { cartDeviceListState } from './cartDeviceList';
import { tabletState } from './tabletStateInterface';
import {accessoriesState} from './accessoriesStateInterface'

export interface RootStateInterface {
    appState: AppStateInterface,
    phone: phoneState,
    favoritesDevice: favoriteDeviceState,
    cartDeviceList: cartDeviceListState,
    tablet: tabletState,
    accessories: accessoriesState,
}