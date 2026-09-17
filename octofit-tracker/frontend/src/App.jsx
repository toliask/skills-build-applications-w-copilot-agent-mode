import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <span className="brand-mark">O</span>
          <div>
            <p className="eyebrow">Mergington High School</p>
            <h1>OctoFit Tracker</h1>
          </div>
        </div>
        <p className="header-note">Move together. Grow stronger.</p>
      </header>

      <nav className="app-nav" aria-label="Main navigation">
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
