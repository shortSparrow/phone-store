import React from 'react';
import {Link} from 'react-router-dom'

import './SmallNavigation.scss';

interface smallNavigation {
    params: {
        title: string,
        link: string
    }[]
}

const SmallNavigation: React.FC<smallNavigation> = ({ params }) => {
    
    return (
        <div className="small-navigation">
            <Link to="/" className="small-navigation__home-link">
            <img src="/icons/Home.svg" alt="home icon" className="small-navigation__home" />
            </Link>
            {
                params.map((item, index, arr) => (
                    <div className="small-navigation__img-wrapper" key={item.title}>
                        <img src="/icons/arrow.svg" alt="greater than icon" className="small-navigation__greater-than-sign" />
                        {
                            index === arr.length - 1
                                ? <p className="small-navigation__text">{item.title}</p>
                                : <Link to={item.link} className="small-navigation__text small-navigation__link">{item.title}</Link>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default SmallNavigation;