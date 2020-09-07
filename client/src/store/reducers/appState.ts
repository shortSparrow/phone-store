import { DEVICE_SCREEN } from '../../constants/actions'
import { AppStateInterface, AppStateActionTypes } from '../../interfaces/appStateInterface';

const initialState: AppStateInterface = {
    deviceScreen: {
        name: null,
        value: null
    }
};


export const appState = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case DEVICE_SCREEN:
            return { ...state, deviceScreen: action.payload }

        default:
            return state
    }
}
