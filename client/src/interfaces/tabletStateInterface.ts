export interface tabletCardInterface {
    "_id": string,
    routePosition: string,
    title: string,
    availabelColor: string[],
    availabelDevices: {
        availableRAM: string[],
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
    deviceInfo: {
        [key: string]: string
    },
    about: {
        title: string,
        description: string
    }[],
    // currentDevice?: currentDevice
}

export type tabletState = {
    tabletList: tabletCardInterface[] | [],
    error: any | null,
    loading: boolean | null,
    tabletListState: tabletListStateType,
    currentModel: tabletCardInterface | null
};

export type tabletListStateType = {
    pages: number,
    currentPage: number,
    onPage: number,
    visible: tabletCardInterface[] | [],
    sorted: tabletCardInterface[] | [],
    currentSortedValue: string
}
