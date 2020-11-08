import { phoneCardInterface } from "./phonesInterfaces";

export interface cartDeviceListState {
    deviceList: cartDevice[]
}

// export type cartDevice = {
//     [key: string]: any
// }


export type cartDevice = {
    _id: string,
    price: {
        old: string,
        current: string
    },
    image: string,
    title: string,
    routePosition: string,
    deviceInfo: {
        camera?: string,
        cell?: string,
        processor?: string,
        resolution?: string,
        screen?: string,
        zoom?: string,
        color: string,
        RAM: string,
    },
    about: {
        title: string,
        description: string
    }[],
}