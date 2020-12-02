import React, { useState, useEffect } from 'react';

import "./Pagination.scss";
interface paginationInter {
    structureList: {
        currentPage: number,
        currentVissible: any[],
        pages: any[],
        data: any[],
        loaded: boolean,
        onPage: number
    },
    setStructureList: any,
    leftSpace: number,
    rightSpace: number
}

export const Pagination = ({ structureList, setStructureList, leftSpace = 2, rightSpace = 2 }: paginationInter) => {
    const [paginationList, setPaginationList] = useState<any>([]);
    const [limit, setLimit] = useState({
        first: true,
        last: false
    })

    const updatePagination = (page: any = null) => {
        const { data, onPage } = structureList;

        // without + 1 we recive leftSpace and rightSpace less on 1 the we get from props ;)
        let leftStep = leftSpace + 1;
        let rightStep = rightSpace + 1;

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

        // if (luft[0] !== structureList.pages.length) {
        //     luft.push(structureList.pages.length);
        // }

        luft.push(structureList.pages.length);

        if (luft[luft.length - 1] === 0 || luft[luft.length - 1] === luft[0]) {
            luft.pop()
        }

        // console.log('luft: ', luft);
        // console.log('page: ', page);




        setPaginationList(luft);
        if (page) {

            // track esge pages, and add especial style for them
            if (page === luft[luft.length - 1]) { // if current page is last
                if (luft[0] !== page) { // if last page === first page
                    setLimit({
                        last: true,
                        first: false
                    })
                } else { // if last page !== first page
                    setLimit({
                        last: true,
                        first: true
                    })
                }
            } else {
                if (luft[0] === page) { // if last page === first page
                    setLimit({
                        last: false,
                        first: true
                    })
                } else { // if last page !== first page
                    setLimit({
                        last: false,
                        first: false
                    })
                }
            }

            setStructureList({
                ...structureList,
                currentPage: page,
                currentVissible: data.slice((page! - 1) * onPage, onPage * page!)
            })
        }
    }

    useEffect(() => {
        updatePagination()
    }, [structureList])

    // console.log('paginationList: ', paginationList);

    const goPrevPage = () => {
        const { currentPage } = structureList;
        updatePagination(currentPage - 1)
    }

    const goNextPage = () => {
        // console.log('structureList: ', structureList);

        const { currentPage, pages } = structureList;
        if (Number(pages[pages.length - 1]) >= currentPage + 1) {
            updatePagination(currentPage + 1)
        }

    }

    return (
        structureList.data.length ? (
            <div className="pagination">
                <div className={`pagination__buttons pagination__prev-button ${limit.first ? 'pagination__buttons--not-active' : ''}`} onClick={goPrevPage}>
                    <img src={limit.first ? "./icons/arrow.svg" : "./icons/arrow-black.svg"} alt="arrow" className="pagination__buttons-arrow pagination__buttons-arrow--prev" />
                </div>
                {
                    paginationList.map((page: number, index: number, list: any) => {
                        const elem = (
                            <div
                                className={`small-text pagination__item ${page === structureList.currentPage ? 'pagination__item--selected' : ''}`}
                                onClick={(event: any) => updatePagination(page)}
                            >
                                {page}
                            </div>
                        )
                        if (index === 0 && page + 1 !== list[index + 1] && list.length > 1) {
                            return (
                                <>
                                    {elem}
                                    <div className="pagination__dots-wrapper">
                                        <div className="pagination__dot"></div>
                                        <div className="pagination__dot"></div>
                                        <div className="pagination__dot"></div>
                                        <div className="pagination__dot"></div>
                                    </div>
                                </>
                            )
                        }

                        if (index === list.length - 1 && list[list.length - 2] !== page - 1 && list.length > 1) {
                            return (
                                <>
                                    <div className="pagination__dots-wrapper">
                                        <div className="pagination__dot"></div>
                                        <div className="pagination__dot"></div>
                                        <div className="pagination__dot"></div>
                                        <div className="pagination__dot"></div>
                                    </div>
                                    {elem}
                                </>
                            )
                        }
                        return elem
                    })
                }
                <div className={`pagination__buttons pagination__prev-button ${limit.last ? 'pagination__buttons--not-active' : ''}`} onClick={goNextPage}>
                    <img src={limit.last ? "./icons/arrow.svg" : "./icons/arrow-black.svg"} alt="arrow" className="pagination__buttons-arrow pagination__buttons-arrow--next" />
                </div>
            </div>

        ) : null

    )
}