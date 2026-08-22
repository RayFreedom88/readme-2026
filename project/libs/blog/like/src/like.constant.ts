export const LIKE_TAG = 'Likes';

export const LikeExceptionMessage = {
  PostNotFound: 'Post not found',
  AlreadyLiked: 'Post is already liked by this user',
  NotFound: 'Like not found',
  UserRequired: 'userId is required',
  PostNotPublished: 'Likes are allowed only for published posts',
} as const;

export const LikeResponseDescription = {
  LikeCreated: 'The post has been successfully liked.',
  LikesFound: 'Likes have been successfully found.',
  LikeDeleted: 'The like has been successfully removed.',
  PostNotFound: 'Post not found',
  AlreadyLiked: 'Post is already liked by this user',
  LikeNotFound: 'Like not found',
} as const;

export const LikePropertyDescription = {
  Id: 'Like ID',
  PostId: 'Post ID',
  UserId: 'User ID',
  CreatedAt: 'Like creation date',
} as const;
