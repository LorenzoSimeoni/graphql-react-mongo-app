import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { EventResolver } from './resolvers/event.resolver';
import { mongoose } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { businessModule } from './business/business.module';
import { BookingResolver } from './resolvers/booking.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';


export const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });
container.load(businessModule);

async function main() {
  const schema = await buildSchema({
    resolvers: [EventResolver, UserResolver, BookingResolver],
  });

  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER
    }:${process.env.MONGO_PASSWORD
    }@cluster0.7gjqv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then().catch(err => {
    console.log(err);
  });

  // const server = new ApolloServer({ schema });
  // await server.listen(4005);
  // Initialize the app
  const app = express();

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  app.use('*', cors());

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: 4005 }, () => {
    console.log('Apollo Server on http://localhost:4005/graphql');
  });
  console.log('Server has started!');
}

main();
