import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux'
import { request } from '../../api/request';
import { DEVICE_SCREEN, SET_DEVICES_COUNT } from '../../constants/actions';
import { AppStateActionTypes, DeviceScreenType, DeviceCountType } from '../../interfaces/appStateInterface';
import { RootStateInterface } from '../../interfaces/rootStateInterface';

export const setDeviceScreen = (payload: DeviceScreenType): AppStateActionTypes => ({
    type: DEVICE_SCREEN,
    payload
})

export const setDevicesCount = (payload: DeviceCountType): AppStateActionTypes => ({
    type: SET_DEVICES_COUNT,
    payload
})

export const loadDevicesCount = (): any => {
    return async (dispatch: any) => {
        const response = await request('/api/devices_count')

        dispatch(setDevicesCount(response))
    }
}