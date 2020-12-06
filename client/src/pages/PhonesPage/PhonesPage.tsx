import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import './PhonesPage.scss';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import { phones } from '../../store/actions'
import { phoneCardInterface, phoneListStateType } from '../../interfaces/phonesInterfaces';
import { DeviceCountType, DeviceScreenType } from '../../interfaces/appStateInterface';
import DeviceCardList from '../../components/DeviceCardList/DeviceCardList';
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation';
import { Select } from '../../components/Select/Select';
import { Preloader } from '../../components/Preloader/Preloader';
import { Pagination } from '../../components/Pagination/Pagination';
import { phone } from '../../store/reducers/phones';
import Footer from '../../components/Footer/Footer';

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

const PhonesPage: React.FC<mainPropsInterfaces> = (props) => {
    const {
        phoneList, loadPhones,
        setPhoneListState, phoneListState,
        phoneLoadSuccss, deviceCount
    } = props
    const [searchField, setSearchField] = useState('');
    const [noMathes, setNoMathces] = useState(false)
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
                ...structureList,
                // onPage: 5,
                // currentPage: 1,
                // pages: Array.from(Array(Math.ceil(phoneList.length / 5)).keys(), (_, i) => i + 1),
                // data: phoneList,
                // currentVissible: phoneList.slice(0, 5),
                loaded: true
            })
        }
    }, [phoneList])

    // console.log(structureList.currentVissible);


    const handlePageStructure = (value: number) => {
        const { onPage, data } = structureList;

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
            // console.log('curentVisible: ', [...phoneListState.visible].slice(0, structureList.onPage));



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

        if (filtered.length) {
            setNoMathces(false)
        } else {
            setNoMathces(true)
        }

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
        // console.log(selectedItemsOnPAgeValue);

    }, [selectedItemsOnPAgeValue])

    return (
        <div className="phones-page page">
            <Header>
                <input
                    id="filter-field"
                    type="text"
                    value={searchField}
                    onChange={handleVisible}
                    className="filter-input--wrapper filter-input--search"
                    placeholder="Search in phones..."
                />
            </Header>

            <div className="main-limit content">
                <SmallNavigation params={[{ title: 'Phones', link: '/phones' }]} />
                <p className="main-title page-name-title">Mobile phones</p>
                <p className="small-text models-count">{
                    structureList.loaded && structureList?.data?.length
                        ? structureList.data.length
                        : deviceCount.phones ?? <Preloader
                            color="#89939A"
                            width="12"
                            height="12"
                            borderWidth="1"
                            wrapperWidth="12"
                            wrapperHeight="12"
                        />
                } models</p>



                <div className="phones-page__select-phones--wrapper">
                    <div>
                        <p className="small-text models-count"> Sort by</p>
                        <Select itemList={selectList} setSelectedItem={setSelectedSortValue} selectedItem={selectedSortValue} />
                    </div>

                    <div>
                        <p className="small-text models-count"> Items on page</p>
                        <Select
                            itemList={selectitemsOnPageList}
                            setSelectedItem={setSelectedItemsOnPageValue}
                            selectedItem={selectedItemsOnPAgeValue}
                            defaultSelectIndex={selectitemsOnPageList.findIndex((item) => item.value === structureList.onPage)}
                            width={128}
                        />
                    </div>
                </div>


                <DeviceCardList deviceList={structureList.currentVissible} />

                {
                    noMathes && (
                        <div className="empty-list--information">
                            <p className="uppaercase-text" style={{ fontSize: 20, lineHeight: 'inherit' }}>
                                Doesn't find any device
                            </p>
                        </div>
                    )
                }

                <div className="phones-page__pagination-warpper">
                    <Pagination
                        structureList={structureList}
                        setStructureList={setStructureList}
                        leftSpace={2}
                        rightSpace={2}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}

interface mainPropsInterfaces {
    deviceScreen: DeviceScreenType,
    phoneList: phoneCardInterface[],
    phoneListState: any,
    deviceCount: DeviceCountType,
    loadPhones: () => {},
    setPhoneListState: (phoneListState: phoneListStateType) => {},
    phoneLoadSuccss: (data: phoneCardInterface[]) => {}
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    deviceScreen: state.appState.deviceScreen,
    phoneList: state.phone.phoneList,
    phoneListState: state.phone.phoneListState,
    phoneState: state.phone.phoneListState,
    deviceCount: state.appState.deviceCount
})

const mapDispatchToProps = (dispatch: any) => ({
    loadPhones: () => dispatch(phones.loadPhones()),
    setPhoneListState: (phoneListState: phoneListStateType) => dispatch(phones.phoneListState(phoneListState)),
    phoneLoadSuccss: (data: phoneCardInterface[]) => dispatch(phones.phoneSuccess(data))
})



export default connect(mapStateToProps, mapDispatchToProps)(PhonesPage)