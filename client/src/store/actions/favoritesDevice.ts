import {SET_FAVORITE_DEVICES} from '../../constants/actions';
import {AppStateActionTypes, DeviceScreenType} from '../../interfaces/appStateInterface';
import {favoriteDevice} from '../../interfaces/favoriteDevice';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { RootStateInterface } from '../../interfaces/rootStateInterface';
import store from '..';

export const setFavoriteDevices = (deviceList: any):AppStateActionTypes => ({
    type: SET_FAVORITE_DEVICES,
    deviceList
})


export const toggleFavoriteDevice = (device: any):ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
    return async dispatch => {
        const {deviceList} = store.getState().favoritesDevice;
        
        const duplicate = deviceList.find((deviceItem: favoriteDevice) => deviceItem._id === device._id);
        let newFavoriteList = null;

        if (!duplicate) {
            newFavoriteList = [...deviceList, device]
        } else {
            const listWithoutDuplicate = deviceList.filter((deviceItem: favoriteDevice) => deviceItem._id !== device._id);
            newFavoriteList = listWithoutDuplicate
        }

        dispatch(setFavoriteDevices(newFavoriteList))

        localStorage.setItem('@favotiteDeviceList', JSON.stringify(newFavoriteList))

    }
}

// export const setToLocalStorageFavorites = ():ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
//     return async dispatch => {
        
//     }
// }