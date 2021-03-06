import config from "../../config";
import { client } from "../client";
import { ISMSVerification } from "../interface/ISMSVerification";

const { verifyServiceID } = config.get("twilio");

const send = async (to: string): Promise<boolean> => {
  try {
    const response = await client.verify
      .services(verifyServiceID)
      .verifications.create({
        locale: "es",
        to,
        channel: "sms",
      });

    return response.status === "approved" || response.status === "pending";
  } catch (error) {}
};

const verify = async (to: string, code: string): Promise<boolean> => {
  try {
    const response = await client.verify
      .services(verifyServiceID)
      .verificationChecks.create({
        to,
        code,
      });

    return response.status === "approved";
  } catch (error) {}
};

const smsVerification: ISMSVerification = {
  verify,
  send,
};

export default smsVerification;
