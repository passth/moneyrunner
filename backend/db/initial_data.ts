const USERS_PWD = process.env.USERS_PWD || "passrunner";

const initialData = {
  users: [
    {
      id: 1,
      name: "Tiago Lira",
      email: "tiago@passthrough.com",
      password: USERS_PWD,
    },
    {
      id: 2,
      name: "Alex Laplante",
      email: "alex@passthrough.com",
      password: USERS_PWD,
    },
    {
      id: 3,
      name: "Ben Doran",
      email: "ben@passthrough.com",
      password: USERS_PWD,
    },
    {
      id: 4,
      name: "Justis Midura",
      email: "justis@passthrough.com",
      password: USERS_PWD,
    },
    {
      id: 5,
      name: "Jack Manthorp",
      email: "jack@passthrough.com",
      password: USERS_PWD,
    },
    {
      id: 6,
      name: "Eva Chau",
      email: "eva@passthrough.com",
      password: USERS_PWD,
    },
    {
      id: 7,
      name: "Andrew Bezold",
      email: "andrew.bezold@passthrough.com",
      password: USERS_PWD,
    },
  ],
  funds: [
    {
      id: 1,
      name: "Fuzzy Finance SPV",
      size: "$20M",
      passthroughFundId: "0893ca8f-4955-456f-b575-21e57e6ee8cb",
      passthroughClosingId: "5a2dd6e2-62c2-4fb3-9fcb-148aea348385",
    },
    {
      id: 2,
      name: "Bull Market Ventures",
      size: "$25M",
      passthroughFundId: "1e2dfdcd-4c72-4bef-8c7e-caa974559b73",
      passthroughClosingId: "9776bce1-d1b8-481d-a4db-4935b153c68d",
    },
    {
      id: 3,
      name: "Bear Necessities Investment Group",
      size: "$30M",
      passthroughFundId: "21dee893-9d62-4141-9f96-8f5ff5049d56",
      passthroughClosingId: "547776f3-196c-4bc8-93ce-a36ddff6304d",
    },
    {
      id: 4,
      name: "Wealth Hoarders LLC",
      size: "$10M",
      passthroughFundId: "17f97084-f6eb-4e88-bba3-bff7bd0bae03",
      passthroughClosingId: "5a2f9062-b598-4bd8-88df-34c901418e3a",
    },
    {
      id: 5,
      name: "Stockpicker's Paradise SPV",
      size: "$70M",
      passthroughFundId: "8dd3b770-5a1e-4a6c-9319-8c7a19d9aefb",
      passthroughClosingId: "7470c53b-bee9-4c0a-8bf3-7d7f07ded3e0",
    },
    {
      id: 6,
      name: "Stock Market Shenanigans Investment Trust",
      size: "$100M",
      passthroughFundId: "b555dd7c-6c9d-46a7-a332-b2e18be6ca7f",
      passthroughClosingId: "736122a4-1e9a-4f15-b1b3-6be56b66566e",
    },
  ],
};

export default initialData;
