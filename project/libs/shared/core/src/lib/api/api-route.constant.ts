export const ApiRoute = {
  Prefix: 'api',

  Auth: {
    Root: 'auth',
    Register: 'register',
    Login: 'login',
    Logout: 'logout',
    Id: ':id',
  },
} as const;
