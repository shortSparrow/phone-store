import {
    PHONE_LIST_LOADING,
    PHONE_LIST_SUCCESS,
    PHONE_LIST_ERROR
} from '../../constants/actions'
import { phoneState } from '../../interfaces/phonesInterfaces';
import { AppStateActionTypes } from '../../interfaces/appStateInterface';



const initialState: phoneState = {
    phoneList: []
};


export const phonesState = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case PHONE_LIST_LOADING:
            return { ...state, loading: action.loading }

        case PHONE_LIST_SUCCESS:
            return { ...state, phoneList: action.phoneList }

        case PHONE_LIST_ERROR:
            return { ...state, error: action.error }

        default:
            return state
    }
}
