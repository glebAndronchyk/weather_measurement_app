## Follow this steps to start the project
1. Clone the repo
2. run `npm i` in root directory
3. run `npm install` in root directory (`install` is important to inject all needed deps for client/server)
4. Create `.env.client` and pass all `.env` variables related to the mapbox here
5. Create `.env.server` and pass database credentials
6. run `npm run` in root directory

Each project may be run separately.

## Migration
The project is built using Postgres inheritance feature, that is not supported by Prisma. For now migration should be done manually D:
Use `server` project `package.json` for more migration commands
