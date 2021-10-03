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
      "InitializingWorkspaces": workspace,    // the workspaces that will be tested; no need to include master
      "Proportion": proportion,    // 100 times the percentage of traffic you want the master workspace to receive during the first hours of test
      "Hours": hours,    // the number of hours the test will run with the initially fixed proportion (after that, it starts to update the proportion accordingly to each workspace's performance
      "Type": type  // you can also select "revenue", in which case the ab-testing system will look at each workspace's revenue (and not conversion) when updating the traffic
    }
    const res = await this.http.postRaw(`/${this.context.account}/master/_v/private/abtesting/initialize`, payload, {
      headers: {
        Authorization: `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
    return res
  }
}
