import {
    PHONE_HOT_PRICE_SUCCESS,
    REQUEST_FAILED,
    REQUEST_LOADING
} from '../../constants/actions';

import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import { hotPriceState } from '../../interfaces/phonesInterfaces';

const initialState: hotPriceState = {
    loading: null,
    error: null,
    hotPricePhoneList: [],
}


export const hotPricePhones = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case REQUEST_LOADING:
            return {
                ...state, loading: action.loading
            }
        case REQUEST_FAILED:
            return {
                ...state, error: action.error
            }
        case PHONE_HOT_PRICE_SUCCESS:
            return {
                ...state, hotPricePhoneList: action.hotPricePhoneList
            }
        default:
            return state
    }
}