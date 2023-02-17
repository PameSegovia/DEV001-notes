import { Routes, Route } from "react-router-dom";
import Login from './componentes/Login';
import Wall from './componentes/Wall';
import Notes from './componentes/Notes';
import NotFound from './componentes/NotFound';


function App() {


  return (
    <div className="App">
      <div>
      <Routes>
        <Route path="/" element={<Login/>} exact/>
        <Route path="/wall" element={<Wall/>} exact/>
        <Route path="/notes" element={<Notes/>} exact/>
        <Route path="/notes" element={<Notes/>} exact/>
        <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
    </div>
  )
}

export default App;