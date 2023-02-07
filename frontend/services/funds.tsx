import { fetchAuth } from "./auth";
import { parseResponse } from './utils';

export const getFunds = () => fetchAuth('/api/funds').then(parseResponse);

export const getFund = ({ fundId }: { fundId: string }) => (
  fetchAuth(`/api/funds/${fundId}`).then(parseResponse)
);

export const subscribe = ({ fundId }: { fundId: string }) => (
  fetchAuth(`/api/funds/${fundId}/`, { method: 'POST' }).then(parseResponse)
);

export const getPassthroughSession = ({ fundId }: { fundId: string }) => (
  fetchAuth(`/api/funds/${fundId}/get-passthrough-session`, { method: 'POST' }).then(parseResponse)
);

export default {
  getFunds,
  getFund,
  subscribe,
  getPassthroughSession,
}
