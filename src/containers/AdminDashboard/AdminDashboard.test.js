import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard, mapStateToProps } from './';
jest.mock('uuid', () => jest.fn(() => 1));

describe('AdminDashboard', () => {
  let wrapper;
  let mockMentors = [
    {
      name: 'Casey',
      identity_preference: [
        'female-identifying',
        'LGBTQ+'
      ],
      stack_preference: 'Front-End',
      meeting_location: 'Denver'
    },
    {
      name: 'Alex',
      identity_preference: [
        'male-identifying'
      ],
      stack_preference: 'Back-End',
      meeting_location: 'Remote'
    }
  ]
  let mockMentor = {
    name: 'Casey',
    identity_preference: [
      'female-identifying'
    ],
    stack_preference: 'Front-End',
    meeting_location: 'Denver'
  }
  let mockFilters = {
    backEnd: false,
    female: false,
    frontEnd: false,
    lgbtq: true,
    male: false,
    parent: false,
    veteran: false
  }

  let mockCards = [
    { 
      props: {
        mentor: {
          name: 'Casey',
          identity_preference: [
            'female-identifying',
            'LGBTQ+'
          ],
          stack_preference: 'Front-End',
          meeting_location: 'Denver'
        }
      }
    },
    { 
      props: {
        mentor: {
          name: 'Alex',
          identity_preference: [
            'male-identifying'
          ],
          stack_preference: 'Back-End',
          meeting_location: 'Remote'
        }
      }
    }
  ]
  
  beforeEach(() => {
    wrapper = shallow(<AdminDashboard  mentors={mockMentors} mentorFilters={mockFilters} />)
  });

  it('matches the snapshot without modalInfo', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with modalInfo', () => {
    wrapper = shallow(<AdminDashboard  modalInfo ={mockMentor} mentors={mockMentors} mentorFilters={mockFilters} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with searchTerms', () => {
    wrapper = shallow(<AdminDashboard  searchTerm ='blarg' mentors={mockMentors} mentorFilters={mockFilters} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with showingAllMentors filter toggled on', () => {
    wrapper = shallow(<AdminDashboard  showingAllMentors={true} mentors={mockMentors} mentorFilters={mockFilters} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with showingAllMentors filter toggled off', () => {
    wrapper = shallow(<AdminDashboard  showingAllMentors={false} mentors={mockMentors} mentorFilters={mockFilters} />)

    expect(wrapper).toMatchSnapshot();
  });

  describe('filterBySearchTerm function', () => {
    it('should filter the mentors from props', () => {
      wrapper = shallow(<AdminDashboard  searchTerm={'Alex'} mentors={mockMentors} mentorFilters={mockFilters} />)
      const expected = [ 
        {
          name: 'Alex',
          identity_preference: [
            'male-identifying'
          ],
          stack_preference: 'Back-End',
          meeting_location: 'Remote'
        }
      ]
      let result = wrapper.instance().filterBySearchTerm()
      expect(result).toEqual(expected)
    });
  });

  describe('filterByLocale', () => {
    it('should return only accounts with Denver as the locale', () => {
      wrapper = shallow(<AdminDashboard mentors={mockMentors} mentorFilters={mockFilters} locale={'Denver'} />)
      const expected = [
        {
          props: {
            mentor: {
              name: 'Casey',
              identity_preference: [
                'female-identifying',
                'LGBTQ+'
              ],
              stack_preference: 'Front-End',
              meeting_location: 'Denver'
            }
          }
        }
      ]  
      let result = wrapper.instance().filterByLocale(mockCards)
      expect(result).toEqual(expected)
    });

    it('should return only accounts with Remote as the locale', () => {
      wrapper = shallow(<AdminDashboard mentors={mockMentors} mentorFilters={mockFilters} locale={'Remote'} />)
      const expected = [
        {
          props: {
            mentor: {
              name: 'Alex',
              identity_preference: [
                'male-identifying'
              ],
              stack_preference: 'Back-End',
              meeting_location: 'Remote'
            }
          }
        }
      ]  
      let result = wrapper.instance().filterByLocale(mockCards)
      expect(result).toEqual(expected)
    });
  });

  describe('filterByPreference function', () => {
    it('should call the checkPrefs function with the correct params', () => {
      let spy = jest.spyOn(wrapper.instance(), 'checkPrefs')

      wrapper.instance().filterByPreference(mockCards)
      expect(spy).toHaveBeenCalledWith(mockCards[0], ['lgbtq'])
      expect(spy).toHaveBeenCalledWith(mockCards[1], ['lgbtq'])
    });

    it('should return the card that matches the preference filter', () => {
      let expected = [
        { 
          props: {
            mentor: {
              name: 'Casey',
              identity_preference: [
                'female-identifying',
                'LGBTQ+'
              ],
              stack_preference: 'Front-End',
              meeting_location: 'Denver'
            }
          }
        }
      ]

      const result = wrapper.instance().filterByPreference(mockCards)
      expect(result).toEqual(expected)
    });
  });

  describe('cleanPrefs function', () => {
    it('should clean LGBTQ+ string', () => {
      let expected = 'lgbtq'

      const result = wrapper.instance().cleanPrefs('LGBTQ+')
      expect(result).toEqual(expected)
    });

    it('should clean Female-Identifying string', () => {
      let expected = 'female'

      const result = wrapper.instance().cleanPrefs('Female-Identifying')
      expect(result).toEqual(expected)
    });
    
    it('should clean Male-Identifying string', () => {
      let expected = 'male'

      const result = wrapper.instance().cleanPrefs('Male-Identifying')
      expect(result).toEqual(expected)
    });
    
    it('should clean Front-End string', () => {
      let expected = 'frontEnd'

      const result = wrapper.instance().cleanPrefs('Front-End')
      expect(result).toEqual(expected)
    });
    
    it('should clean Back-End string', () => {
      let expected = 'backEnd'

      const result = wrapper.instance().cleanPrefs('Back-End')
      expect(result).toEqual(expected)
    });
    
    it('should clean SuCcEsS string', () => {
      let expected = 'success'

      const result = wrapper.instance().cleanPrefs('SuCcEsS')
      expect(result).toEqual(expected)
    });
  });
});

describe('mapStateToProps function', () => {
  it('should return an object with mentors, modalInfo, showingAllMentors filter, isEditable boolean, and searchTerm filter', () => {
    const mockState = {
      modalInfo: { name: 'Leslie Knope', preferences: { title: 'waffles' } },
      mentors: [ { name: 'Ron Swanson', preferences: { title: 'steak' } } ],
      showingAllMentors: true,
      searchTerm: 'Les',
      isEditable: false,
      somethingElse: 'B-B-B-BOOYAH!'
    }
    const expected = {
      modalInfo: { name: 'Leslie Knope', preferences: { title: 'waffles' } },
      mentors: [ { name: 'Ron Swanson', preferences: { title: 'steak' } } ],
      showingAllMentors: true,
      searchTerm: 'Les',
      isEditable: false
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });
});