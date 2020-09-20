import 'graphql-import-node';
import User from './schemas/schema.graphql';
import Post from './schemas/schema.graphql';
import Comment from './schemas/schema.graphql';
import { mergeSchemas } from '@graphql-tools/merge';
import { GraphQLSchema, DocumentNode } from 'graphql';

// export const schema: GraphQLSchema = mergeSchemas({
//   schemas: [User:, Post, Comment],
// });

// const mergedSchema = mergeSchemas({
//   schemas: [BarSchema, BazSchema],
//   typeDefs: `
//         type ExtraType {
//             foo: String
//         }
//     `,
//   resolvers: {
//     ExtraType: {
//       foo: () => 'FOO',
//     },
//   },
// });
