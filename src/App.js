import logo from './logo.svg';
import './App.css';
import AddUser from './Users/AddUser';
import UserList from './Users/UserList';
import {useState} from 'react'

function App() {
  const [trigger, setTrigger] = useState(0)
  return (
    <div>
      <AddUser sendData={setTrigger} trigger={trigger}/>
      <UserList trigger={trigger}/>
    </div>
  );
}

export default App;
