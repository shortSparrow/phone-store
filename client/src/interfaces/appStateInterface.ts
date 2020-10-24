import {
    DEVICE_SCREEN,
    PHONE_LIST_LOADING,
    PHONE_LIST_ERROR,
    PHONE_LIST_SUCCESS,
    PHONE_LIST_STATE,
    PHONE_ITEM_SUCCESS,
    REQUEST_LOADING,
    REQUEST_FAILED,
    PHONE_HOT_PRICE_SUCCESS,
    SET_FAVORITE_DEVICES
} from '../constants/actions';
import { phoneCardInterface, phoneListStateType } from './phonesInterfaces';

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

interface phoneListState {
    type: typeof PHONE_LIST_STATE,
    phoneListState: phoneListStateType
}

interface phoneItemSuccess {
    type: typeof PHONE_ITEM_SUCCESS,
    currentModel: phoneCardInterface
}

interface requestLoading {
    type: typeof REQUEST_LOADING,
    loading: boolean
}

interface requestFailed {
    type: typeof REQUEST_FAILED,
    error: any
}

interface phoneHotPriceSuccess {
    type: typeof PHONE_HOT_PRICE_SUCCESS,
    hotPricePhoneList: phoneCardInterface[]
}

interface setFavoriteDevices {
    type: typeof SET_FAVORITE_DEVICES,
    deviceList: any
}

// here we export whole action of appState as one big type
export type AppStateActionTypes =
    setDeviceScreenInterface | phoneListLoadingInterface | phoneListSuccessInterface |
    phoneListFailInterface | phoneListState | phoneItemSuccess | requestLoading | requestFailed |
    phoneHotPriceSuccess | setFavoriteDevices