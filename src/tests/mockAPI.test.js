const mockAPIResponse = require("../server/mockAPI");

test("Should return mockAPI response correct", () => {
  expect(mockAPIResponse).toEqual({
    title: "json response",
    message: "this is a testing message",
    time: "now",
  });
});
