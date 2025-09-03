import axios from "./axios";

// Type definitions
export type Fund = {
  id: string;
  name: string;
  data?: unknown;
};

export type Subscription = {
  id: string;
  status: string;
  investor_name: string;
  answers: {
    "subscription/commitment": string;
    "investorID/legalName": string;
  };
  documents?: Array<{
    id?: string;
    name?: string;
    title?: string;
  }>;
};

export type SubscriptionResponse = {
  subscription: Subscription;
  token: string;
};

export const getFunds = async (): Promise<Fund[]> => {
  const { data } = await axios.get("/api/funds");
  return data;
};

export const getFund = async ({ fundId }: { fundId: string }): Promise<Fund> => {
  const { data } = await axios.get(`/api/funds/${fundId}`);
  return data;
};

export const getSubscriptions = async ({ fundId }: { fundId: string }): Promise<Subscription[]> => {
  const { data } = await axios.get(`/api/funds/${fundId}/subscriptions/`);
  return data;
};

export const getSubscription = async ({
  subscriptionId,
}: {
  subscriptionId: string;
}): Promise<SubscriptionResponse> => {
  const { data } = await axios.get(`/api/subscriptions/${subscriptionId}/`);
  return data;
};

export const subscribe = async ({
  fundId,
  legalName,
}: {
  fundId: string;
  legalName?: string;
}): Promise<Subscription> => {
  const { data } = await axios.post("/api/subscriptions/", { fundId, legalName });
  return data;
};

export const getSettings = async () => {
  const { data } = await axios.get("/api/settings/");
  return data;
};

export const updateSettings = async (settings: { baseUrl?: string; apiKey?: string }) => {
  const { data } = await axios.patch("/api/settings/", settings);
  return data;
};
