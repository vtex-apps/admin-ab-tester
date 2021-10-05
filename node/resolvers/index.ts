import {
  queries as abtestQueries,
  mutations as abtestMutations
} from './abtest'
import { queries as vbaseQueries, mutations as vbaseMutations } from './vbase'

export const resolvers = {
  Query: {
    ...abtestQueries,
    ...vbaseQueries,
  },
  Mutation: {
    ...abtestMutations,
    ...vbaseMutations,
  },
}
