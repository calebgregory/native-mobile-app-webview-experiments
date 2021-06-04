import { db } from '../db'

const testCollection = {
  title: 'my very own database for testing',
  version: 0,
  description: 'n/a',
  type: 'object',
  properties: {
    id: { type: 'string', primary: true },
  },
}

export type Test = {
  id: string
}

export async function init() {
  await db().addCollections({
    test: { schema: testCollection },
  })
}

export const mutateRxdb = () => {
  const val = new Date().toISOString()
  console.log('attempting insert of val', val)
  db().test.insert({ id: val })
}
