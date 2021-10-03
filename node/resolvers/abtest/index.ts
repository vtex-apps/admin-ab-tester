export const queries = {
  getTests: async (_: unknown, __: unknown, ctx: Context): Promise<any> => {
    return await ctx.clients.abtest.getTests()
  },
}

export const mutations = {
  initialize: async (
    _: unknown,
    { workspace, proportion, hours, type }: any,
    ctx: Context
  ): Promise<any> => {
    return await ctx.clients.abtest.initialize(workspace, proportion, hours, type)
  },
}
