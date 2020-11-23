import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import DeviceCardList from '../../components/DeviceCardList/DeviceCardList'
import Header from '../../components/Header/Header'
import { Pagination } from '../../components/Pagination/Pagination'
import { Select } from '../../components/Select/Select'
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation'
import { RootStateInterface } from '../../interfaces/rootStateInterface'
import { tabletCardInterface, tabletListStateType } from '../../interfaces/tabletStateInterface'
import { tablets } from '../../store/actions';

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

const TabletsPage: FC = ({ tabletList, tabletListState, loadTablets, setTabletListState }: any) => {
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
        if (tabletList.length) {

            setStructureList({
                onPage: 5,
                currentPage: 1,
                pages: Array.from(Array(Math.ceil(tabletList.length / 5)).keys(), (_, i) => i + 1),
                data: tabletList,
                currentVissible: tabletList.slice(0, 5),
                loaded: true
            })
        }
    }, [tabletList])

    const handlePageStructure = (value: number) => {
        // const { onPage, data } = structureList;

        setStructureList({
            ...structureList,
            onPage: value,
            pages: Array.from(Array(Math.ceil(tabletListState.visible.length / value)), (_, i) => i + 1),
            currentVissible: tabletListState.visible.slice(0, value),
            currentPage: 1,
            data: tabletListState.visible
        })
    }

    useEffect(() => {

        if (tabletList.length) {
            // console.log(structureList);
            // console.log('tabletListState: ', tabletListState.visible);
            console.log('curentVisible: ', [...tabletListState.visible].slice(0, structureList.onPage));



            setStructureList({
                ...structureList,
                data: tabletListState.visible,
                pages: Array.from(Array(Math.ceil(tabletListState.visible.length / structureList.onPage)), (_, i) => i + 1),
                currentVissible: [...tabletListState.visible].slice(0, structureList.onPage),
                currentPage: 1,
            })
        }

    }, [tabletListState])

    useEffect(() => {
        loadTablets();
    }, []);

    useEffect(() => {
        handleSort(selectedSortValue.value);
    }, [selectedSortValue])

    const handleVisible = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSearchField(value)

        const filtered = [...tabletListState.sorted].filter(phone => phone.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));

        console.log('filtered: ', filtered);

        setTabletListState({
            ...tabletListState,
            visible: filtered,
        })
    }

    const handleSort = (value: string) => {
        // sort all items
        const sortedList = [...tabletList].sort((a, b) => {
            if (value === 'rich') {
                return +b.price.current.slice(1,) - +a.price.current.slice(1,)
            } else if (value === 'cheap') {
                return +a.price.current.slice(1,) - +b.price.current.slice(1,)
            } else {
                return 1
            }
        });

        // sort visible part
        const sortedVisible = [...tabletListState.visible].sort((a, b) => {
            if (value === 'rich') {
                return +b.price.current.slice(1,) - +a.price.current.slice(1,)
            } else if (value === 'cheap') {
                return +a.price.current.slice(1,) - +b.price.current.slice(1,)
            } else {
                return 1
            }
        });

        setTabletListState({
            ...tabletListState,
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
        <div>
            <Header />
            <div className="main-limit">
                <SmallNavigation params={[{ title: 'Tablets', link: '/tablets' }]} />

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

                <DeviceCardList deviceList={structureList.currentVissible} />
            </div>
            
        </div>

    )
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    deviceScreen: state.appState.deviceScreen,
    tabletList: state.tabletsState.tabletList,
    tabletListState: state.tabletsState.tabletListState,
})

const mapDispatchToProps = (dispatch: any) => ({
    loadTablets: () => dispatch(tablets.loadTablets()),
    setTabletListState: (tabletListState: tabletListStateType) => dispatch(tablets.tabletListState(tabletListState)),
})


export default connect(mapStateToProps, mapDispatchToProps)(TabletsPage)