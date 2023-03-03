import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import DeviceCardList from '../../components/DeviceCardList/DeviceCardList'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { Pagination } from '../../components/Pagination/Pagination'
import { Preloader } from '../../components/Preloader/Preloader'
import { Select } from '../../components/Select/Select'
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation'
import { accessoriesListStateType } from '../../interfaces/accessoriesStateInterface'
import { RootStateInterface } from '../../interfaces/rootStateInterface'
import { tabletCardInterface, tabletListStateType } from '../../interfaces/tabletStateInterface'
import { accessories } from '../../store/actions';

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

const AccessoriesPage: FC = ({ accessoriesList, accessoriesListState, loadAccsseories, setAccessoriesListState, deviceCount }: any) => {
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
        if (accessoriesList.length) {

            setStructureList({
                onPage: 5,
                currentPage: 1,
                pages: Array.from(Array(Math.ceil(accessoriesList.length / 5)).keys(), (_, i) => i + 1),
                data: accessoriesList,
                currentVissible: accessoriesList.slice(0, 5),
                loaded: true
            })
        }
    }, [accessoriesList])

    const handlePageStructure = (value: number) => {
        // const { onPage, data } = structureList;

        setStructureList({
            ...structureList,
            onPage: value,
            pages: Array.from(Array(Math.ceil(accessoriesListState.visible.length / value)), (_, i) => i + 1),
            currentVissible: accessoriesListState.visible.slice(0, value),
            currentPage: 1,
            data: accessoriesListState.visible
        })
    }

    useEffect(() => {
        if (accessoriesList.length) {
            // console.log(structureList);
            // console.log('accessoriesListState: ', accessoriesListState.visible);
            // console.log('curentVisible: ', [...accessoriesListState.visible].slice(0, structureList.onPage));

            setStructureList({
                ...structureList,
                data: accessoriesListState.visible,
                pages: Array.from(Array(Math.ceil(accessoriesListState.visible.length / structureList.onPage)), (_, i) => i + 1),
                currentVissible: [...accessoriesListState.visible].slice(0, structureList.onPage),
                currentPage: 1,
            })
        }

    }, [accessoriesListState])

    useEffect(() => {
        loadAccsseories();
    }, []);

    useEffect(() => {
        handleSort(selectedSortValue.value);
    }, [selectedSortValue])

    const handleVisible = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSearchField(value)

        const filtered = [...accessoriesListState.sorted].filter(phone => phone.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));

        // console.log('filtered: ', filtered);

        setAccessoriesListState({
            ...accessoriesListState,
            visible: filtered,
        })
    }

    const handleSort = (value: string) => {
        // sort all items
        const sortedList = [...accessoriesList].sort((a, b) => {
            if (value === 'rich') {
                return +b.price.current.slice(1,) - +a.price.current.slice(1,)
            } else if (value === 'cheap') {
                return +a.price.current.slice(1,) - +b.price.current.slice(1,)
            } else {
                return 1
            }
        });

        // sort visible part
        const sortedVisible = [...accessoriesListState.visible].sort((a, b) => {
            if (value === 'rich') {
                return +b.price.current.slice(1,) - +a.price.current.slice(1,)
            } else if (value === 'cheap') {
                return +a.price.current.slice(1,) - +b.price.current.slice(1,)
            } else {
                return 1
            }
        });

        setAccessoriesListState({
            ...accessoriesListState,
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
        <div className="tablets-page page">
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

            <div className="main-limit">
                <SmallNavigation params={[{ title: 'Tablets', link: '/tablets' }]} />

                <p className="main-title page-name-title">Accessories</p>
                <p className="small-text models-count">{
                    structureList.loaded && structureList?.data?.length
                        ? structureList.data.length
                        : deviceCount.tablets ?? <Preloader
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

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    deviceScreen: state.appState.deviceScreen,
    accessoriesList: state.accessories.accessoriesList,
    accessoriesListState: state.accessories.accessoriesListState,
    deviceCount: state.appState.deviceCount
})

const mapDispatchToProps = (dispatch: any) => ({
    loadAccsseories: () => dispatch(accessories.loadAccsseories()),
    setAccessoriesListState: (accessoriesListState: accessoriesListStateType) => dispatch(accessories.accessoriesListState(accessoriesListState))
})


export default connect(mapStateToProps, mapDispatchToProps)(AccessoriesPage)