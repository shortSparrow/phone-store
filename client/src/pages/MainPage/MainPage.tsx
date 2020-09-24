import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import './MainPage.scss';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import {phones} from '../../store/actions'
import { phoneCardInterface, phoneListStateType } from '../../interfaces/phonesInterfaces';
import { DeviceScreenType } from '../../interfaces/appStateInterface';
import PhoneCardList from '../../components/PhoneCardList/PhoneCardList';



const MainPage: React.FC<mainPropsInterfaces> = ({phoneList, loadPhones, setPhoneListState, phoneListState, phoneLoadSuccss}) => {
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        loadPhones()
    }, [])

    const handleVisible = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setSearchField(value)

       const filtered = [...phoneList].filter(phone => phone.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
       setPhoneListState({
           ...phoneListState,
           visible: filtered
       })
    }

    const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
        const {value} = event.target;

        const sortedList = [...phoneListState.visible].sort((a,b) => {
            if (value === 'rich') {
                return +b.price.current.slice(1,) - +a.price.current.slice(1,)
            } else if (value === 'cheap') {
                return +a.price.current.slice(1,) - +b.price.current.slice(1,)
            } else {
                return 1
            }
         })

        setPhoneListState({
            ...phoneListState,
            sorted: sortedList,
            visible: sortedList,
            currentSortedValue: value
        })
    }

    // create sorted 
    return (
        <div className="main-page">
            <Header />
            <div className="select">
                <select value={phoneListState.currentSortedValue} onChange={handleSort}>
                    <option value="rich">rich</option>
                    <option value="cheap">Cheap</option>
                </select>
            </div>
            <div className="filter">
                <input type="text" value={searchField} onChange={handleVisible}/>
            </div>
            <PhoneCardList phoneList={phoneListState.visible}/>
        </div>
    )
}

interface mainPropsInterfaces {
    deviceScreen: DeviceScreenType,
    phoneList: phoneCardInterface[],
    phoneListState: phoneListStateType,
    loadPhones: () => {},
    setPhoneListState: (phoneListState: phoneListStateType) => {},
    phoneLoadSuccss: (data: phoneCardInterface[]) => {}
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    deviceScreen: state.appState.deviceScreen,
    phoneList: state.phonesState.phoneList,
    phoneListState: state.phonesState.phoneListState,
    phoneState: state.phonesState.phoneListState
})

const mapDispatchToProps = (dispatch:any) => ({
    loadPhones: () => dispatch(phones.loadPhones()),
    setPhoneListState: (phoneListState: phoneListStateType) => dispatch(phones.phoneListState(phoneListState)),
    phoneLoadSuccss: (data: phoneCardInterface[]) => dispatch(phones.phoneSuccess(data))
})



export default connect(mapStateToProps, mapDispatchToProps)(MainPage)