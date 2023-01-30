import { Routes, Route } from 'react-router-dom'
import FormData from './components/FormData';
import Responses from './components/Responses';


function App() {


  return (
  <Routes>
    <Route exact path='/' element={<FormData />} />
    <Route path='/responses' element={<Responses />} />     
  </Routes>
      
  );
}

export default App;