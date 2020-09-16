import { NULL } from 'node-sass';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import PhoneCardItem from '../PhoneCardItem/PhoneCardItem';

import "./PhoneCardList.scss";

interface cardListInterface {
    phoneList: phoneCardInterface[]
}

const PhoneCardList: React.FC<cardListInterface> = ({ phoneList }) => {
    // console.log(phoneList);
    const [list, setList] = useState([]);
    const [structureList, setStructureList] = useState<any>({
        onPage: 16,
        currentPage: 1,
        pages: [],
        data: [],
        currentVissible: []
    })

    // const currentPageRef = useRef<HTMLInputElement>(null)

    const test = (arr: any) => {
        setList(arr)
        setStructureList({
            onPage: 5,
            currentPage: 1,
            pages: Array.from(Array(Math.ceil(arr.length / 5)).keys(), (_, i) => i + 1),
            data: arr,
            currentVissible: arr.slice(0, 5)
        })

        console.log(new Array(Math.ceil(arr.length / 5)));

    }

    useEffect(() => {
        if (phoneList.length) {
            const arrEmpty = new Array();
            arrEmpty.length = 100;
            arrEmpty.fill(phoneList[0]);
            test(arrEmpty)
            // console.log(phoneList);
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
    useEffect(() => {
        const visibleList = () => {
            let leftStep = 2;
            let rightStep = 2;

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
                luft.push(structureList.currentPage - leftStep + i)
                i++;
            }

            luft[0] = 1;

            luft.push(structureList.pages.length)


            return luft;
        }

        console.log(visibleList());
    }, [structureList])


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
            <div className="pagination">
                {
                    structureList.pages.map((page: number, index: number, pages: any) => {
                        if (page === 1 || page === pages.length) {
                            return (
                                <div className={`pagination__item ${page === structureList.currentPage ? ' selected' : ''}`} onClick={(event: any) => {
                                    const { data, onPage } = structureList;



                                    setStructureList({
                                        ...structureList,
                                        currentPage: page,
                                        currentVissible: data.slice((page - 1) * onPage, onPage * page + 1)
                                    })
                                }}>{page}</div>
                            )
                        }






                        // if (  structureList.currentPage !== page && ) {
                        //     return (
                        //         <div className={`pagination__item ${page === structureList.currentPage ? ' selected': ''}`} onClick={(event:any) => {
                        //             const {data, onPage} = structureList;

                        //             setStructureList({
                        //                 ...structureList,
                        //                 currentPage: page,
                        //                 currentVissible: data.slice((page-1)*onPage, onPage*page + 1)
                        //             })
                        //         }}>{page}</div>   
                        //     )
                        // }


                        if (structureList.currentPage <= 5 && page <= 5) {
                            return (
                                <div className={`pagination__item ${page === structureList.currentPage ? ' selected' : ''}`} onClick={(event: any) => {
                                    const { data, onPage } = structureList;

                                    setStructureList({
                                        ...structureList,
                                        currentPage: page,
                                        currentVissible: data.slice((page - 1) * onPage, onPage * page + 1)
                                    })
                                }}>{page}</div>
                            )
                        }

                        if (page === structureList.currentPage || page - 1 === structureList.currentPage || page + 1 == structureList.currentPage
                            || page - 2 === structureList.currentPage || page + 2 == structureList.currentPage
                            // || page - 3 === structureList.currentPage || page + 3 == structureList.currentPage
                        ) {
                            return (
                                <div className={`pagination__item ${page === structureList.currentPage ? ' selected' : ''}`} onClick={(event: any) => {
                                    const { data, onPage } = structureList;

                                    setStructureList({
                                        ...structureList,
                                        currentPage: page,
                                        currentVissible: data.slice((page - 1) * onPage, onPage * page + 1)
                                    })
                                }}>{page}</div>
                            )
                        }

                    })
                }
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