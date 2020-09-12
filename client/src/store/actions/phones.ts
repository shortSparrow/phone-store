import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux'

import {
    PHONE_LIST_LOADING,
    PHONE_LIST_ERROR,
    PHONE_LIST_SUCCESS
} from '../../constants/actions';
import { request } from '../../api/request';
import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';

export const phoneLoading = (loading: boolean): AppStateActionTypes => ({
    type: PHONE_LIST_LOADING,
    loading
});

export const phoneSuccess = (phoneList: phoneCardInterface[]): AppStateActionTypes => ({
    type: PHONE_LIST_SUCCESS,
    phoneList
})

export const phoneError = (error: any): AppStateActionTypes => ({
    type: PHONE_LIST_ERROR,
    error
})



export const loadPhones = (): ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
    return async dispatch => {
        dispatch(phoneLoading(true));
        try {
            const phones = await request('/api/phone-list');
            dispatch(phoneSuccess(phones));
        } catch (err) {
            console.log(err);
            dispatch(phoneError(err));
        } finally {
            dispatch(phoneLoading(false));
        }
    }
}


