import {DEVICE_SCREEN} from '../../constants/actions';
import {AppStateActionTypes, DeviceScreenType} from '../../interfaces/appStateInterface';


export const setDeviceScreen = (payload: DeviceScreenType): AppStateActionTypes => ({
    type: DEVICE_SCREEN,
    payload
})
