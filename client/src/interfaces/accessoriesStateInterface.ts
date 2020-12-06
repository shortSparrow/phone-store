export interface accessoriesCardInterface {
    "_id": string,
    routePosition: string,
    title: string,
    availabelColor: string[],
    availabelDevices: {
        images: {
            main: string,
            other: string[]
        },
        color: string
    }[],
    price: {
        current: string,
        old: string
    },
    deviceInfo?: {
        [key: string]: string | string[]
    },
    about?: {
        title: string,
        description: string
    }[],
}

export type accessoriesState = {
    accessoriesList: accessoriesCardInterface[] | [],
    error: any | null,
    loading: boolean | null,
    accessoriesListState: accessoriesListStateType,
    currentModel: accessoriesCardInterface | null
};

export type accessoriesListStateType = {
    pages: number,
    currentPage: number,
    onPage: number,
    visible: accessoriesCardInterface[] | [],
    sorted: accessoriesCardInterface[] | [],
    currentSortedValue: string
}
