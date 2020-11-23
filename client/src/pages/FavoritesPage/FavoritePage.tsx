import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import GoBack from '../../components/GoBack/GoBack';
import Header from '../../components/Header/Header';
import DeviceCardList from '../../components/DeviceCardList/DeviceCardList';
import SmallNavigation from '../../components/SmallNavigation/SmallNavigation';
import { RootStateInterface } from '../../interfaces/rootStateInterface';

import './FavoritePage.scss';

interface FavoritePage {
    favoriteDevices: any[]
}

const FavoritePage: FC<FavoritePage> = ({ favoriteDevices }) => {
    return (
        <div className="favorite-page page">
            <Header />

            <div className="main-limit">
                {
                    <SmallNavigation params={[{ title: 'Favorites', link: '/favorites' }]} />
                }
                <GoBack />
                <h1>Favorites</h1>
                <DeviceCardList deviceList={favoriteDevices} />
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    favoriteDevices: state.favoritesDevice.deviceList
})


export default connect(mapStateToProps, null)(FavoritePage)