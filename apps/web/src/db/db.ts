import { createRxDatabase, addRxPlugin, RxDatabase } from 'rxdb'

addRxPlugin(require('pouchdb-adapter-idb'))

let _db: RxDatabase | null = null
export function db(): RxDatabase {
  if (!_db) {
    throw new Error('db not inited')
  }
  return _db
}

export async function init() {
  const db = await createRxDatabase({
    name: 'webappdb',
    adapter: 'idb',
    multiInstance: true,
    eventReduce: false,
  })

  _db = db
}
