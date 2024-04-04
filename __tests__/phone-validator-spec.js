const isPhoneNumberValid = require("../utils/phone-validator");

// Import the Twilio client
const twilio = require("twilio");

// Mock the Twilio client
jest.mock("twilio", () => {
  return jest.fn().mockImplementation(() => {
    return {
      lookups: {
        v1: {
          phoneNumbers: (phoneNumber) => {
            return {
              fetch: jest.fn().mockImplementation(() => {
                if (phoneNumber === "+15412440897") {
                  return Promise.resolve({ carrier: { type: "mobile" } });
                } else {
                  return Promise.reject({ status: 404 });
                }
              }),
            };
          },
        },
      },
    };
  });
});

// Now you can use the mocked Twilio client in your tests
// test("should return true for a valid phone number", async () => {
//   const result = await isPhoneNumberValid("+15412440897");
//   expect(result).toBe(true);
// });

describe("isPhoneNumberValid", () => {
  it("should return true for a valid phone number", async () => {
    const result = await isPhoneNumberValid("+15412440897");
    expect(result).toBe(true);
  });

  it("should return false for an invalid phone number", async () => {
    const result = await isPhoneNumberValid("123");
    expect(result).toBe(false);
  });

  it("should return false for a non-string input", async () => {
    const result = await isPhoneNumberValid(123);
    expect(result).toBe(false);
  });

  it("should return false for an empty string", async () => {
    const result = await isPhoneNumberValid("");
    expect(result).toBe(false);
  });
});
