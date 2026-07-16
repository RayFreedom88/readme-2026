export const LIKE_TAG = 'Likes';

export const LikeExceptionMessage = {
  PostNotFound: 'Post not found',
  AlreadyLiked: 'Post is already liked by this user',
} as const;

export const LikeResponseDescription = {
  LikeCreated: 'The post has been successfully liked.',
  LikesFound: 'Likes have been successfully found.',
  PostNotFound: 'Post not found',
  AlreadyLiked: 'Post is already liked by this user',
} as const;

export const LikePropertyDescription = {
  Id: 'Like ID',
  PostId: 'Post ID',
  UserId: 'User ID',
  CreatedAt: 'Like creation date',
} as const;
