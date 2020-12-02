import { DEVICE_SCREEN, SET_DEVICES_COUNT } from '../../constants/actions'
import { AppStateInterface, AppStateActionTypes } from '../../interfaces/appStateInterface';

const initialState: AppStateInterface = {
    deviceScreen: {
        name: null,
        value: null
    },
    deviceCount: {
        tablets: null,
        phones: null,
        accessories: null
    }
};


export const appState = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case DEVICE_SCREEN:
            return { ...state, deviceScreen: action.payload }

        case SET_DEVICES_COUNT:
            return { ...state, deviceCount: action.payload }

        default:
            return state
    }
}
