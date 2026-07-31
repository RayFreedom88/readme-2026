export const AUTH_TAG = 'Authentication';

export const AuthUserExceptionMessage = {
  Exists: 'User with this email exists',
  NotFound: 'User not found',
  PasswordWrong: 'User password is wrong',
  InvalidEmail: 'Invalid email',
} as const;

export const AuthResponseDescription = {
  LoggedSuccess: 'User has been successfully logged.',
  Unauthorized: 'Unauthorized.',
  UserFound: 'User has been successfully found.',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
} as const;

export const AuthPropertyDescription = {
  Id: 'User ID',
  Email: 'User email',
  Firstname: 'User first name',
  Lastname: 'User last name',
  Password: 'User password',
  AvatarId: 'User avatar identifier',
  AccessToken: 'User access token',
  CreatedAt: 'User creation date',
} as const;
