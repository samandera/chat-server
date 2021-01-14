import { ApolloServer, gql } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({
      resolvers: {
        Query: {
          chat(_, args, ctx, info) {
            return 'chat'
          }
        }
      },
      typeDefs: importSchema('./schema.graphql')
    })
  )
})

server.listen(8080).then(({ url, subscriptionsUrl }) => {
  console.log(`Graphql server is running at ${url}`)
  console.log(`subscriptions are ready at ${subscriptionsUrl}`)
})
