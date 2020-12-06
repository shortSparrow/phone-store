import {
    ACCESSORIES_LIST_LOADING,
    ACCESSORIES_LIST_SUCCESS,
    ACCESSORIES_LIST_ERROR,
    ACCESSORIES_LIST_STATE,
} from '../../constants/actions'
import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import { accessoriesState } from '../../interfaces/accessoriesStateInterface';



const initialState: accessoriesState = {
    accessoriesList: [],
    error: null,
    loading: null,
    accessoriesListState: {
        pages: 0,
        currentPage: 0,
        onPage: 0,
        visible: [],
        sorted: [],
        currentSortedValue: '',
    },
    currentModel: null
};


export const accessories = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case ACCESSORIES_LIST_LOADING:
            return { ...state, loading: action.loading }

        case ACCESSORIES_LIST_SUCCESS:
            return { ...state, accessoriesList: action.accessoriesList }

        case ACCESSORIES_LIST_ERROR:
            return { ...state, error: action.error }

        case ACCESSORIES_LIST_STATE:
            return { ...state, accessoriesListState: action.accessoriesListState }

        default:
            return state
    }
}
