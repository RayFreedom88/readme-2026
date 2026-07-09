export enum PostType {
  Video = 'video',
  Text = 'text',
  Quote = 'quote',
  Photo = 'photo',
  Link = 'link',
}

export enum PostState {
  Published = 'published',
  Draft = 'draft',
}

export enum PostSorting {
  ByPublishDate = 'publish-date',
  ByLikes = 'likes',
  ByComments = 'comments',
}
