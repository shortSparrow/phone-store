import { SET_CART_DEVICE_LIST } from '../../constants/actions'
import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import {cartDeviceListState} from '../../interfaces/cartDeviceList'

const initialState: cartDeviceListState = {
    deviceList: []
};


export const cartDeviceList = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case SET_CART_DEVICE_LIST:
            return { ...state, deviceList: action.deviceList }

        default:
            return state
    }
}
