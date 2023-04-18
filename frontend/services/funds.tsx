import axios from "./axios";

export const getFunds = () => axios.get("/api/funds");

export const getFund = ({ fundId }: { fundId: string }) => axios.get(`/api/funds/${fundId}`);

export const subscribe = ({ fundId }: { fundId: string }) => axios.post(`/api/funds/${fundId}/`);

export const getPassthroughSession = ({ fundId }: { fundId: string }) =>
  axios.post(`/api/funds/${fundId}/get-passthrough-session/`);

export const completeSubscription = ({ fundId }: { fundId: string }) =>
  axios.post(`/api/funds/${fundId}/complete/`);
