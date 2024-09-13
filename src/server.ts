import { Server } from 'http';
import { connect, connection } from 'mongoose';
import config from './config';
import app from './app';

let server: Server;

async function main() {
  try {
    const connectionToDatabase = await connect(config.database_url as string);

    if (connectionToDatabase) console.log(`Server connected to database`);

    server = app.listen(config.port, () => {
      console.log(`ECommerce server listening on ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  if (server) server.close(() => process.exit(1));
  else process.exit(1);
});

process.on('uncaughtException', () => process.exit(1));
