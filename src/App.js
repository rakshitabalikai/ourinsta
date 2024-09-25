
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Customeroutes from './components/pages/Customeroutes';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Customeroutes></Customeroutes>
      </BrowserRouter>
    </div>
  );
}

export default App;
