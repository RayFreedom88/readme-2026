export const COMMENT_TAG = 'Comments';

export const CommentPagination = {
  DefaultPage: 1,
  DefaultLimit: 50,
  MaxLimit: 50,
} as const;

export const CommentTextLength = {
  Min: 10,
  Max: 300,
} as const;

export const CommentExceptionMessage = {
  PostNotFound: 'Post not found',
  NotFound: 'Comment not found',
  Forbidden: 'Comment can be deleted only by its author',
  AuthorRequired: 'authorId is required',
  PostNotPublished: 'Comments are allowed only for published posts',
} as const;

export const CommentResponseDescription = {
  CommentCreated: 'The new comment has been successfully created.',
  CommentsFound: 'Comments have been successfully found.',
  CommentDeleted: 'Comment has been successfully deleted.',
  CommentNotFound: 'Comment not found',
  PostNotFound: 'Post not found',
  CommentForbidden: 'Comment can be deleted only by its author',
} as const;

export const CommentPropertyDescription = {
  Id: 'Comment ID',
  PostId: 'Post ID',
  AuthorId: 'Comment author ID',
  Text: 'Comment text',
  CreatedAt: 'Comment creation date',
  Page: 'Page number',
  Limit: 'Page size',
  Total: 'Total number of comments',
  Items: 'List of comments',
} as const;
