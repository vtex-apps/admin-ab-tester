import {
  queries as abtestQueries,
  mutations as abtestMutations

} from './abtest'

export const resolvers = {
  Query: {
    ...abtestQueries,
  },
  Mutation: {
    ...abtestMutations
  },
}
