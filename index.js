import { ApolloServer, gql } from 'apollo-server'

const server = new ApolloServer({
  resolvers: {
    Query: {
      chat(_, args, ctx, info) {
        return 'chat'
      }
    }
  },
  typeDefs: gql`
    type Query {
      chat: String
    }
  `
})

server.listen(8080).then(({ url, subscriptionsUrl }) => {
  console.log(`Graphql server is running at ${url}`)
  console.log(`subscriptions are ready at ${subscriptionsUrl}`)
})
