import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import './MainPage.scss';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import {phones} from '../../store/actions'
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import { DeviceScreenType } from '../../interfaces/appStateInterface';
import PhoneCardList from '../../components/PhoneCardList/PhoneCardList';
import SortedBy from '../../components/SortedBy/SortedBy';



const MainPage: React.FC<mainPropsInterfaces> = ({phoneList, sortedList, loadPhones, sortPhones, filterPhones, visibleList}) => {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        loadPhones();
    }, [])

    useEffect(() => {
        // console.log(typeof phoneList);
        // console.log( phoneList);
        
    }, [visibleList])


    const sortBy = (value: string) => {
        return [...phoneList].sort((a,b) => {
            if (value === 'rich') {
                return +b.price.current.slice(1,) - +a.price.current.slice(1,) 
            } else if (value === 'ceap') {
                return +a.price.current.slice(1,) - +b.price.current.slice(1,) 
            } else if (value === 'rate'){
                // return +b.price.current.slice(1,) - +a.price.current.slice(1,)
                return 1
            } else if (value === 'newest') {
                // return +b.price.current.slice(1,) - +a.price.current.slice(1,)
                return 1
            } else {
                return 1
            }
        })
    }

    const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        const filteredList = [...phoneList].filter(phone => phone.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()));
        
        console.log(filteredList);
        
        filterPhones(filteredList)
    }

    // create sorted 
    return (
        <div className="main-page">
            <Header />
            <SortedBy dispatchFunc={sortPhones} sortFunc={sortBy}/>
            <div>
                <input type="text" value={searchValue} onChange={handleFilter}/>
            </div>
            <PhoneCardList phoneList={visibleList}/>
        </div>
    )
}

interface mainPropsInterfaces {
    deviceScreen: DeviceScreenType,
    phoneList: phoneCardInterface[],
    sortedList: phoneCardInterface[],
    visibleList: phoneCardInterface[] | [],
    loadPhones: () => {}
    sortPhones: (phoneList: phoneCardInterface[], currentSort: string) => {},
    filterPhones: (visibleList: phoneCardInterface[] | []) => {}
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    deviceScreen: state.appState.deviceScreen,
    phoneList: state.phonesState.phoneList,
    sortedList: state.phonesState.sortedList,
    visibleList: state.phonesState.visibleList
})

const mapDispatchToProps = (dispatch:any) => ({
    loadPhones: () => dispatch(phones.loadPhones()),
    sortPhones: (sortedList: phoneCardInterface[], currentSort: string) => dispatch(phones.sortPhones(sortedList, currentSort)),
    filterPhones: (visibleList: phoneCardInterface[] | []) => dispatch(phones.filterPhones(visibleList))
})



export default connect(mapStateToProps, mapDispatchToProps)(MainPage)