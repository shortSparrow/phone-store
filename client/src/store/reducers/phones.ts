import {
    PHONE_LIST_LOADING,
    PHONE_LIST_SUCCESS,
    PHONE_LIST_ERROR,
    SORT_DIVICE,
    FILTER_DEVICE
} from '../../constants/actions'
import { phoneState } from '../../interfaces/phonesInterfaces';
import { AppStateActionTypes } from '../../interfaces/appStateInterface';



const initialState: phoneState = {
    phoneList: [],
    sortedList: [],
    visibleList: [],
    currentSort: 'rich',
    loading: null,
    error: null
};


export const phonesState = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case PHONE_LIST_LOADING:
            return { ...state, loading: action.loading }

        case PHONE_LIST_SUCCESS:
            return { ...state, phoneList: action.phoneList }

        case PHONE_LIST_ERROR:
            return { ...state, error: action.error }

        case SORT_DIVICE: {
            return {...state, sortedList: action.sortedList, currentSort: action.currentSort}
        }

        case FILTER_DEVICE: {
            return {...state, visibleList: action.visibleList}
        }

        default:
            return state
    }
}
