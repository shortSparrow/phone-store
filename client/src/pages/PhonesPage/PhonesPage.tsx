import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import './PhonesPage.scss';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { phones } from '../../store/actions'
import { phoneCardInterface, phoneListStateType } from '../../interfaces/phonesInterfaces';
import { DeviceScreenType } from '../../interfaces/appStateInterface';
import PhoneCardList from '../../components/PhoneCardList/PhoneCardList';
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation';
import { Select } from '../../components/Select/Select';
import { Preloader } from '../../components/Preloader/Preloader';

const selectList = [
    {
        title: 'Rich',
        value: 'rich'
    },
    {
        title: 'Cheap',
        value: 'cheap'
    }
]

const PhonesPage: React.FC<mainPropsInterfaces> = ({ phoneList, loadPhones, setPhoneListState, phoneListState, phoneLoadSuccss }) => {
    const [searchField, setSearchField] = useState('');
    const [selectedSortValue, setSelectedSortValue] = useState({
        title: 'Cheap',
        value: 'cheap'
    });

    useEffect(() => {
        loadPhones();
    }, []);

    useEffect(() => {
        handleSort(selectedSortValue.value)
    }, [selectedSortValue])

    /*
    // force first sort if need
    useEffect(() => {
        if (phoneListState.currentSortedValue !== selectedSortValue.value) {
            handleSort(selectedSortValue.value)
        }
    }, [phoneListState])
    */

    const handleVisible = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSearchField(value)

        const filtered = [...phoneListState.sorted].filter(phone => phone.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));

        setPhoneListState({
            ...phoneListState,
            visible: filtered
        })
    }

    const handleSort = (value: string) => {
        // sort all items
        const sortedList = [...phoneList].sort((a, b) => {
            if (value === 'rich') {
                return +b.price.current.slice(1,) - +a.price.current.slice(1,)
            } else if (value === 'cheap') {
                return +a.price.current.slice(1,) - +b.price.current.slice(1,)
            } else {
                return 1
            }
        });

        // sort visible part
        const sortedVisible = [...phoneListState.visible].sort((a, b) => {
            if (value === 'rich') {
                return +b.price.current.slice(1,) - +a.price.current.slice(1,)
            } else if (value === 'cheap') {
                return +a.price.current.slice(1,) - +b.price.current.slice(1,)
            } else {
                return 1
            }
        });

        setPhoneListState({
            ...phoneListState,
            sorted: sortedList,
            visible: sortedVisible,
            currentSortedValue: value
        })
    }

    return (
        <div className="phones-page page">
            <Header />
            <div className="main-limit">
                <SmallNavigation params={[{ title: 'Phones', link: '' }]} />
                <p className="main-titile phones-page__title">Mobile phones</p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {
                        phoneList.length === 0 && (
                            <Preloader
                                color="black"
                                width={17}
                                height={17}
                                wrapperWidth={24}
                                wrapperHeight={24}
                                borderWidth={1}
                            />
                        )
                    }

                    <p className="small-text">{phoneList.length > 0 && phoneList.length} Models </p>

                </div>

                <Select itemList={selectList} setSelectedItem={setSelectedSortValue} selectedItem={selectedSortValue} />
                <div className="filter">
                    <input type="text" value={searchField} onChange={handleVisible} />
                </div>
                <PhoneCardList phoneList={phoneListState.visible} />
            </div>
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

const mapDispatchToProps = (dispatch: any) => ({
    loadPhones: () => dispatch(phones.loadPhones()),
    setPhoneListState: (phoneListState: phoneListStateType) => dispatch(phones.phoneListState(phoneListState)),
    phoneLoadSuccss: (data: phoneCardInterface[]) => dispatch(phones.phoneSuccess(data))
})



export default connect(mapStateToProps, mapDispatchToProps)(PhonesPage)