import { SET_FAVORITE_DEVICES } from '../../constants/actions'
import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import {favoriteDeviceState} from '../../interfaces/favoriteDevice'

const initialState: favoriteDeviceState = {
    deviceList: []
};


export const favoritesDevice = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case SET_FAVORITE_DEVICES:
            return { ...state, deviceList: action.deviceList }

        default:
            return state
    }
}
