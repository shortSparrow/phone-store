import {
    DEVICE_SCREEN,
    PHONE_LIST_LOADING,
    PHONE_LIST_ERROR,
    PHONE_LIST_SUCCESS,
    PHONE_LIST_STATE,
    REQUEST_LOADING,
    REQUEST_FAILED,
    SET_FAVORITE_DEVICES,
    SET_CART_DEVICE_LIST,
    TABLET_LIST_LOADING,
    TABLET_LIST_SUCCESS,
    TABLET_LIST_ERROR,
    TABLET_LIST_STATE,
    SET_DEVICES_COUNT,
    ACCESSORIES_LIST_LOADING,
    ACCESSORIES_LIST_SUCCESS,
    ACCESSORIES_LIST_ERROR,
    ACCESSORIES_LIST_STATE,
} from '../constants/actions';
import { accessoriesCardInterface, accessoriesListStateType } from './accessoriesStateInterface';
import { phoneCardInterface, phoneListStateType } from './phonesInterfaces';
import { tabletCardInterface, tabletListStateType } from './tabletStateInterface';

// here we describe states to appState reducer
export type DeviceScreenType = {
    name: string | null,
    value: number | null
}


// here we export all state types as one big interface for whole appState
export interface AppStateInterface {
    deviceScreen: DeviceScreenType,
    deviceCount: DeviceCountType
}

export type DeviceCountType = {
    tablets: number | null,
    phones: number | null,
    accessories: number | null
}

// here we describe all cation Interfaces and export them
interface setDeviceScreenInterface {
    type: typeof DEVICE_SCREEN
    payload: DeviceScreenType
}


interface setDevicesCountInterface {
    type: typeof SET_DEVICES_COUNT
    payload: DeviceCountType
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

interface requestLoading {
    type: typeof REQUEST_LOADING,
    loading: boolean
}

interface requestFailed {
    type: typeof REQUEST_FAILED,
    error: any
}

interface setFavoriteDevices {
    type: typeof SET_FAVORITE_DEVICES,
    deviceList: any
}

interface setCartDeviceList {
    type: typeof SET_CART_DEVICE_LIST,
    deviceList: any
}

interface tabletsLoading {
    type: typeof TABLET_LIST_LOADING,
    loading: boolean
}

interface tabletsSuccess {
    type: typeof TABLET_LIST_SUCCESS,
    tabletList: tabletCardInterface[]
}
interface tabletsError {
    type: typeof TABLET_LIST_ERROR,
    error: any
}
interface tabletListState {
    type: typeof TABLET_LIST_STATE,
    tabletListState: tabletListStateType
}

interface accessoriesLoading {
    type: typeof ACCESSORIES_LIST_LOADING,
    loading: boolean
}

interface accessoriesSuccess {
    type: typeof ACCESSORIES_LIST_SUCCESS,
    accessoriesList: accessoriesCardInterface[]
}
interface accessoriesError {
    type: typeof ACCESSORIES_LIST_ERROR,
    error: any
}
interface accessoriesListState {
    type: typeof ACCESSORIES_LIST_STATE,
    accessoriesListState: accessoriesListStateType
}


// here we export whole action of appState as one big type
export type AppStateActionTypes =
    setDeviceScreenInterface | setDevicesCountInterface | phoneListLoadingInterface | phoneListSuccessInterface |
    phoneListFailInterface | phoneListState | requestLoading | requestFailed |
    setFavoriteDevices | setCartDeviceList | tabletsLoading | tabletsSuccess |
    tabletsError | tabletListState | accessoriesLoading | accessoriesSuccess | accessoriesError |
    accessoriesListState 