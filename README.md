frontend/
├── public/
│ └── index.html
├── src/
│ ├── assets/ # Static files (images, icons, etc.)
│ ├── components/ # Reusable UI components (Button, Modal, etc.)
│ ├── features/ # Redux slices + related components
│ │ ├── auth/
│ │ ├── projects/
│ │ ├── issues/
│ │ └── users/
│ ├── pages/ # Route-level components (Dashboard, Login, etc.)
│ ├── services/ # API calls (Axios + interceptors)
│ ├── hooks/ # Custom hooks (useAuth, usePagination, etc.)
│ ├── layouts/ # Page layouts (Sidebar + Header)
│ ├── routes/ # React Router config
│ ├── store/ # Redux store setup
│ ├── utils/ # Helper functions
│ ├── constants/ # App-wide constants
│ ├── App.tsx # Main app component
│ └── main.tsx # Vite entry point
├── .env
├── vite.config.ts
└── package.json

backend/
├── src/
│ ├── config/ # DB connection, env config
│ ├── controllers/ # Route logic (auth, projects, issues)
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routers
│ ├── middleware/ # Auth, error handling, validation
│ ├── services/ # Business logic (email, notifications)
│ ├── utils/ # Helper functions
│ ├── validations/ # Joi/Zod schemas
│ ├── app.ts # Express app setup
│ └── server.ts # Entry point
├── .env
├── tsconfig.json
└── package.json
