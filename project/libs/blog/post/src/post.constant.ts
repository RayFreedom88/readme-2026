export const POST_TAG = 'Posts';

export const DEFAULT_POST_PAGE = 1;
export const DEFAULT_POST_LIMIT = 25;
export const MAX_POST_LIMIT = 50;

export const YOUTUBE_HOST_WHITELIST = [
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
] as const;

export const PostTitleLength = {
  Min: 20,
  Max: 50,
} as const;

export const PostAnnounceLength = {
  Min: 50,
  Max: 255,
} as const;

export const PostTextLength = {
  Min: 100,
  Max: 1024,
} as const;

export const PostQuoteTextLength = {
  Min: 20,
  Max: 300,
} as const;

export const PostQuoteAuthorLength = {
  Min: 3,
  Max: 50,
} as const;

export const PostDescriptionLength = {
  Max: 300,
} as const;

export const PostTagLimit = {
  MinLength: 3,
  MaxLength: 10,
  MaxCount: 8,
} as const;

export const TAG_PATTERN = /^[a-z][a-z0-9]{2,9}$/;

export const PostExceptionMessage = {
  NotFound: 'Post not found',
  Forbidden: 'Post can be changed only by its author',
  AuthorRequired: 'authorId is required',
  AlreadyReposted: 'Post has already been reposted by this user',
  CannotRepostRepost: 'Cannot repost a repost',
  CannotRepostDraft: 'Cannot repost a draft',
  CannotRepostOwn: 'Cannot repost your own post',
} as const;

export const PostResponseDescription = {
  PostCreated: 'The new post has been successfully created.',
  PostsFound: 'Posts have been successfully found.',
  PostFound: 'Post has been successfully found.',
  PostNotFound: 'Post not found',
  PostUpdated: 'The post has been successfully updated.',
  PostDeleted: 'The post has been successfully deleted.',
  PostReposted: 'The post has been successfully reposted.',
  PostForbidden: 'Post can be changed only by its author',
  PostConflict: 'Post has already been reposted by this user',
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
  Page: 'Page number',
  Limit: 'Page size',
  Sort: 'Sort type',
  Tag: 'Filter by tag name',
  Total: 'Total number of posts',
  Items: 'List of posts',
} as const;
