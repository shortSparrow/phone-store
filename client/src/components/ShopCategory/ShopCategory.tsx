import React, { FC } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { DeviceCountType } from "../../interfaces/appStateInterface";
import { RootStateInterface } from "../../interfaces/rootStateInterface";

import "./ShopCategory.scss";

const ShopCategory: FC<ShopCategoryInterface> = ({ deviceCount }) => {
  const history = useHistory();

  return (
    <div className="shop-category__list">
      <div className="shop-category__item">
        <img
          src="./icons/phones-catalog-preview.jpg"
          alt=""
          className="shop-category__image"
          onClick={() => history.push("/phones")}
        />
        <div className="shop-category__description">
          <p className="shop-category__title">Mobile phones</p>
          <p className="small-text shop-category__amount">
            {deviceCount.phones} models
          </p>
        </div>
      </div>

      <div className="shop-category__item">
        <img
          src="./icons/tablets-category-preview.png"
          alt=""
          className="shop-category__image"
          onClick={() => history.push("/tablets")}
        />
        <div className="shop-category__description">
          <p className="shop-category__title">Tablets</p>
          <p className="small-text shop-category__amount">
            {deviceCount.tablets} models
          </p>
        </div>
      </div>

      <div className="shop-category__item">
        <img
          src="./icons/accsessories-catalog-preview.jpg"
          alt=""
          className="shop-category__image"
          onClick={() => history.push("/accessories")}
        />
        <div className="shop-category__description">
          <p className="shop-category__title">Accessories</p>
          <p className="small-text shop-category__amount">
            {" "}
            {deviceCount.accessories} models
          </p>
        </div>
      </div>
    </div>
  );
};

interface ShopCategoryInterface {
  deviceCount: DeviceCountType;
}

const mapStateToProps = (state: RootStateInterface, ownProps: any) => ({
  deviceCount: state.appState.deviceCount,
});

export default connect(mapStateToProps, null)(ShopCategory);
