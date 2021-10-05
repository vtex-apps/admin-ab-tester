export const queries = {
  getData: async (
    _: unknown,
    { key }: { key: string },
    ctx: Context
  ): Promise<any> => {
    const aux = await ctx.clients.vbase.getJSON<{ key: string }>(
      'abtesterData',
      key
    )

    return aux
  },
}

export const mutations = {
  saveData: async (
    _: unknown,
    {
      key,
      value,
    }: {
      key: string
      value: string
    },
    ctx: Context
  ): Promise<void> => {
    await ctx.clients.vbase.saveJSON('abtesterData', key, value)
  },
}
