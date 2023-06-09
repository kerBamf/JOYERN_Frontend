import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import TaskList from './pages/taskList'
import ShowTask from './pages/showTask'
import NewTask from './pages/newTask'
import EditTask from './pages/editTask'
import Rewards from './pages/rewardList'
import NewReward from './pages/newReward'
import ShowReward from './pages/showReward'
import EditReward from './pages/editReward';
import Footer from './components/footer'
import Header from './components/header'
import RegisterUser from './pages/register';
import LoginUser from './pages/login';
import Container from 'react-bootstrap/Container'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [score, setScore] = useState(0)
  const [tasksDone, setTasksDone] = useState(0)
  const [username, setUsername] = useState("")

  return (
    <div className="App">
      <div className="appContainer">
      <Container fluid="xs">
        <Header mods={{score, setScore, tasksDone, setTasksDone, currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated, username, setUsername}}/>
      <Routes>
        <Route path="/auth/register" element={<RegisterUser mods={{currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated, score, setScore, tasksDone, setTasksDone, username, setUsername}} />} />
        <Route path="/auth/login" element={<LoginUser mods={{currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated, score, setScore, tasksDone, setTasksDone, username, setUsername}} />} />
        <Route path="/" element={<TaskList mods={{isAuthenticated, currentUser, setCurrentUser, score, setScore, tasksDone, setTasksDone}} />} />
        <Route path="/task">
          <Route path="new" element={<NewTask />} />
          <Route path="edit/:id" element={<EditTask />} />
          <Route path=":id" element={<ShowTask />} />
        </Route>
        <Route path="/rewards">
          <Route path="" element={<Rewards mods={{score, setScore, currentUser, setCurrentUser, isAuthenticated}} />} />
          <Route path="new" element={<NewReward />} />
          <Route path="edit/:id" element={<EditReward />} />
          <Route path=":id" element={<ShowReward />} /> 
        </Route>
      </Routes> 
      <Footer />
      </Container>
      </div>
    </div>
  );
}

export default App;
