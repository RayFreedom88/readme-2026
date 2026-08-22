import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import {
  PostState,
  PostType,
  PrismaClient,
} from '../src/generated/prisma/client';

const FIRST_TAG_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_TAG_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';
const THIRD_TAG_UUID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';
const THIRD_POST_UUID = 'c3d4e5f6-a7b8-9012-cdef-345678901234';
const FOURTH_POST_UUID = 'd4e5f6a7-b8c9-0123-defa-456789012345';
const FIFTH_POST_UUID = 'e5f6a7b8-c9d0-1234-efab-567890123456';
const SIXTH_POST_UUID = 'f6a7b8c9-d0e1-2345-fabc-678901234567';
const SEVENTH_POST_UUID = 'a7b8c9d0-e1f2-3456-abcd-789012345678';
const PHOTO_FILE_UUID = 'b8c9d0e1-f2a3-4567-bcde-890123456789';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getTags() {
  return [
    { id: FIRST_TAG_UUID, name: 'books' },
    { id: SECOND_TAG_UUID, name: 'computers' },
    { id: THIRD_TAG_UUID, name: 'quotes' },
  ];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: PostType.text,
      state: PostState.published,
      authorId: FIRST_USER_ID,
      title: 'Страшный роман Худеющий',
      announce:
        'На мой взгляд, это один из самых страшных романов Стивена Кинга.',
      text: 'Недавно прочитал страшный роман «Худеющий». История держит в напряжении до последней страницы и заставляет иначе взглянуть на привычные вещи вокруг.',
      tags: {
        connect: [{ id: FIRST_TAG_UUID }],
      },
      likesCount: 1,
      commentsCount: 0,
      likes: {
        create: [{ userId: SECOND_USER_ID }],
      },
    },
    {
      id: SECOND_POST_UUID,
      type: PostType.text,
      state: PostState.published,
      authorId: FIRST_USER_ID,
      title: 'Вы не знаете JavaScript',
      announce:
        'Полезная книга по JavaScript, которая раскрывает секреты языка и скрытые механизмы работы.',
      text: 'Секреты и тайные знания по JavaScript. Книга объясняет замыкания, прототипы, контекст вызова и другие темы, без которых сложно уверенно писать на языке.',
      tags: {
        connect: [{ id: FIRST_TAG_UUID }, { id: SECOND_TAG_UUID }],
      },
      likesCount: 1,
      commentsCount: 2,
      comments: {
        create: [
          {
            text: 'Это действительно отличная книга!',
            authorId: FIRST_USER_ID,
          },
          {
            text: 'Надо будет обязательно перечитать. Слишком много информации.',
            authorId: SECOND_USER_ID,
          },
        ],
      },
      likes: {
        create: [{ userId: FIRST_USER_ID }],
      },
    },
    {
      id: THIRD_POST_UUID,
      type: PostType.video,
      state: PostState.published,
      authorId: FIRST_USER_ID,
      title: 'Обзор книги про JavaScript',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      tags: {
        connect: [{ id: SECOND_TAG_UUID }],
      },
      likesCount: 0,
      commentsCount: 0,
    },
    {
      id: FOURTH_POST_UUID,
      type: PostType.quote,
      state: PostState.published,
      authorId: SECOND_USER_ID,
      text: 'Все мы видим мир не таким, какой он есть, а таким, какие мы сами.',
      quoteAuthor: 'Стивен Кинг',
      tags: {
        connect: [{ id: THIRD_TAG_UUID }],
      },
      likesCount: 0,
      commentsCount: 0,
    },
    {
      id: FIFTH_POST_UUID,
      type: PostType.link,
      state: PostState.published,
      authorId: SECOND_USER_ID,
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      description: 'Документация MDN по JavaScript для ежедневной работы.',
      tags: {
        connect: [{ id: SECOND_TAG_UUID }],
      },
      likesCount: 0,
      commentsCount: 0,
    },
    {
      id: SIXTH_POST_UUID,
      type: PostType.photo,
      state: PostState.published,
      authorId: FIRST_USER_ID,
      photoId: PHOTO_FILE_UUID,
      tags: {
        connect: [{ id: FIRST_TAG_UUID }],
      },
      likesCount: 0,
      commentsCount: 0,
    },
    {
      id: SEVENTH_POST_UUID,
      type: PostType.text,
      state: PostState.published,
      authorId: SECOND_USER_ID,
      isRepost: true,
      originalAuthorId: FIRST_USER_ID,
      originalPostId: FIRST_POST_UUID,
      title: 'Страшный роман Худеющий',
      announce:
        'На мой взгляд, это один из самых страшных романов Стивена Кинга.',
      text: 'Недавно прочитал страшный роман «Худеющий». История держит в напряжении до последней страницы и заставляет иначе взглянуть на привычные вещи вокруг.',
      tags: {
        connect: [{ id: FIRST_TAG_UUID }],
      },
      likesCount: 0,
      commentsCount: 0,
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = getTags();
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        name: tag.name,
      },
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: post,
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const connectionString = process.env['DATABASE_URL'];

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prismaClient = new PrismaClient({ adapter });

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
    await pool.end();
  }
}

bootstrap();
