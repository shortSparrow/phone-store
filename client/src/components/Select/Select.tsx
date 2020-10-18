import React, { FC, useEffect, useRef, useState } from 'react';
import "./Select.scss";

interface selectInterface {
    itemList: itemType[],
    defaultSelectIndex?: number,
    setSelectedItem: any,
    selectedItem: any,
    width?: number
}

type itemType = {
    title: string,
    value: string | number
}

export const Select: FC<selectInterface> = (props) => {
    const {
        itemList,
        defaultSelectIndex = 0,
        selectedItem,
        setSelectedItem,
        width = 176
    } = props;

    const [openMenu, setOpenMenu] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!selectedItem) {
            setSelectedItem(itemList[defaultSelectIndex])
        }
    }, [])

    const handleMenu = () => {
        setOpenMenu(!openMenu)
    }

    const selectItem = (item: itemType) => {
        setSelectedItem(item);
        setOpenMenu(false)
    }

    // delect click outside and close select
    useEffect(() => {
        document.addEventListener('click', (event: any) => {
            if (selectRef.current && !selectRef.current!.contains(event.target)) {
                setOpenMenu(false)
            }
        })
    }, [])

    return (
        <div className="custom-select" ref={selectRef} style={{ width: `${width}px` }}>
            <div className="custom-select__selected-field" onClick={handleMenu} style={openMenu ? { border: "1px solid #313237" } : {}}>
                <p className="buttons-text custom-select__selected-text">{selectedItem.title} </p>
                <img src={"/icons/arrow.svg"} className="custom-select__arrow" style={openMenu ? { transform: "rotate(90deg)" } : {}} />
            </div>

            {
                openMenu && (
                    <>
                        <div className="custom-select__list">
                            {
                                itemList.map(item => (
                                    <div className="custom-select__item-field" onClick={() => selectItem(item)} key={item.value}>{item.title}</div>
                                ))
                            }
                        </div>

                        {/* <div className="custom-select__overlay" onClick={() => setOpenMenu(false)}></div> */}
                    </>
                )
            }

        </div>
    )
}