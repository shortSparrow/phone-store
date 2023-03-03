import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux'

import {
    ACCESSORIES_LIST_LOADING,
    ACCESSORIES_LIST_SUCCESS,
    ACCESSORIES_LIST_ERROR,
    ACCESSORIES_LIST_STATE,
} from '../../constants/actions';
import { request, postRequest } from '../../api/request';
import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { accessoriesCardInterface, accessoriesListStateType } from '../../interfaces/accessoriesStateInterface';
import { phone } from '../reducers/phones';
import { tabletCardInterface } from '../../interfaces/tabletStateInterface';

export const accessoriesLoading = (loading: boolean): AppStateActionTypes => ({
    type: ACCESSORIES_LIST_LOADING,
    loading
});

export const accessoriesSuccess = (accessoriesList: accessoriesCardInterface[]): AppStateActionTypes => ({
    type: ACCESSORIES_LIST_SUCCESS,
    accessoriesList
})

export const accessoriesError = (error: any): AppStateActionTypes => ({
    type: ACCESSORIES_LIST_ERROR,
    error
})

export const accessoriesListState = (accessoriesListState: accessoriesListStateType): AppStateActionTypes => ({
    type: ACCESSORIES_LIST_STATE,
    accessoriesListState
})


export const loadAccsseories = (): ThunkAction<void, RootStateInterface, unknown, Action<string>> => {
    return async dispatch => {
        dispatch(accessoriesLoading(true));
        try {
            const accessories: accessoriesCardInterface[] = await request('/api/accessories/list');

            // add mainImage ro other imageList, ecause in db they not connected
            const modificatedAccessoriesList = accessories.map(item => {
                const modificatedAvailabelDevices = item.availabelDevices.map(model => {
                    model.images.other.unshift(model.images.main);
                    return model
                });
                item.availabelDevices = modificatedAvailabelDevices
                return item
            });


            await dispatch(accessoriesSuccess(modificatedAccessoriesList));

            // sorted by cheap price
            const sortedAccessoriesList = accessories.sort((a, b) => +a.price.current.slice(1,) - +b.price.current.slice(1,))
            await dispatch(accessoriesListState({
                pages: 0,
                currentPage: 0,
                onPage: 0,
                visible: sortedAccessoriesList,
                sorted: sortedAccessoriesList,
                currentSortedValue: 'cheap'
            }))
        } catch (err) {
            console.log(err);
            dispatch(accessoriesError(err));
        } finally {
            dispatch(accessoriesLoading(false));
        }
    }
}
