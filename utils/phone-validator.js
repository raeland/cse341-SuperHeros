const twilio = require("twilio");
const { accountSid, authToken } = require("../config/twilio-config");
const client = twilio(accountSid, authToken);
async function isPhoneNumberValid(phoneNumber) {
  try {
    const data = await client.lookups.v1
      .phoneNumbers(phoneNumber)
      .fetch({ type: "carrier" });
    return data.carrier.type === "mobile";
  } catch (error) {
    // console.error(error)
    return false;
  }
}

module.exports = isPhoneNumberValid;
