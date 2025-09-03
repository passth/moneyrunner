import axios, { AxiosInstance } from "axios";

const LEGAL_NAME = "investorID/legalName";

/**
 * Passthrough API Client
 * @see https://dev.passthrough.com/
 *
 * @example
 * ```typescript
 * // Using environment variables
 * const client = new PassthroughClient();
 *
 * // Using explicit credentials
 * const client = new PassthroughClient('your-api-key', 'https://api.passthrough.com');
 *
 * // List all funds
 * const funds = await client.listFunds();
 * ```
 */
export class PassthroughClient {
  private instance: AxiosInstance;

  constructor(apiKey?: string, baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL || process.env.PASSTHROUGH_BASE_URL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.PASSTHROUGH_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Lists funds
   * @see /reference/#tag/Fund/operation/ListFunds
   */
  async listFunds(): Promise<Fund[]> {
    try {
      const response = await this.instance.get<PaginatedResponse<Fund>>("/funds/");
      return response.data.results;
    } catch (error) {
      throw new Error(`Failed to list funds: ${error}`);
    }
  }

  /**
   * Lists investor closings
   * @see /reference/#tag/Investor-closing/operation/ListInvestorClosings
   */
  async listInvestorClosings(fundId: string, userEmail: string): Promise<InvestorClosing[]> {
    try {
      const response = await this.instance.get<PaginatedResponse<InvestorClosing>>(
        `/funds/${fundId}/fund-closings/all/investor-closings/?email=${encodeURIComponent(
          userEmail
        )}`
      );
      return response.data.results;
    } catch (error) {
      throw new Error(`Failed to list investor closings: ${error}`);
    }
  }

  /**
   * Retrieves an investor closing
   * @see /reference/#tag/Investor-closing/operation/GetInvestorClosing
   */
  async getInvestorClosing(id: string): Promise<InvestorClosing> {
    try {
      const response = await this.instance.get<InvestorClosing>(
        `/funds/all/fund-closings/all/investor-closings/${id}/`
      );
      return response.data;
    } catch (error) {
      const { status } = error.response || {};
      throw new Error(`Failed getInvestorClosing(): status=${status}`);
    }
  }

  /**
   * Creates an investor closing with a single collaborator and generates
   * a random client reference ID.
   *
   * @see /reference/#tag/Investor-closing/operation/AddInvestorClosings
   */
  async createInvestorClosing(
    fundId: string,
    user: User,
    legalName?: string
  ): Promise<InvestorClosing> {
    try {
      const url = `/funds/${fundId}/fund-closings/default/investor-closings/`;
      const response = await this.instance.post<{ investor_closings: InvestorClosing[] }>(url, {
        investor_closings: [
          {
            investor_name: legalName || user.name,
            collaborators: [{ email: user.email }],
            answers: legalName ? { [LEGAL_NAME]: legalName } : undefined,
          },
        ],
      });
      return response.data.investor_closings[0];
    } catch (error) {
      const { status, data = {} } = error.response || {};
      throw new Error(
        `Failed createInvestorClosing(): status=${status} data=${JSON.stringify(data)}`
      );
    }
  }

  /**
   * Triggers the sending process for the investor closing, typically
   * generating and delivering subscription documents.
   *
   * @see /reference/#tag/Investor-closing/operation/SendInvestorClosings
   */
  async sendInvestorClosing(
    fundId: string,
    closingId: string,
    investorClosingId: string
  ): Promise<void> {
    try {
      const url = `/funds/${fundId}/fund-closings/${closingId}/investor-closings/send/`;
      await this.instance.post<SendInvestorClosingRequest>(url, {
        investor_closing_ids: [investorClosingId],
        send_emails: false,
      });
    } catch (error) {
      const { status, data = {} } = error.response || {};
      throw new Error(
        `Failed sendInvestorClosing(): status=${status} data=${JSON.stringify(data)}`
      );
    }
  }

  /**
   * Generates a session token that allows embedding the Passthrough interface
   * in your application for document signing and completion.
   *
   * @see /reference/#tag/Investor-closing/operation/CreateEmbeddedSession
   */
  async createEmbeddedSession(
    fundId: string,
    closingId: string,
    investorClosingId: string,
    user: User
  ): Promise<string> {
    try {
      const url =
        `/funds/${fundId}/fund-closings/${closingId}` +
        `/investor-closings/${investorClosingId}/create-session/`;
      const response = await this.instance.post<{ token: string }>(url, {
        user_email: user.email,
        user_name: user.name,
      });
      return response.data.token;
    } catch (error) {
      const { status, data = {} } = error.response || {};
      throw new Error(
        `Failed createEmbeddedSession(): status=${status} data=${JSON.stringify(data)}`
      );
    }
  }
}

export interface PaginatedResponse<T> {
  results: T[];
  next?: string;
  previous?: string;
  count: number;
}

export interface Collaborator {
  email: string;
  /** Sign-in URL for the collaborator (read-only) */
  sign_in_url?: string;
}

export interface Fund {
  id: string;
  name: string;
  /** Whether onboarding is complete and the fund is ready to invite investors */
  is_live?: boolean;
  /** Custom metadata (up to 50 key-value pairs) */
  metadata?: Record<string, string>;
}

export interface FundClosing {
  id: string;
  name: string;
  fund: {
    id: string;
  };
}

export interface InvestorClosing {
  id: string;
  status: string;
  investor_name: string;
  collaborators: Collaborator[];
  fund_closing: FundClosing;
  next_signer?: {
    email: string;
    name: string;
  };
}

export interface CreateInvestorClosingRequest {
  investor_name: string;
  collaborators: Pick<Collaborator, "email">[];
}

export interface User {
  name: string;
  email: string;
}

export interface SendInvestorClosingRequest {
  investor_closing_ids: string[];
  /** Whether to send notification emails */
  send_emails?: boolean;
}

export interface CreateEmbeddedSessionRequest {
  user_email: string;
  user_name: string;
}
