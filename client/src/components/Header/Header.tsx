import React, { FC } from 'react';
import { DeviceScreenType } from '../../interfaces/appStateInterface';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';
import MobileHeader from './MobileHeader/MobileHeader';
import DesktopHeader from './DesktopHeader/DesktopHeader';

const Header: FC<MainPageInterface> = (props) => {
    const { deviceScreen } = props;

    return (
        <footer className="footer">
            {
                deviceScreen.value! <= 750
                    ? <MobileHeader>{props.children}</MobileHeader>
                    : <DesktopHeader>{props.children}</DesktopHeader>
            }
        </footer>
    )
}

export interface MainPageInterface {
    deviceScreen: DeviceScreenType
}


const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
    deviceScreen: state.appState.deviceScreen
})

// const mapDispatchToProps = (dispatch) => ({

// })



export default connect(mapStateToProps, null)(Header)