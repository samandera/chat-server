import { ApolloServer, gql, PubSub } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'

const pubSub = new PubSub()

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({
      resolvers: {
        Subscription: {
          messageSent: {
            subscribe: () => pubSub.asyncIterator(['CHAT_CHANNEL'])
          }
        },
        Query: {
          chat(_, args, ctx, info) {
            return 'chat'
          }
        },
        Mutation: {
          sendMessage(_, { message }, ctx, info) {
            pubSub.publish('CHAT_CHANNEL', { messageSent: message })
            return message;
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
