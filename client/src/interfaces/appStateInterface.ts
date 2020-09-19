import {
    DEVICE_SCREEN,
    PHONE_LIST_LOADING,
    PHONE_LIST_ERROR,
    PHONE_LIST_SUCCESS,
    SORT_DIVICE,
    FILTER_DEVICE
} from '../constants/actions';
import { phoneCardInterface } from './phonesInterfaces';

// here we describe states to appState reducer
export type DeviceScreenType = {
    name: string | null,
    value: number | null
}


// here we export all state types as one big interface for whole appState
export interface AppStateInterface {
    deviceScreen: DeviceScreenType
}


// here we describe all cation Interfaces and export them
interface setDeviceScreenInterface {
    type: typeof DEVICE_SCREEN
    payload: DeviceScreenType
}

interface phoneListLoadingInterface {
    type: typeof PHONE_LIST_LOADING,
    loading: boolean
}

interface phoneListSuccessInterface {
    type: typeof PHONE_LIST_SUCCESS,
    phoneList: phoneCardInterface[]
}

interface phoneListFailInterface {
    type: typeof PHONE_LIST_ERROR,
    error: any
}

interface sortedPhoneListInterface {
    type: typeof SORT_DIVICE,
    sortedList: phoneCardInterface[],
    currentSort: string
}

interface filterPhoneListInterface {
    type: typeof FILTER_DEVICE,
    visibleList: phoneCardInterface[] | [],
}


// here we export whole action of appState as one big type
export type AppStateActionTypes =
    setDeviceScreenInterface | phoneListLoadingInterface | phoneListSuccessInterface
    | phoneListFailInterface | sortedPhoneListInterface | filterPhoneListInterface