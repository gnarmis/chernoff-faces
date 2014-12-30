var norm = require('../../lib/client/normalize.js');

describe("min()", function() {
  it("handles naturals", function() {
    expect(norm.min([5,2,3])).toEqual(2);
  });
  it("handles negative numbers", function() {
    expect(norm.min([-2,-10])).toEqual(-10);
  });
  it("handles numbers-as-strings", function() {
    expect(norm.min(['5','2','3'])).toEqual(2);
  });
});

describe("max()", function() {
  it("handles naturals", function() {
    expect(norm.max([5,2,3])).toEqual(5);
  });
  it("handles negative numbers", function() {
    expect(norm.max([-2,-10])).toEqual(-2);
  });
  it("handles numbers-as-strings", function() {
    expect(norm.max(['5','2','3'])).toEqual(5);
  });
});

describe("count()", function() {
  it("works with simple cases", function() {
    expect(norm.count([3,2,6])).toEqual(3);
  });
});

describe("numericCompare()", function() {
  it("returns -1 if a < b", function() {
    expect(norm.numericCompare(100,201)).toEqual(-1);
  });
  it("returns 0 if a == b", function() {
    expect(norm.numericCompare(100,100)).toEqual(0);
  });
  it("returns 1 if a > b", function() {
    expect(norm.numericCompare(201,100)).toEqual(1);
  });
});

describe("numericSort()", function() {
  it("doesn't do lexicographical sorting", function() {
    expect(norm.numericSort([-1, 1, 2, 6, 23])).
      toEqual([-1, 1, 2, 6, 23]);
  });
});

describe("normalizeRange()", function() {
  it("doesn't choke on massive variance", function() {
    expect(map('x -> Math.round(x)', norm.normalizeRange([-1000, 3, 1000, 100000]))).toEqual([1, 2, 3, 100])
  });
});
