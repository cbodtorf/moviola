# Moviola

## Summary
Moviola is a central hub for movie fanatics, allowing users to search for films based on certain facets. Users can also take ownership of the database and update/remove films as needed.

The application is a set of micro-services including a front-end SPA and a back-end server, both with the ability to interact with our search platform of choice.

## Get Started
To run this project we will need to:

1. `yarn` to install dependencies
2. `yarn start` to run our dev servers
3. Open a browser and navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Design

A basic architecture diagram
![Diagram v1](diagram-v1.png)

## Action Items

#### Setup 
- [x] Project Planning
- [x] Basic Architecture Diagram
- [x] Scaffold Monorepo
- [x] Readme
- [ ] Update Next.js app to fit our needs
  - [ ] Remove unneeded demo oriented code
- [ ] Set up new Node app for backend
- [ ] Set up Algolia account for app
  - [ ] Index seed data

#### Feature Work
- [ ] Backend
  - [ ] Routes
    - [ ] POST - add movie to index
    - [ ] PUT - update movie in index
    - [ ] DELETE - removes movie from index
  - [ ] Error handling
  - [ ] Logging
- [ ] Frontend
  - [ ] Search Page
    - [ ] Search Component
      - [ ] Powered by Algolia
    - [ ] Results Component
    - [ ] Result Component
      - [ ] Delete action
    - [ ] Form Component
      - Update/Add actions

#### Production Readiness
- [ ] Deployment Pipeline
- [ ] Versioning
- [ ] Github files
- [ ] Benchmarks

#### Strech Goal Feature Work
- [ ] Backend
  - [ ] Users
  - [ ] Authenticated Routes
- [ ] Frontend
  - [ ] Landing Page
  - [ ] Login Page
  - [ ] Account Page
- [ ] Analytics
- [ ] Styling

## History

- This NX command was run to scaffold the project:

```sh
npx create-nx-workspace moviola \
  --appName=demo \
  --preset=next \
  --style=scss \
  --nx-cloud
```