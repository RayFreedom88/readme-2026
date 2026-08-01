export const COMMENT_TAG = 'Comments';

export const CommentExceptionMessage = {
  PostNotFound: 'Post not found',
  NotFound: 'Comment not found',
} as const;

export const CommentResponseDescription = {
  CommentCreated: 'The new comment has been successfully created.',
  CommentsFound: 'Comments have been successfully found.',
  CommentDeleted: 'Comment has been successfully deleted.',
  CommentNotFound: 'Comment not found',
  PostNotFound: 'Post not found',
} as const;

export const CommentPropertyDescription = {
  Id: 'Comment ID',
  PostId: 'Post ID',
  AuthorId: 'Comment author ID',
  Text: 'Comment text',
  CreatedAt: 'Comment creation date',
} as const;
