export const DEMO_USERS = [
  { name: "Alex", email: "alex@example.com" },
  { name: "Sam", email: "sam@example.com" },
  { name: "Jordan", email: "jordan@example.com" },
] as const;

export const DEFAULT_DEMO_USER_EMAIL = DEMO_USERS[0].email;
export const CURRENT_USER_COOKIE = "ajaia-demo-user";
