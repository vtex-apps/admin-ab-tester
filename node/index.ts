import { LRUCache, Service, ParamsContext } from '@vtex/api'

import { Clients } from './clients'
import { resolvers } from './resolvers'

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },
  graphql: {
    resolvers,
  },
})
