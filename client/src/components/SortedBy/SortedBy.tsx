import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { AppStateActionTypes } from '../../interfaces/appStateInterface';
import { phoneCardInterface } from '../../interfaces/phonesInterfaces';
import { RootState } from '../../store/reducers';

interface sortyInterface{
    sortFunc: (value: string) => void,
    dispatchFunc: (sortedLList: any, currentSort: string) => {},
    currentSort: string,
}

const SortedBy: React.FC<sortyInterface> = ({dispatchFunc, sortFunc, currentSort}) => {
    
    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const {value} = event.target;
        const sorted = sortFunc(value);

        dispatchFunc(sorted, value);
    }

    return (
        <div>
            <select value={currentSort} onChange={handleSelect}>
                <option value="newest">Newset</option>
                <option value="rich">Rict first</option>
                <option value="cheap">Cheap first</option>
                <option value="rate">Rate</option>
            </select>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    currentSort: state.phonesState.currentSort
});

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SortedBy);