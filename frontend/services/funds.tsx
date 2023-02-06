import { fetchAuth } from "./auth";
import { parseResponse } from './utils';

export const getFunds = () => fetchAuth('/api/funds').then(parseResponse);

export const getFund = ({ fundId }: { fundId: string }) => (
  fetchAuth(`/api/funds/${fundId}`).then(parseResponse)
);

export const subscribe = ({ id }: { id: string }) => (
  fetchAuth(`/api/funds/${id}/`, { method: 'POST' }).then(parseResponse)
);

export default {
  getFunds,
  getFund,
  subscribe,
}
