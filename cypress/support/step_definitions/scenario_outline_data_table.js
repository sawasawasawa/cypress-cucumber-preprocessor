/* global then, when */

let sum = { first: 0, second: 0, result: 0 };

when("I enter {int} and {int}", (a, b) => {
  sum = { first: a, second: b, result: a + b };
});

then("I see following result table", dataTable => {
  dataTable.hashes().forEach(row => {
    expect(sum.first).to.equal(parseInt(row.first, 10));
    expect(sum.second).to.equal(parseInt(row.second, 10));
    expect(sum.result).to.equal(parseInt(row.result, 10));
  });
});
