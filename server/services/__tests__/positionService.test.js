const {groupPositionByLevel} = require('../positionService');

describe('test groupPositionByLevel function', () => {
  it('should group position by level', () => {
    const mock = [
      {
        level: 1,
        name: 'Test 1-1'
      },
      {
        level: 1,
        name: 'Test 1-2'
      },
      {
        level: 2,
        name: 'Test 2-1'
      }
    ];

    const expected = {
      '1': [
        {
          level: 1,
          name: 'Test 1-1'
        },
        {
          level: 1,
          name: 'Test 1-2'
        },
      ],
      '2': [
        {
          level: 2,
          name: 'Test 2-1'
        }
      ]
    };

    expect(groupPositionByLevel(mock)).toEqual(expected);
  });

  it('should group position by level which omit all objects without level property', () => {
    const mock = [
      {
        level: 1,
        name: 'Test 1-1'
      },
      {
        name: 'Test 1-2'
      },
      {
        level: 2,
        name: 'Test 2-1'
      }
    ];

    const expected = {
      '1': [
        {
          level: 1,
          name: 'Test 1-1'
        },
      ],
      '2': [
        {
          level: 2,
          name: 'Test 2-1'
        }
      ]
    };

    expect(groupPositionByLevel(mock)).toEqual(expected);
  });

  it('should return empty object if none of items in original array containing level property', () => {
    const mock = [
      {
        name: 'Test 1-1'
      },
      {
        name: 'Test 1-2'
      },
      {
        name: 'Test 2-1'
      }
    ];

    expect(groupPositionByLevel(mock)).toEqual({});
  });
});
