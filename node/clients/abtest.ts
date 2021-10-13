import { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
export default class ABtest extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://app.io.vtex.com/vtex.ab-tester/v0`, context, {
      ...options,
    })
  }

  public async getTests() {
    const res = await this.http.getRaw(`/${this.context.account}/master/_v/private/abtesting/status`, {
      headers: {
        Authorization: `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
    return res
  }

  public async initialize(workspace: string, proportion: number, hours: number, type: string) {
    const payload = {
      "InitializingWorkspaces": workspace,
      "Proportion": proportion,
      "Hours": hours,
      "Type": type
    }
    return await this.http.postRaw(`/${this.context.account}/master/_v/private/abtesting/initialize`, payload, {
      headers: {
        Authorization: `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
  }

  public async finishTest(workspace: string) {
    return await this.http.getRaw(`/${this.context.account}/master/_v/private/abtesting/finish/${workspace}`, {
      headers: {
        Authorization: `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
  }
}
