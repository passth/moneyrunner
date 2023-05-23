import axios from "axios";
import * as c from "crypto";

const instance = axios.create({
  baseURL: process.env.PASSTHROUGH_BASE_URL,
  headers: { Authorization: `Bearer ${process.env.PASSTHROUGH_API_KEY}` },
});

export type InvestorClosingType = {
  id: string;
  // eslint-disable-next-line camelcase
  collaborators: { sign_in_url: string }[];
};

/**
 * https://dev.passthrough.com/#operation/AddInvestorClosings
 */
export async function createInvestorClosing(
  fundId: string,
  closingId: string,
  user: { name: string; email: string }
): Promise<InvestorClosingType> {
  const url = `/funds/${fundId}/fund-closings/${closingId}/investor-closings/`;
  const response = await instance.post(url, {
    investor_closings: [
      {
        investor_name: user.name,
        collaborators: [{ email: user.email }],
        client_reference_id: `${c.randomUUID()}`,
      },
    ],
  });
  return response.data.investor_closings[0];
}

/**
 * https://dev.passthrough.com/#operation/SendInvestorClosings
 */
export function sendInvestorClosing(fundId: string, closingId: string, investorClosingId: string) {
  const url = `/funds/${fundId}/fund-closings/${closingId}/investor-closings/send/`;
  return instance.post(url, {
    investor_closing_ids: [investorClosingId],
    send_emails: false,
  });
}

/**
 * https://dev.passthrough.com/#operation/CreateEmbeddedSession
 */
export function createEmbeddedSession(
  fundId: string,
  closingId: string,
  investorClosingId: string,
  user: { name: string; email: string }
) {
  const url =
    `/funds/${fundId}/fund-closings/${closingId}` +
    `/investor-closings/${investorClosingId}/create-session/`;
  return instance.post(url, {
    user_email: user.email,
    user_name: user.name,
  });
}
