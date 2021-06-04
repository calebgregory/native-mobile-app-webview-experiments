import React from 'react'
import { useObservableState } from 'observable-hooks'
import { db, doc } from './db'
import { mutateRxdb, Test } from './features/test'

function App() {
  const value = useObservableState(db().test.findOne().sort('-id').$.pipe(doc<Test>()))

  return (
    <div>
      <button onClick={mutateRxdb}>Set value</button>
      <p>
        Value: <code>{value?.id || 'none'}</code>
      </p>
    </div>
  )
}

export default App
