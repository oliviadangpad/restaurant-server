import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

type parentType = any;
type argType = any;
type infoType = any;

const resolvers = {
  Query: {
    info: () => `This is the API of a Machi Ramen`,
    feed: async (_parent: parentType, _args: argType, context: Context) => {
      return context.prisma.menuItem.findMany();
    },

  },
  Mutation: {
    createMenuItem: (
      _parent: parentType,
      args: argType,
      context: Context,
      info: infoType
    ) => {
      const { name, price, description } = args;
      const newMenuItem = context.prisma.menuItem.create({
        data: {
          name: name,
          description: description,
          price: price,
        },
      });
      return newMenuItem;
    },
  },
};

const fs = require("fs");
const { argsToArgsConfig } = require("graphql/type/definition");
const path = require("path");

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
