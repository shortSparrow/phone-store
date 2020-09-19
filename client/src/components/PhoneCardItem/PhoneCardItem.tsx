import React from 'react';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';

import "./PhoneCardItem.scss";
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';

interface PhoneCardInterface {
    phone: phoneCardInterface
}

const PhoneCardItem: React.FC<PhoneCardInterface> = ({ phone }) => {

    return (
       <>
       {
           phone.availabelDevices.map(item => (
            <div className="phone-card">
            <div className="phone-card__image--wrapper">
                <img src={item.images.main} alt={phone.title} className="phone-card__image--item" />
            </div>
            <div className="phone-card__content">
           <p className="phone-card__title">{phone.title} {item.color} {item.availableRAM[0]}</p>
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

                <div className="phone-card__button--wrapper">
                    <div className="button__add-cart--wrapper phone-card__add-cart--wrapper">
                        <div className="button__add-cart--text">Add to cart</div>
                    </div>
                    <div className="button__favorite--wrapper phone-card__favorite--wrapper">
                        <img src="icons/heart.svg" alt="favorite" className="button__favorite--icon"/>
                    </div>
                </div>

            </div>
        </div>
           ))
       }
       </>
    )
}

const mapStateToProps = (state: RootStateInterface) => ({

});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCardItem)