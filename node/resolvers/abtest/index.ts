export const queries = {
  getStatus: async (_: unknown, __: unknown, ctx: Context): Promise<any> => {
    return await ctx.clients.abtest.getStatus()
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
