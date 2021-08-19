import { GraphQLServer, PubSub } from "graphql-yoga";
import { PrismaClient } from '@prisma/client'
import { default as typeDefs } from "./typeDefs";
import resolvers from "./resolvers";

const pubsub = new PubSub();
const prisma = new PrismaClient();

// Create a GraphQL-Yoga server
const createServer = () => {
  const server = new GraphQLServer({
    context: ({ request }) => ({
      prisma,
      pubsub,
      request,
    }),
    resolvers,
    typeDefs,
  });

  return server;
};

createServer().start();
