export interface phoneCardInterface {
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
        screen: string,
        resolution: string,
        processor: string,
        camera: string,
        zoom: string,
        cell: string,
    },
    about: {
        title: string,
        description: string
    }[]

}

export type phoneState = {
    phoneList: phoneCardInterface[]
};