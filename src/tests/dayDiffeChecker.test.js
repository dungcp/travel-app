const { dayDiffCheck } = require("../client/js/dayDiffeChecker");

test("should day difference between two dates", () => {
  expect(dayDiffCheck("2024-04-22", "2024-04-23")).toBe(1);
  expect(dayDiffCheck("2024-04-22", "2024-04-24")).not.toBe(1);
});
