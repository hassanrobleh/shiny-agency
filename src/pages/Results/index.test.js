import { formatListJob } from './'

describe('the formatJobList function', () => {
  it('should add a comma to a word', () => {
    const expectedState = 'item2,'
    expect(formatListJob('item2', 3, 1)).toEqual(expectedState)
  })

  it('should not add a comma to the last element of the list', () => {
    const expectedState = 'item3'
    expect(formatListJob('item3', 3, 2)).toEqual(expectedState)
  })
})
