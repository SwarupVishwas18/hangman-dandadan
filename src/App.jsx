import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Index from './Index'
import Okarun from './Okarun'
import Momo from './Momo'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/hangman-dandadan/' Component={Index} />
          <Route path='/hangman-dandadan/okarun' Component={Okarun} />
          <Route path='/hangman-dandadan/momo' Component={Momo} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
