import React from 'react'

import { ButtonMUI } from './components/Button/index'

function App() {

  return (
    <div>
      Hello World!
      <ButtonMUI variant="contained" size="medium" onClick={() => console.log('clicked')}>
        Kliknij mnie
      </ButtonMUI>
    </div>
  )
}

export default App
