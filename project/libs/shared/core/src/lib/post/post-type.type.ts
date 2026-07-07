export const PostType = {
  Video: 'video',
  Text: 'text',
  Quote: 'quote',
  Photo: 'photo',
  Link: 'link',
} as const;
export type PostType = (typeof PostType)[keyof typeof PostType];

export const PostState = {
  Published: 'published',
  Draft: 'draft',
} as const;
export type PostState = (typeof PostState)[keyof typeof PostState];

export const PostSorting = {
  ByPublishDate: 'publish-date',
  ByLikes: 'likes',
  ByComments: 'comments',
} as const;
export type PostSorting = (typeof PostSorting)[keyof typeof PostSorting];
