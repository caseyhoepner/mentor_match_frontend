import React from 'react';
import { shallow } from 'enzyme';
import { Preferences, mapDispatchToProps } from './';

describe('Preferences', () => {
  let wrapper;
  let mockFunc = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(<Preferences
      changeMentorFilters={mockFunc}
    />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('toggleFE function', () => {
    it('should toggle the frontEnd boolean in state', async () => {
      expect(wrapper.state().frontEnd).toEqual(false)
      await wrapper.instance().toggleFE()
      expect(wrapper.state().frontEnd).toEqual(true)
    });

    it('should fire changeMentorFilters with the altered state as params', async () => {
      let mockAlteredState = {
        frontEnd: true,
        backEnd: false
      }

      await wrapper.instance().toggleFE()
      expect(mockFunc).toHaveBeenCalledWith(mockAlteredState)
    });
  });

  describe('toggleBE function', () => {
    it('should toggle the backEnd boolean in state', async () => {
      expect(wrapper.state().backEnd).toEqual(false)
      await wrapper.instance().toggleBE()
      expect(wrapper.state().backEnd).toEqual(true)
    });

    it('should fire changeMentorFilters with the altered state as params', async () => {
      let mockAlteredState = {
        frontEnd: false,
        backEnd: true
      }

      await wrapper.instance().toggleBE()
      expect(mockFunc).toHaveBeenCalledWith(mockAlteredState)
    });
  });
});

describe('mapDispatchToProps function', () => {
  let mockDispatch = jest.fn();
  let mappedProps;

  beforeEach(() => {
    mappedProps = mapDispatchToProps(mockDispatch)
  });

  it('should fire dispatch when changeMentorFilters is called', () => {
    mappedProps.changeMentorFilters()
    expect(mockDispatch).toHaveBeenCalled()
  });
});