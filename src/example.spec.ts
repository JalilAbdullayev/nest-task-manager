const addNumbers = (num1: number, num2: number) => num1 + num2;

describe('addNumbers', () => {
  it('adds 2 numbers', () => {
    expect(addNumbers(2, 2)).toEqual(4);
  });
});
