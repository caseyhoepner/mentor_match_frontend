import React from 'react';
import { shallow } from 'enzyme';
import { AdminPreferences, mapDispatchToProps } from './';

describe('AdminPreferences', () => {
  let wrapper;
  let mockFunc = jest.fn()
  
  beforeEach(() => {
    wrapper = shallow(<AdminPreferences
      changeMentorFilters={mockFunc}
    />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('toggleVeteran function', () => {
    it('should toggle the veteran boolean in state', async () => {
      expect(wrapper.state().veteran).toEqual(false)
      await wrapper.instance().toggleVeteran()
      expect(wrapper.state().veteran).toEqual(true)
    });

    it('should fire changeMentorFilters with altered state as params', async () => {
      let mockAlteredState = {
        veteran: true,
        parent: false,
        lgbtq: false,
        female: false,
        male: false,
        frontEnd: false,
        backEnd: false
      }

      await wrapper.instance().toggleVeteran()
      expect(mockFunc).toHaveBeenCalledWith(mockAlteredState)
    });
  });

  describe('toggleLgbtq function', () => {
    it('should toggle the lgtbq boolean in state', async () => {
      expect(wrapper.state().lgbtq).toEqual(false)
      await wrapper.instance().toggleLgbtq()
      expect(wrapper.state().lgbtq).toEqual(true)
    });

    it('should fire changeMentorFilters with altered state as params', async () => {
      let mockAlteredState = {
        veteran: false,
        parent: false,
        lgbtq: true,
        female: false,
        male: false,
        frontEnd: false,
        backEnd: false
      }

      await wrapper.instance().toggleLgbtq()
      expect(mockFunc).toHaveBeenCalledWith(mockAlteredState)
    });
  });

  describe('toggleParent function', () => {
    it('should toggle the parent boolean in state', async () => {
      expect(wrapper.state().parent).toEqual(false)
      await wrapper.instance().toggleParent()
      expect(wrapper.state().parent).toEqual(true)
    });

    it('should fire changeMentorFilters with altered state as params', async () => {
      let mockAlteredState = {
        veteran: false,
        parent: true,
        lgbtq: false,
        female: false,
        male: false,
        frontEnd: false,
        backEnd: false
      }

      await wrapper.instance().toggleParent()
      expect(mockFunc).toHaveBeenCalledWith(mockAlteredState)
    });
  });

  describe('toggleFemale function', () => {
    it('should toggle the female boolean in state', async () => {
      expect(wrapper.state().female).toEqual(false)
      await wrapper.instance().toggleFemale()
      expect(wrapper.state().female).toEqual(true)
    });

    it('should fire changeMentorFilters with altered state as params', async () => {
      let mockAlteredState = {
        veteran: false,
        parent: false,
        lgbtq: false,
        female: true,
        male: false,
        frontEnd: false,
        backEnd: false
      }

      await wrapper.instance().toggleFemale()
      expect(mockFunc).toHaveBeenCalledWith(mockAlteredState)
    });
  });

  describe('toggleMale function', () => {
    it('should toggle the male boolean in state', async () => {
      expect(wrapper.state().male).toEqual(false)
      await wrapper.instance().toggleMale()
      expect(wrapper.state().male).toEqual(true)
    });

    it('should fire changeMentorFilters with altered state as params', async () => {
      let mockAlteredState = {
        veteran: false,
        parent: false,
        lgbtq: false,
        female: false,
        male: true,
        frontEnd: false,
        backEnd: false
      }

      await wrapper.instance().toggleMale()
      expect(mockFunc).toHaveBeenCalledWith(mockAlteredState)
    });
  });

  describe('toggleFE function', () => {
    it('should toggle the frontEnd boolean in state', async () => {
      expect(wrapper.state().frontEnd).toEqual(false)
      await wrapper.instance().toggleFE()
      expect(wrapper.state().frontEnd).toEqual(true)
    });

    it('should fire changeMentorFilters with altered state as params', async () => {
      let mockAlteredState = {
        veteran: false,
        parent: false,
        lgbtq: false,
        female: false,
        male: false,
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

    it('should fire changeMentorFilters with altered state as params', async () => {
      let mockAlteredState = {
        veteran: false,
        parent: false,
        lgbtq: false,
        female: false,
        male: false,
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