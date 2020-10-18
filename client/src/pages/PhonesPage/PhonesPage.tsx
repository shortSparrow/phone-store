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
import { Pagination } from '../../components/Pagination/Pagination';
import { phonesState } from '../../store/reducers/phones';

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

const selectitemsOnPageList = [
    {
        title: '5',
        value: 5
    },
    {
        title: '10',
        value: 10
    },
    {
        title: '15',
        value: 15
    },
    {
        title: '25',
        value: 25
    },
    {
        title: '50',
        value: 50
    },
]

const PhonesPage: React.FC<mainPropsInterfaces> = ({ phoneList, loadPhones, setPhoneListState, phoneListState, phoneLoadSuccss }) => {
    const [searchField, setSearchField] = useState('');
    const [selectedSortValue, setSelectedSortValue] = useState({
        title: 'Cheap',
        value: 'cheap'
    });

    const [selectedItemsOnPAgeValue, setSelectedItemsOnPageValue] = useState({
        title: '5',
        value: 5
    });

    const [structureList, setStructureList] = useState<any>({
        onPage: 16,
        currentPage: 1,
        pages: [],
        data: [],
        currentVissible: [],
        loaded: false
    })

    useEffect(() => {
        if (phoneList.length) {

            setStructureList({
                onPage: 5,
                currentPage: 1,
                pages: Array.from(Array(Math.ceil(phoneList.length / 5)).keys(), (_, i) => i + 1),
                data: phoneList,
                currentVissible: phoneList.slice(0, 5),
                loaded: true
            })
        }
    }, [phoneList])

    const handlePageStructure = (value: number) => {
        // const { onPage, data } = structureList;

        setStructureList({
            ...structureList,
            onPage: value,
            pages: Array.from(Array(Math.ceil(phoneListState.visible.length / value)), (_, i) => i + 1),
            currentVissible: phoneListState.visible.slice(0, value),
            currentPage: 1,
            data: phoneListState.visible
        })
    }

    useEffect(() => {

        if (phoneList.length) {
            // console.log(structureList);
            // console.log('phoneListState: ', phoneListState.visible);
            console.log('curentVisible: ', [...phoneListState.visible].slice(0, structureList.onPage));



            setStructureList({
                ...structureList,
                data: phoneListState.visible,
                pages: Array.from(Array(Math.ceil(phoneListState.visible.length / structureList.onPage)), (_, i) => i + 1),
                currentVissible: [...phoneListState.visible].slice(0, structureList.onPage),
                currentPage: 1,
            })
        }

    }, [phoneListState])

    useEffect(() => {
        loadPhones();
    }, []);

    useEffect(() => {
        handleSort(selectedSortValue.value);
    }, [selectedSortValue])

    const handleVisible = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSearchField(value)

        const filtered = [...phoneListState.sorted].filter(phone => phone.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));

        console.log('filtered: ', filtered);

        setPhoneListState({
            ...phoneListState,
            visible: filtered,
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


    useEffect(() => {
        handlePageStructure(selectedItemsOnPAgeValue.value)
        console.log(selectedItemsOnPAgeValue);

    }, [selectedItemsOnPAgeValue])

    return (
        <div className="phones-page page">
            <Header />
            <div className="main-limit">
                <div className="phones-page__pagination-warpper">
                    <Pagination
                        structureList={structureList}
                        setStructureList={setStructureList}
                        leftSpace={2}
                        rightSpace={2}
                    />
                </div>

                <div className="phones-page__select-phones--wrapper">
                <Select itemList={selectList} setSelectedItem={setSelectedSortValue} selectedItem={selectedSortValue} />
                <Select
                    itemList={selectitemsOnPageList}
                    setSelectedItem={setSelectedItemsOnPageValue}
                    selectedItem={selectedItemsOnPAgeValue}
                    defaultSelectIndex={selectitemsOnPageList.findIndex((item) => item.value === structureList.onPage)}
                    width={90}
                />
                </div>


                <div className="filter">
                    <input type="text" value={searchField} onChange={handleVisible} />
                </div>
                <PhoneCardList phoneList={structureList.currentVissible} />
            </div>
        </div>
    )
}

interface mainPropsInterfaces {
    deviceScreen: DeviceScreenType,
    phoneList: phoneCardInterface[],
    phoneListState: any,
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