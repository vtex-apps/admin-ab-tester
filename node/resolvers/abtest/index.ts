import moment from 'moment'

export const queries = {
  getTests: async (_: unknown, __: unknown, { vtex: { logger }, clients: { abtest, vbase } }: Context
  ): Promise<any> => {
    const { data }: any = await abtest.getTests()
    logger.info({
      message: 'admin-ab-tester',
      action: 'list',
      data: data,
    })
    if (data.length) {
      for await (let element of data) {
        try {
          const extraData = await vbase.getJSON<string>('abtesterData', element.WorkspaceB)
          const parsedExtraData = JSON.parse(extraData.replace(/'/g, '"'));
          Object.entries(parsedExtraData).forEach(
            ([key, value]) => element[key] = value
          );
        } catch (err) {
          continue
        }
      }
      data.forEach((item: ABTest) => {
        item.ABTestBeginning = moment(item.ABTestBeginning).format("DD/MM/YYYY")
        item.Finish = item.WorkspaceB
      });
      return { status: 201, data: data, error: "" }
    } else {
      return { status: 404, data: [""], error: data?.response?.data?.message }
    }

  }
}

export const mutations = {
  initialize: async (
    _: unknown,
    { workspace, proportion, hours, type }: {
      workspace: string, proportion: number, hours: number, type: string
    },
    ctx: Context
  ): Promise<string> => {
    ctx.vtex.logger.info({
      message: 'admin-ab-tester',
      action: 'initialize'
    })
    return await ctx.clients.abtest.initialize(workspace, proportion, hours, type)
  },
  finishTest: async (
    _: unknown,
    { workspace }: { workspace: string },
    ctx: Context
  ): Promise<string> => {
    ctx.vtex.logger.info({
      message: 'admin-ab-tester',
      action: 'finish'
    })
    return await ctx.clients.abtest.finishTest(workspace)
  },
}
