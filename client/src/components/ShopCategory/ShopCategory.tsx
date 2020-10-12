import React, {FC} from 'react';
import { connect } from 'react-redux';

import "./ShopCategory.scss";

const ShopCategory: FC = () => {
    return (
        <div className="shop-category__list">
            <div className="shop-category__item">
                <img src="./icons/phones-catalog-preview.jpg" alt="" className="shop-category__image"/>
                <div className="shop-category__description">
                    <p className="shop-category__title">Mobile phones</p>
                    <p className="small-text shop-category__amount">undefined</p>
                </div>
            </div>

            <div className="shop-category__item">
                <img src="./icons/tablets-category-preview.png" alt="" className="shop-category__image"/>
                <div className="shop-category__description">
                    <p className="shop-category__title">Tablets</p>
                    <p className="small-text shop-category__amount">undefined</p>
                </div>
            </div>

            <div className="shop-category__item">
                <img src="./icons/accsessories-catalog-preview.jpg" alt="" className="shop-category__image"/>
                <div className="shop-category__description">
                    <p className="shop-category__title">Accessories</p>
                    <p className="small-text shop-category__amount">undefined</p>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(ShopCategory)