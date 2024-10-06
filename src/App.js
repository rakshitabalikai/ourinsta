
import { BrowserRouter } from 'react-router-dom';
import './App.css';
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
