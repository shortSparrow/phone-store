import React from 'react';
import { connect } from 'react-redux';
import { RootStateInterface } from '../../interfaces/rootStateInterface';

const PhoneCard: React.FC = () => {
    return (
        <div className="phone-card">
            <h1>CARD</h1>
        </div>
    )
}

const mapStateToProps = (state: RootStateInterface) => ({

});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCard)