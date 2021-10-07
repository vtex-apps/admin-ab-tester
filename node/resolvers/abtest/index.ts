export const queries = {
  getTests: async (_: unknown, __: unknown, { clients: { abtest, vbase } }: Context
  ): Promise<any> => {
    const { data }: any = await abtest.getTests()
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
    data.forEach((item: ABTest) => item.Finish = item.WorkspaceB);

    console.log("data--", data)

    return { data: data }
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
    return await ctx.clients.abtest.initialize(workspace, proportion, hours, type)
  },
  finishTest: async (
    _: unknown,
    { workspace }: { workspace: string },
    ctx: Context
  ): Promise<string> => {
    return await ctx.clients.abtest.finishTest(workspace)
  },
}
