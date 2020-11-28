import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux'

import {
    PHONE_LIST_LOADING,
    PHONE_LIST_ERROR,
    PHONE_LIST_SUCCESS,
    PHONE_LIST_STATE,
    PHONE_ITEM_SUCCESS
} from '../../constants/actions';
import { request, postRequest } from '../../api/request';
import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { phoneCardInterface, phoneListStateType } from '../../interfaces/phonesInterfaces';
import { phonesState } from '../reducers/phones';

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

export const phoneListState = (phoneListState: phoneListStateType): AppStateActionTypes => ({
    type: PHONE_LIST_STATE,
    phoneListState
})

export const loadPhones = (): ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
    return async dispatch => {
        dispatch(phoneLoading(true));
        try {
            const phones: phoneCardInterface[] = await request('/api/phone/list');

            // add mainImage ro other imageList, ecause in db they not connected
            const modificatedPhoneList = phones.map(phone => {
                const modificatedAvailabelDevices = phone.availabelDevices.map(device => {
                    device.images.other.unshift(device.images.main);
                    return device
                });
                phone.availabelDevices = modificatedAvailabelDevices
                return phone
            });


            await dispatch(phoneSuccess(modificatedPhoneList));

            // sorted by cheap price
            const sortedPoneList = phones.sort((a, b) => +a.price.current.slice(1,) - +b.price.current.slice(1,))
            await dispatch(phoneListState({
                pages: 0,
                currentPage: 0,
                onPage: 0,
                visible: sortedPoneList,
                sorted: sortedPoneList,
                currentSortedValue: 'cheap'
            }))
        } catch (err) {
            console.log(err);
            dispatch(phoneError(err));
        } finally {
            dispatch(phoneLoading(false));
        }
    }
}

export const phoneItemSuccess = (currentModel: phoneCardInterface): AppStateActionTypes => ({
    type: PHONE_ITEM_SUCCESS,
    currentModel
})

export const getPhoneByModelName = (model_name: string): ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
    return async dispatch => {
        dispatch(phoneLoading(true));
        try {
            const phone: phoneCardInterface = await request(`/api/phone/item/?model_name=${model_name}`);

            // add mainImage ro other imageList, ecause in db they not connected
            phone.availabelDevices.map(device => {
                device.images.other.unshift(device.images.main);
                return device
            });

            dispatch(phoneItemSuccess(phone))

        } catch (err) {
            dispatch(phoneError(err));
        } finally {
            dispatch(phoneLoading(false));
        }

    }
}

