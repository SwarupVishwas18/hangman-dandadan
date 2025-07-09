import './App.css'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router'
import Index from './Index'
import Okarun from './Okarun'
import Momo from './Momo'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' Component={Index} />
          <Route path='/okarun' Component={Okarun} />
          <Route path='/momo' Component={Momo} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
