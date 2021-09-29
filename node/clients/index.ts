import { IOClients } from '@vtex/api'

import ABtest from './abtest'

export class Clients extends IOClients {
  public get abtest() {
    return this.getOrSet('abtest', ABtest)
  }
}
