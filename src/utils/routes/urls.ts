const PREFIX = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  STAFF: "/staff",
};

export const routes = {
  login: `${PREFIX.AUTH}/login`,
  register: `${PREFIX.AUTH}/register`,
  resetPassword: `${PREFIX.AUTH}/reset-password`,
  changePassword: `${PREFIX.AUTH}/change-password`,
  magic: `/magic`,

  dashboard: `${PREFIX.DASHBOARD}`,
  policies: `${PREFIX.DASHBOARD}/policies`,
  support: `${PREFIX.DASHBOARD}/support`,
  profile: `${PREFIX.DASHBOARD}/profile`,
  contribution: `${PREFIX.DASHBOARD}/contribution`,
};

export const publicRoutes = () => [
  routes.login,
  routes.register,
  routes.resetPassword,
  routes.changePassword,
  routes.magic,
];
