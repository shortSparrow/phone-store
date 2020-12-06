import {
    PHONE_LIST_LOADING,
    PHONE_LIST_SUCCESS,
    PHONE_LIST_ERROR,
    PHONE_LIST_STATE,
} from '../../constants/actions'
import { phoneState } from '../../interfaces/phonesInterfaces';
import { AppStateActionTypes } from '../../interfaces/appStateInterface';



const initialState: phoneState = {
    phoneList: [],
    error: null,
    loading: null,
    phoneListState: {
        pages: 0,
        currentPage: 0,
        onPage: 0,
        visible: [],
        sorted: [],
        currentSortedValue: '',
    },
    currentModel: null
};


export const phone = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case PHONE_LIST_LOADING:
            return { ...state, loading: action.loading }

        case PHONE_LIST_SUCCESS:
            return { ...state, phoneList: action.phoneList }

        case PHONE_LIST_ERROR:
            return { ...state, error: action.error }

        case PHONE_LIST_STATE:
            return { ...state, phoneListState: action.phoneListState }

            default:
            return state
    }
}
