import {
    PHONE_HOT_PRICE_SUCCESS,
    REQUEST_FAILED,
    REQUEST_LOADING
} from '../../constants/actions';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux'
import { request, postRequest } from '../../api/request';

import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';


export const hotPricePhoneLoading = (loading: boolean): AppStateActionTypes => ({
    type: REQUEST_LOADING,
    loading
});

export const hotPricePhoneSuccess = (hotPricePhoneList: phoneCardInterface[]): AppStateActionTypes => ({
    type: PHONE_HOT_PRICE_SUCCESS,
    hotPricePhoneList
})

export const hotPricePhoneFailed = (error: any): AppStateActionTypes => ({
    type: REQUEST_FAILED,
    error
})

export const loadHotPricePhones = ():ThunkAction<void, RootStateInterface, unknown, Action<string>>=> {
    return async dispatch => {
        dispatch(hotPricePhoneLoading(true))

        try {
            const phones: phoneCardInterface[] = await request(`/api/phone/hot-price`);

            // add mainImage ro other imageList, because in db they not connected
            const modificatedPhoneList = phones.map(phone => {
                const modificatedAvailabelDevices = phone.availabelDevices.map(device => {
                    device.images.other.unshift(device.images.main);
                    return device
                });
                phone.availabelDevices = modificatedAvailabelDevices
                return phone
            });

            dispatch(hotPricePhoneSuccess(modificatedPhoneList))

        } catch (err) {
            dispatch(hotPricePhoneFailed(err));
        } finally {
            dispatch(hotPricePhoneLoading(false));
        }
    }
}