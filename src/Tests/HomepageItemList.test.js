import React from 'react';
import {shallow} from 'enzyme';
import ItemCards from '../Components/HomePage/ItemCards';

const wrapper = shallow(<ItemCards />);

describe('HomePage Item Cards test case', () => {
    it('Tests number of rendered cards in HomePage Item cards wrapper', () => {
        expect(wrapper).toEqual(2)
    });
});