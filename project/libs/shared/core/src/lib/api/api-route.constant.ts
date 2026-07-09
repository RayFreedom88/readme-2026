export const ApiRoute = {
  Prefix: 'api',

  Auth: {
    Root: 'auth',
    Register: 'register',
    Login: 'login',
    Logout: 'logout',
    Id: ':id',
  },

  Post: {
    Root: 'posts',
    Id: ':id',
  },

  Comment: {
    Root: 'posts/:postId/comments',
    Id: ':commentId',
  },

  Like: {
    Root: 'posts/:postId/likes',
  },
} as const;
