import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GoBack from '../../components/GoBack/GoBack';
import Header from '../../components/Header/Header';
import DeviceCardList from '../../components/DeviceCardList/DeviceCardList';
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation';
import { RootStateInterface } from '../../interfaces/rootStateInterface';

import './FavoritePage.scss';
import Footer from '../../components/Footer/Footer';

interface FavoritePage {
    favoriteDevices: any[]
}

const FavoritePage: FC<FavoritePage> = ({ favoriteDevices }) => {
    const [searchField, setSearchField] = useState('');
    const [favoriteDeviceList, setFavoriteDeviceList] = useState<any>([])
    const [noMathes, setNoMathces] = useState(false)


    useEffect(() => {
        setFavoriteDeviceList([...favoriteDevices].filter(device => device.title.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())))
    }, [favoriteDevices])


    const handleVisible = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSearchField(value)

        const filtered = [...favoriteDevices].filter(device => device.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
        if (filtered.length) {
            setNoMathces(false)
        } else {
            setNoMathces(true)
        }

        setFavoriteDeviceList(filtered)
    }

    return (
        <div className="favorite-page page">
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
                {
                    <SmallNavigation params={[{ title: 'Favorites', link: '/favorites' }]} />
                }
                <GoBack />
                <p className="main-title">Favorites</p>
                {
                    favoriteDeviceList.length
                        ? <DeviceCardList deviceList={favoriteDeviceList} />
                        : !noMathes && !favoriteDeviceList.length
                            ? (
                                <div className="empty-list--information">
                                    <p className="uppaercase-text" style={{ fontSize: 20, lineHeight: 'inherit' }}>
                                        You haven't added anything to your wishlist yet. When you enter some product from your wish list, it will be displayed here
                                </p>
                                </div>
                            )
                            : noMathes ? (
                                <div className="empty-list--information">
                                    <p className="uppaercase-text" style={{ fontSize: 20, lineHeight: 'inherit' }}>
                                        Doesn't find any device
                                </p>
                                </div>
                            ) : null
                }

            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    favoriteDevices: state.favoritesDevice.deviceList,
    cartDeviceList: state.cartDeviceList.deviceList
})


export default connect(mapStateToProps, null)(FavoritePage)