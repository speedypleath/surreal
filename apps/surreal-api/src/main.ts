import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { readFileSync } from 'fs';

const users = readFileSync('./src/users/users.graphql', 'utf8');
const projects = readFileSync('./src/projects/projects.graphql', 'utf8');

const mergedTypeDefs = mergeTypeDefs([users, projects]);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

bootstrap();
