
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Customeroutes from './components/pages/Customeroutes';
// import { io } from 'socket.io-client';

// const socket=io.connect("http://localhost:5038");
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
