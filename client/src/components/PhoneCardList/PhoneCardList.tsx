import { NULL } from 'node-sass';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import PhoneCardItem from '../PhoneCardItem/PhoneCardItem';

import "./PhoneCardList.scss";

const Pagination = ({structureList, setStructureList}: any) => {
    const [paginationList, setPaginationList] = useState<any>([]);

    
    const updatePagination = (page: any = null) => {
        const { data, onPage } = structureList;

        let leftStep = 3;
        let rightStep = 3;

        while (structureList.currentPage - leftStep <= 0) {
            leftStep--;
            rightStep++;
        }

        while (structureList.currentPage + rightStep > structureList.pages.length) {
            leftStep++;
            rightStep--
        }

        let space = [structureList.currentPage - leftStep, structureList.currentPage, structureList.currentPage + rightStep];

        let i = 0;
        let luft = [];

        while ((structureList.currentPage + rightStep - i) - (structureList.currentPage - leftStep)) {
            const newValue = structureList.currentPage - leftStep + i;
            if (newValue > 0) {
                luft.push(newValue)
            }
            i++;
        }

        luft[0] = 1;

        luft.push(structureList.pages.length)

        setPaginationList(luft);
        if (page) {
            setStructureList({
                ...structureList,
                currentPage: page,
                currentVissible: data.slice((page! - 1) * onPage, onPage * page! + 1)
            })
        }
        // return luft;
    }

    useEffect(() => {
        updatePagination()

        
    }, [structureList])

  

    return (
        <div className="pagination">
        {
            paginationList.map((page: number, index: number, list: any) => {
                const elem = (
                    <div
                        className={`pagination__item${page === structureList.currentPage ? ' selected' : ''}`}
                        onClick={(event: any) => updatePagination(page)}
                    >
                        {page}
                    </div>
                )
                if (index === 0 && page + 1 !== list[index + 1]) {
                    return (
                        <>
                            {elem}
                            <div>...</div>
                        </>
                    )
                }

                if (index === list.length - 1) {
                    console.log(index,list[list.length - 2] , page);

                }

                

                if (index === list.length - 1 && list[list.length - 2] !== page - 1 ) {
                    return (
                        <>
                            <div>...</div>
                            {elem}
                        </>
                    )
                }
                return elem
            })
        }
        </div>
    )
}

interface cardListInterface {
    phoneList: phoneCardInterface[]
}

const PhoneCardList: React.FC<cardListInterface> = ({ phoneList }) => {
    const [list, setList] = useState([]);
    const [structureList, setStructureList] = useState<any>({
        onPage: 16,
        currentPage: 1,
        pages: [],
        data: [],
        currentVissible: [],
        loaded: false
    })

    const test = (arr: any) => {
        setList(arr)
        setStructureList({
            onPage: 5,
            currentPage: 1,
            pages: Array.from(Array(Math.ceil(arr.length / 5)).keys(), (_, i) => i + 1),
            data: arr,
            currentVissible: arr.slice(0, 5),
            loaded: true
        })
    }

    useEffect(() => {
        if (phoneList.length) {
            const arrEmpty = new Array();
            arrEmpty.length = 100;
            arrEmpty.fill(phoneList[0]);
            test(arrEmpty)
        }
    }, [phoneList])

    const handlePageStructure = (event: any) => {
        const { onPage, data } = structureList;
        setStructureList({
            ...structureList,
            onPage: event.target.value,
            pages: Array.from(Array(Math.ceil(data.length / event.target.value)), (_, i) => i + 1),
            currentVissible: data.slice(0, event.target.value),
            currentPage: 1,
        })
    }

    return (
        <div className="phone-card__list">
            <div>
                <select value={structureList.onPage} onChange={handlePageStructure}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option selected value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={99}>99</option>
                </select>
            </div>
            <div className="xxx">
                <Pagination structureList={structureList} setStructureList={setStructureList} />
            </div>
            {
                structureList.currentVissible.map((phone: any) => <PhoneCardItem phone={phone} />)
            }
        </div>
    )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCardList)