import React from 'react';
import { shallow } from 'enzyme';
import { MentorContainer, mapStateToProps } from './';
import { BrowserRouter } from 'react-router-dom';

describe('MentorContainer', () => {
  let wrapper;
  let mockMentors = [
    {
      name: 'Casey',
      identity_preference: [
        'female-identifying'
      ],
      stack_preference: 'Front-End',
      meeting_location: 'Remote'
    },
    {
      name: 'Alex',
      identity_preference: [
        'male-identifying'
      ],
      stack_preference: 'Back-End',
      meeting_location: 'Denver'
    }
  ]
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
            'female-identifying'
          ],
          stack_preference: 'Front-End',
          meeting_location: 'Remote'
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
          meeting_location: 'Denver'
        }
      }
    }
  ]
  
  beforeEach(() => {
    wrapper = shallow(<MentorContainer mentors={mockMentors} mentorFilters={mockFilters} />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('filterBySearchTerm function', () => {
    it('should filter the mentors array by the searchTerm', () => {
      let mockSearchTerm = 'Casey'
      let expected = [
        {
          name: 'Casey',
          identity_preference: [
            'female-identifying'
          ],
          stack_preference: 'Front-End',
          meeting_location: 'Remote'
        }
      ]
      wrapper = shallow(<MentorContainer searchTerm={mockSearchTerm} mentors={mockMentors} mentorFilters={mockFilters} />)

      let result = wrapper.instance().filterBySearchTerm()
      expect(result).toEqual(expected)
    });
  });

  describe('filterByLocale function', () => {
    it('should return mentors in Denver when the locale is set to Denver', () => {
      wrapper = shallow(<MentorContainer mentors={mockMentors} mentorFilters={mockFilters} locale={'Denver'} />)
      let mockCards = [ 
        {
          props: {
            mentor: {
              name: 'Casey',
              identity_preference: [
                'female-identifying'
              ],
              stack_preference: 'Front-End',
              meeting_location: 'Remote'
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
              meeting_location: 'Denver'
            }
          }
        }
      ]
      let expected = [
        {
          props: {
            mentor: {
              name: 'Alex',
              identity_preference: [
                'male-identifying'
              ],
              stack_preference: 'Back-End',
              meeting_location: 'Denver'
            }
          }
        }
      ]
      let result = wrapper.instance().filterByLocale(mockCards)
      expect(result).toEqual(expected)
    });

    it('should return Remote mentors when the locale is set to Remote', () => {
      wrapper = shallow(<MentorContainer mentors={mockMentors} mentorFilters={mockFilters} locale={'Remote'} />)
      let expected = [
        {
          props: {
            mentor: {
              name: 'Casey',
              identity_preference: [
                'female-identifying'
              ],
              stack_preference: 'Front-End',
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
    it('should fire the checkPrefs function with the proper params', () => {
      let spy = jest.spyOn(wrapper.instance(), 'checkPrefs')

      wrapper.instance().filterByPreference(mockCards)
      expect(spy).toHaveBeenCalledWith(mockCards[0], ['lgbtq'])
    });
  });

  describe('cleanPrefs function', () => {
    it('should clean the Front-End string', () => {
      let expected = 'frontEnd'

      let result = wrapper.instance().cleanPrefs('Front-End')
      expect(result).toEqual(expected)
    });

    it('should clean the Back-End string', () => {
      let expected = 'backEnd'

      let result = wrapper.instance().cleanPrefs('Back-End')
      expect(result).toEqual(expected)
    });

    it('should return any other string as all lowercase', () => {
      let str = 'BoOyAh'
      let expected = 'booyah'

      let result = wrapper.instance().cleanPrefs(str)
      expect(result).toEqual(expected)
    });
  });

  describe('checkPrefs function', () => {
    it('should return card if it matches the filter', () => {
      let mockFilter = ['backEnd']
      let mockCard = {
        props: {
          mentor: {
            name: 'Alex',
            identity_preference: [
              'male-identifying'
            ],
            stack_preference: 'Back-End',
            meeting_location: 'Denver'
          }
        }
      }
      let result = wrapper.instance().checkPrefs(mockCard, mockFilter)
      expect(result).toEqual(mockCard)
    });

    it('should return undefined if card does not match the filter', () => {
      let mockFilter = ['frontEnd']
      let mockCard = {
        props: {
          mentor: {
            name: 'Alex',
            identity_preference: [
              'male-identifying'
            ],
            stack_preference: 'Back-End',
            meeting_location: 'Denver'
          }
        }
      }
      let result = wrapper.instance().checkPrefs(mockCard, mockFilter)
      expect(result).toEqual(undefined)
    });
  });

  describe('makeMentorCards function', () => {
    it('should return an array of cards for each mentor fed in', () => {
      let result = wrapper.instance().makeMentorCards(mockCards)
      expect(result.length).toEqual(2)
    });
  });
});

describe('mapStateToProps function', () => {
  it('should return an object with mentors, mentorFilters, locale, searchTerm and showingAllMentors filters', () => {
    const mockState = { 
      mentors: [ { name: 'Diane Nguyen' } ],
      mentorFilters: { backEnd: true },
      locale: 'Denver', 
      searchTerm: 'skwijb',
      showingAllMentors: true,
      somethingElse: 'wooooooo' 
    }
    const expected = { 
      mentors: [ { name: 'Diane Nguyen' } ],
      mentorFilters: { backEnd: true },
      locale: 'Denver', 
      searchTerm: 'skwijb',
      showingAllMentors: true
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });
});