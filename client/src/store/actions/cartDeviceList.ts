import {SET_CART_DEVICE_LIST} from '../../constants/actions';
import {AppStateActionTypes, DeviceScreenType} from '../../interfaces/appStateInterface';
import {cartDevice} from '../../interfaces/cartDeviceList';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { RootStateInterface } from '../../interfaces/rootStateInterface';
import store from '..';

export const setCartDeviceList = (deviceList: any):AppStateActionTypes => ({
    type: SET_CART_DEVICE_LIST,
    deviceList
})


export const toggleCartDevice = (device: cartDevice):ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
    return async dispatch => {
        const {deviceList} = store.getState().cartDeviceList

        const duplicate = deviceList.find((deviceItem: cartDevice) => deviceItem._id === device._id);
        let newCartList = null;

        if (!duplicate) {
            newCartList = [...deviceList, device]
        } else {
            const listWithoutDuplicate = deviceList.filter((deviceItem: cartDevice) => deviceItem._id !== device._id);
            newCartList = listWithoutDuplicate
        }

        dispatch(setCartDeviceList(newCartList))

        localStorage.setItem('@cartDeviceList', JSON.stringify(newCartList))
    }
}
