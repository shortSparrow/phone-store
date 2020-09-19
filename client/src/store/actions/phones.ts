import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux'

import {
    PHONE_LIST_LOADING,
    PHONE_LIST_ERROR,
    PHONE_LIST_SUCCESS,
    SORT_DIVICE, FILTER_DEVICE
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

export const sortPhones = (sortedList: phoneCardInterface[], currentSort: string): AppStateActionTypes => ({
    type: SORT_DIVICE,
    sortedList,
    currentSort
})

export const filterPhones = (visibleList: phoneCardInterface[] | []): AppStateActionTypes => ({
    type: FILTER_DEVICE,
    visibleList,
})

export const loadPhones = (): ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
    return async dispatch => {
        dispatch(phoneLoading(true));
        try {
            const phones: phoneCardInterface[] = await request('/api/phone-list');
            dispatch(phoneSuccess(phones));

            const defaultSorted = await [...phones].sort( (a, b) => {
                return +b.price.current.slice(1,) - +a.price.current.slice(1,) // ew recive $790, so cut $ sign and conver string to numer
            })
            await dispatch(filterPhones(defaultSorted))
           await dispatch(sortPhones(defaultSorted, 'rich'))
        } catch (err) {
            console.log(err);
            dispatch(phoneError(err));
        } finally {
            dispatch(phoneLoading(false));
        }
    }
}


