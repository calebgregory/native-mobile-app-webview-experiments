import React from 'react'
import { useObservableState } from 'observable-hooks'
import { db, doc, docs } from './db'
import { mutateRxdb, Test } from './features/test'
import { sendMessage, Msg } from './msg'

function App() {
  const value = useObservableState(db().test.findOne().sort('-id').$.pipe(doc<Test>()))
  const messages = useObservableState(db().msg.find().sort('-id').$.pipe(docs<Msg>()))

  return (
    <div>
      <h4>Camera:</h4>
      <input type="file" accept="image/*,video/*" capture="camera" />
      <button onClick={mutateRxdb}>Set value</button>
      <p>
        Value: <code>{value?.id || 'none'}</code>
      </p>
      <button onClick={sendMessage}>Send message</button>
      <h3>Messages:</h3>
      <ol>
        {messages ? (
          messages.map(msg => <li key={msg.id}>{JSON.stringify(msg.msg)}</li>)
        ) : (
          <li>None</li>
        )}
      </ol>
    </div>
  )
}

export default App
