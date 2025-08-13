import {HashRouter as Router, Routes, Route} from "react-router-dom"
import {Home} from "./Pages/home"
import {About} from "./Pages/about"
import {Feedback} from "./Pages/feedback"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
      </Routes>
    </Router>
  )
}

export default App
