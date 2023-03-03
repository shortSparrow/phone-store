import React, { FC } from "react";
import { DeviceScreenType } from "../../interfaces/appStateInterface";
import { connect } from "react-redux";
import { RootStateInterface } from "../../interfaces/rootStateInterface";
import MobileHeader from "./MobileHeader/MobileHeader";
import DesktopHeader from "./DesktopHeader/DesktopHeader";

const Header: FC<MainPageInterface> = (props) => {
  const { deviceScreen } = props;

  return (
    <header className="footer">
      {deviceScreen.value! <= 750 ? (
        <MobileHeader>{props.children}</MobileHeader>
      ) : (
        <DesktopHeader>{props.children}</DesktopHeader>
      )}
    </header>
  );
};

export interface MainPageInterface {
  children: any;
  deviceScreen: DeviceScreenType;
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
  deviceScreen: state.appState.deviceScreen,
});

// const mapDispatchToProps = (dispatch) => ({

// })

export default connect(mapStateToProps, null)(Header);
