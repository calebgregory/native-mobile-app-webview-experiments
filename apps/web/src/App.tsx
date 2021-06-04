import React, { useEffect, useState } from 'react';

const KEY = 'item-key'

function App() {
  const [value, setValue] = useState('')

  const mutateLocalStorage = () => {
    const val = new Date().toISOString()
    setValue(val)
    localStorage.setItem(KEY, val)
  }

  useEffect(() => {
    setValue(localStorage.getItem(KEY) || '')
  }, [])

  return (
    <div>
      <button onClick={mutateLocalStorage}>Set value</button>
      <p>Value: <code>{value}</code></p>
    </div>
  )
}

export default App
