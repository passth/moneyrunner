import { google } from "googleapis";

type UserType = {
  email: string;
  name: string;
};

const { HOST, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const REDIRECT_URI = `${HOST}/api/auth/redirect`;
const client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);

export const generateAuthUri = () =>
  client.generateAuthUrl({
    access_type: "online",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/userinfo.email", "openid"],
  });

export const fetchUserData = async (code: string): Promise<UserType | null> => {
  const { tokens } = await client.getToken(code);

  const ticket = await client.verifyIdToken({
    idToken: String(tokens.id_token),
    audience: GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    return null;
  }

  if (!payload.email_verified) {
    return null;
  }

  return { email: String(payload.email), name: String(payload.name) };
};
