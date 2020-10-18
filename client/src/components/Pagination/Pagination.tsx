import React, { useState, useEffect } from 'react';

import "./Pagination.scss";

export const Pagination = ({ structureList, setStructureList, leftSpace = 2, rightSpace = 2 }: any) => {
    const [paginationList, setPaginationList] = useState<any>([]);

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



        setPaginationList(luft);
        if (page) {
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
        const {currentPage} = structureList;
        updatePagination(currentPage - 1)
    }

    const goNextPage = () => {
        const {currentPage} = structureList;
        updatePagination(currentPage + 1)
    }

    return (
        <div className="pagination">
            <div className="pagination__buttons pagination__prev-button" onClick={goPrevPage}>
                {/* <img src={edgeSlide ? "./icons/arrow.svg" : "./icons/arrow-black.svg"} alt="arrow" className="pagination__buttons-arrow pagination__buttons-arrow--prev" /> */}
                <img src={"./icons/arrow-black.svg"} alt="arrow" className="pagination__buttons-arrow pagination__buttons-arrow--prev" />
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
            <div className="pagination__buttons pagination__prev-button" onClick={goNextPage}>
                <img src={"./icons/arrow-black.svg"} alt="arrow" className="pagination__buttons-arrow pagination__buttons-arrow--next" />
            </div>
        </div>
    )
}