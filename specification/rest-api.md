# REST API — дерево маршрутов

Базовый префикс: `/api`

Обозначения: `✓` — реализовано, `○` — запланировано

```
/api
│
├── auth                              # User Service
│   ├── POST   /register          ✓
│   ├── POST   /login             ✓
│   ├── GET    /:id               ✓
│   ├── POST   /logout            ○
│   └── POST   /change-password   ○
│
├── users                             # User Service
│   ├── GET    /:id               ○
│   ├── POST   /:id/subscribe     ○
│   └── DELETE /:id/subscribe     ○
│
├── posts                             # Blog Service
│   ├── GET    /                  ✓
│   ├── POST   /                  ✓
│   ├── GET    /drafts            ✓
│   ├── GET    /:id               ✓
│   ├── PATCH  /:id               ✓
│   ├── DELETE /:id               ✓
│   ├── POST   /:id/repost        ✓
│   │
│   ├── /:postId/comments
│   │   ├── GET    /              ✓
│   │   ├── POST   /              ✓
│   │   └── DELETE /:commentId    ✓
│   │
│   └── /:postId/likes
│       ├── GET    /              ✓
│       ├── POST   /              ✓
│       └── DELETE /              ✓
│
├── comments                          # Blog Service
│   └── DELETE /:id               ○
│
├── feed                              # Blog Service
│   └── GET    /                  ○
│
├── search                            # Blog Service
│   └── GET    /?title=           ○
│
└── files                             # File Vault Service
    ├── POST   /upload            ○
    ├── GET    /:id               ○
    └── DELETE /:id               ○
```

> `api-gateway` проксирует те же маршруты для фронта (JWT + агрегация) — отдельных ресурсов не добавляет.
