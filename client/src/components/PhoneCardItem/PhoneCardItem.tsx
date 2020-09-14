import React from 'react';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';

import "./PhoneCardItem.scss";
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';

interface PhoneCardInterface {
    phone: phoneCardInterface
}

const PhoneCardItem: React.FC<PhoneCardInterface> = ({ phone }) => {
    console.log(phone.price);

    return (
        <div className="phone-card">
            <div className="phone-card__image--wrapper">
                <img src={phone.availabelDevices[0].images.main} alt={phone.title} className="phone-card__image--item" />
            </div>
            <div className="phone-card__content">
                <p className="phone-card__title">{phone.title}</p>
                <div className="phone-card__price">
                    <p className="phone-card__current-price">{phone.price.current}</p>
                    <p className="phone-card__old-price">{phone.price.old}</p>
                </div>

                <div className="phone-card__line"></div>

                <div className="card-specification--list">
                    <div className="card-specification--item">
                        <div className="card-specification__name">Screen</div>
                        <div className="card-specification__value">{phone.deviceInfo.screen}</div>
                    </div>

                    <div className="card-specification--item">
                        <div className="card-specification__name">Processor</div>
                        <div className="card-specification__value">{phone.deviceInfo.processor}</div>
                    </div>

                    <div className="card-specification--item">
                        <div className="card-specification__name">Camera</div>
                        <div className="card-specification__value">{phone.deviceInfo.camera}</div>
                    </div>


                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state: RootStateInterface) => ({

});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCardItem)