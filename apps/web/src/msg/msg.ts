import { db } from '../db'

const msgCollection = {
  title: 'messages incoming from WebView host',
  version: 0,
  description: 'n/a',
  type: 'object',
  properties: {
    id: { type: 'string', primary: true },
    msg: { type: 'object' },
    at: { type: 'string' },
  },
}

export type Msg = {
  id: string
  at: string
  msg: { [key: string]: any }
}

const handleMessage = (event: MessageEvent) => {
  console.log(event)
  if (event.data && event.data.source && event.data.source.includes('react-devtools')) {
    return
  }

  const at = new Date().toISOString()
  db().msg.insert({ id: `msg-${at}`, at, msg: event.data })
}

export async function init() {
  await db().addCollections({ msg: { schema: msgCollection } })

  window.addEventListener('message', handleMessage)
}

export async function destroy() {
  window.removeEventListener('message', handleMessage)
}

export function sendMessage() {
  const at = new Date().toISOString()
  const msg = { id: `msg-${at}`, at, msg: 'sent from web-app' }

  // @ts-ignore
  window.ReactNativeWebView
    ? // @ts-ignore
      window.ReactNativeWebView.postMessage(JSON.stringify(msg))
    : console.log('This would have been sent to the host application:', { msg })
}
