# Moviola

## Summary
Moviola is a central hub for movie fanatics, allowing users to search for films based on certain facets. Users can also take ownership of the database and update/remove films as needed.

The application is a set of micro-services including a front-end SPA and a back-end server, both with the ability to interact with our search platform of choice.

## Get Started

### Prerequisites
1. Create an Algolia Application and an Algolia Index

#### Environment
We have shared `./.env.example` file at the root with environment variables that
will be shared between the *frontend* and *backend* applications.

There is also a `./apps/backend/.env.exampple` file with sensitive environment variables specific to the backend application. We don't want to expose these to the frontend.

1. Copy each `.env.example` and rename it to `.env`
2. Set the environment variables `NX_ALGOLIA_APP_ID`, `NX_ALGOLIA_ADMIN_API_KEY`, `NX_ALGOLIA_PUBLIC_API_KEY` and `NX_ALGOLIA_INDEX_NAME` in the .env file. You can obtain those from the Algolia Dashboard.

### Local Development
To run this project we will need to:

1. `yarn` to install dependencies
2. `yarn start` to run our dev servers
3. Open a browser and navigate to `http://localhost:4200`. The app will automatically reload if you change any of the source files.
4. The backend can be accessed at `http://localhost:3333/api` or proxied through the frontend with this endpoint: `http://localhost:4200/api`.

### Production Build
There are few scripts set up depending on what you are trying to build.

| script             | env         | apps              |
|--------------------|-------------|-------------------|
| yarn build:prod    | production  | backend, frontend |
| yarn build:be:prod | production  | backend           |
| yarn build:fe:prod | production  | frontend          |


### Run production build locally
Here is how we can run these builds locally.

***Note** that the `frontend` defaults to port `3000` with a production build.

| script             | env         | apps              |
|--------------------|-------------|-------------------|
| yarn start:prod    | production  | backend, frontend |
| yarn start:be:prod | production  | backend           |
| yarn start:fe:prod | production  | frontend          |

## Design

A basic architecture diagram
![Diagram v1](diagram-v1.png)

### Backend API (v1)
- POST `/api/v1/movies` - adds movie to index

- PUT `/api/v1/movies/:id` - updates movie in index

- DELETE `/api/v1/movies/:id` - removes movie from index

## Action Items

#### Setup 
- [x] Project Planning
- [x] Basic Architecture Diagram
- [x] Scaffold Monorepo
- [x] Readme
- [x] Update Next.js app to fit our needs
  - [x] Remove unneeded demo oriented code (rename to frontend)
- [x] Set up new Node app for backend
  - [x] Set up proxy for frontend app
- [x] Set up Algolia account for app
  - [x] Index seed data

#### Feature Work
- [x] Backend
  - [x] Algolia Provider
  - [x] Routes
    - [x] POST - add movie to index
      - [x] Create route
      - [x] Connect to Algolia
    - [x] PUT - update movie in index
      - [x] Create route
      - [x] Connect to Algolia
    - [x] DELETE - removes movie from index
      - [x] Create route
     - [x] Connect to Algolia 
  - [ ] Use :uuid for PUT/DELETE url param
  - [ ] Update response to be uuid
- [ ] Frontend
  - [x] Search Page
    - [ ] Search Component
      - [ ] Styling
      - [ ] Logic/Hooks
      - [ ] Powered by Algolia
    - [ ] Results Component
      - [ ] Styling
      - [ ] Logic/Hooks
    - [ ] Result Component
      - [ ] Styling
      - [ ] Logic/Hooks
      - [ ] Delete action
    - [ ] Form Component
      - [ ] Styling
      - [ ] Logic/Hooks
      - Update/Add actions

#### Production Readiness
- [ ] Deployment Pipeline
- [x] Versioning
- [ ] Benchmarks
- [x] Healthcheck
- [x] Error catching and proper shutdown
- [x] Dedicated logger
- [ ] Swagger Docs

#### Developer Experience
- [ ] Better Readme docs
  - [ ] File structure
  - [ ] Detailed service descriptions
- [ ] Github files
- [ ] Precomit/Prepush hooks
  - [ ] Formatting
  - [ ] Linting
  - [ ] Testing

#### Strech Goal Feature Work
- [ ] Devops
  - [ ] Containerize
- [ ] Backend
  - [ ] Users
  - [ ] Authenticated Routes
- [ ] Frontend
  - [ ] Skeleton Component Loading States
  - [ ] Landing Page
  - [ ] Login Page
  - [ ] Account Page
  - [ ] SEO
  - [ ] Analytics
  - [ ] Custom Styling

## History

- This NX command was run to scaffold the project:

```sh
npx create-nx-workspace moviola \
  --appName=frontend \
  --preset=next \
  --style=scss \
  --nx-cloud
```

- This NX command was used to scaffold the backend project that configures a proxy to our frontend project:

```sh
yarn nx generate @nrwl/express:application backend --frontendProject frontend
```
* Express was removed in favor of Fastify