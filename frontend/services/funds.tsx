import { parseResponse, getHeaders } from "./utils";

export const getFunds = () => fetch("/api/funds").then(parseResponse);

export const getFund = ({ fundId }: { fundId: string }) =>
  fetch(`/api/funds/${fundId}`).then(parseResponse);

export const subscribe = ({ fundId }: { fundId: string }) =>
  fetch(`/api/funds/${fundId}/`, { method: "POST", headers: getHeaders() }).then(parseResponse);

export const getPassthroughSession = ({ fundId }: { fundId: string }) =>
  fetch(`/api/funds/${fundId}/get-passthrough-session/`, {
    method: "POST",
    headers: getHeaders(),
  }).then(parseResponse);

export const completeSubscription = ({ fundId }: { fundId: string }) =>
  fetch(`/api/funds/${fundId}/complete/`, { method: "POST", headers: getHeaders() }).then(
    parseResponse
  );
