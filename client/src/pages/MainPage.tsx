import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';

import './MainPage.scss';
import { connect } from 'react-redux';
import { RootStateInterface } from '../interfaces/rootStateInterface';



const MainPage: React.FC = (props) => {
    const [phoneList, setPhoneList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/phone-list')
            .then(response => response.json())
            .then((data: any) => {

                setPhoneList(data.phoneList)
            })
    }, [])

    return (
        <div className="main-page">
            <Header />
            {
                phoneList.map((item: any) => (
                    <div>
                        <img src={`http://localhost:5000/${item.availabelDevices.black.images.main}`} />
                    </div>
                ))
            }
            {/* <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1>
            <h1>Main Page!</h1> */}
        </div>
    )
}


const mapStateToProps = (state: RootStateInterface) => ({
    deviceScreen: state.appState.deviceScreen
})

// const mapDispatchToProps = (dispatch) => ({

// })



export default connect(mapStateToProps, null)(MainPage)