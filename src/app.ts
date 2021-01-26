import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { EventResolver } from './resolvers/event.resolver';
import { mongoose } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { businessModule } from './business/business.module';
import { UserResolver } from './resolvers/user.resolver';


export const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });
container.load(businessModule);


// const app = express();
// const port = 3000;
// app.use(bodyParser.json());

// const schema = buildSchemaSync({
//   resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
// });

// const root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));

// app.listen(port, err => {
//   if (err) {
//     return console.error(err);
//   }
//   return console.log(`server is listening on ${port}`);
// });

async function main() {
  const schema = await buildSchema({
    resolvers: [EventResolver, UserResolver],
  });

  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER
    }:${process.env.MONGO_PASSWORD
    }@cluster0.7gjqv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then().catch(err => {
    console.log(err);
  });

  const server = new ApolloServer({ schema });
  await server.listen(4002);
  console.log('Server has started!');
}

main();
