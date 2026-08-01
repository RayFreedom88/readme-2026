export const POST_TAG = 'Posts';

export const PostExceptionMessage = {
  NotFound: 'Post not found',
} as const;

export const PostResponseDescription = {
  PostCreated: 'The new post has been successfully created.',
  PostsFound: 'Posts have been successfully found.',
  PostFound: 'Post has been successfully found.',
  PostNotFound: 'Post not found',
} as const;

export const PostPropertyDescription = {
  Id: 'Post ID',
  Type: 'Post type',
  State: 'Post state',
  AuthorId: 'Post author ID',
  Tags: 'Post tags',
  PublishedAt: 'Post publish date',
  IsRepost: 'Whether the post is a repost',
  OriginalAuthorId: 'Original author ID for a repost',
  OriginalPostId: 'Original post ID for a repost',
  LikesCount: 'Number of likes',
  CommentsCount: 'Number of comments',
  CreatedAt: 'Post creation date',
  Title: 'Post title',
  Announce: 'Post announce',
  Text: 'Post text',
  VideoUrl: 'Video URL',
  PhotoId: 'Photo identifier',
  Url: 'Link URL',
  Description: 'Link description',
  QuoteAuthor: 'Quote author',
} as const;
