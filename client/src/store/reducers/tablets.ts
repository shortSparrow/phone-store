import {
    TABLET_LIST_LOADING,
    TABLET_LIST_SUCCESS,
    TABLET_LIST_ERROR,
    TABLET_LIST_STATE,
    TABLET_ITEM_SUCCESS
} from '../../constants/actions'
import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import { tabletState } from '../../interfaces/tabletStateInterface';



const initialState: tabletState = {
    tabletList: [],
    error: null,
    loading: null,
    tabletListState: {
        pages: 0,
        currentPage: 0,
        onPage: 0,
        visible: [],
        sorted: [],
        currentSortedValue: '',
    },
    currentModel: null
};


export const tabletsState = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case TABLET_LIST_LOADING:
            return { ...state, loading: action.loading }

        case TABLET_LIST_SUCCESS:
            return { ...state, tabletList: action.tabletList }

        case TABLET_LIST_ERROR:
            return { ...state, error: action.error }

        case TABLET_LIST_STATE:
            return { ...state, tabletListState: action.tabletListState }

        case TABLET_ITEM_SUCCESS:
            return { ...state, currentModel: action.currentModel }

        default:
            return state
    }
}
