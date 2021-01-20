import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { EventResolver } from "./resolvers/event.resolver";

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
    resolvers: [EventResolver],
  });
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}

main();
