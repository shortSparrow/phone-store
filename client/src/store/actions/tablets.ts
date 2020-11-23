import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux'

import {
    TABLET_LIST_LOADING,
    TABLET_LIST_SUCCESS,
    TABLET_LIST_ERROR,
    TABLET_LIST_STATE,
    TABLET_ITEM_SUCCESS
} from '../../constants/actions';
import { request, postRequest } from '../../api/request';
import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { phoneCardInterface, phoneListStateType } from '../../interfaces/phonesInterfaces';
import { phonesState } from '../reducers/phones';
import { tabletCardInterface } from '../../interfaces/tabletStateInterface';

export const tabletsLoading = (loading: boolean): AppStateActionTypes => ({
    type: TABLET_LIST_LOADING,
    loading
});

export const tabletsSuccess = (tabletList: tabletCardInterface[]): AppStateActionTypes => ({
    type: TABLET_LIST_SUCCESS,
    tabletList
})

export const tabletsError = (error: any): AppStateActionTypes => ({
    type: TABLET_LIST_ERROR,
    error
})

export const tabletListState = (tabletListState: phoneListStateType): AppStateActionTypes => ({
    type: TABLET_LIST_STATE,
    tabletListState
})


export const loadTablets = (): ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
    return async dispatch => {
        dispatch(tabletsLoading(true));
        try {
            const tablets: tabletCardInterface[] = await request('/api/tablet/list');

            // add mainImage ro other imageList, ecause in db they not connected
            const modificatedPhoneList = tablets.map(tablet => {
                const modificatedAvailabelDevices = tablet.availabelDevices.map(device => {
                    device.images.other.unshift(device.images.main);
                    return device
                });
                tablet.availabelDevices = modificatedAvailabelDevices
                return tablet
            });


            await dispatch(tabletsSuccess(modificatedPhoneList));

            // sorted by cheap price
            const sortedPoneList = tablets.sort((a, b) => +a.price.current.slice(1,) - +b.price.current.slice(1,))
            await dispatch(tabletListState({
                pages: 0,
                currentPage: 0,
                onPage: 0,
                visible: sortedPoneList,
                sorted: sortedPoneList,
                currentSortedValue: 'cheap'
            }))
        } catch (err) {
            console.log(err);
            dispatch(tabletsError(err));
        } finally {
            dispatch(tabletsLoading(false));
        }
    }
}

export const tabletItemSuccess = (currentModel: tabletCardInterface): AppStateActionTypes => ({
    type: TABLET_ITEM_SUCCESS,
    currentModel
})

export const getTabletByModelName = (model_name: string): ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
    return async dispatch => {
        dispatch(tabletsLoading(true));
        try {
            const tablet: tabletCardInterface = await request(`/api/tablet/item/?model_name=${model_name}`);
            // console.log('tablet item: ', tablet);
            

            // add mainImage ro other imageList, ecause in db they not connected
            tablet.availabelDevices.map(device => {
                device.images.other.unshift(device.images.main);
                return device
            });

            dispatch(tabletItemSuccess(tablet))

        } catch (err) {
            dispatch(tabletsError(err));
        } finally {
            dispatch(tabletsLoading(false));
        }

    }
}

