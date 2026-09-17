import { useEffect, useState } from 'react'
import { useApiData } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const endpoint = `${apiBaseUrl}/api/workouts/`
// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/

export default function Workouts() {
  const { items, loading, error } = useApiData(useEffect, useState, endpoint)
  return <section><div className="section-heading"><div><p className="eyebrow">Your next move</p><h2>Workouts</h2><p>Choose a session that matches your energy today.</p></div></div><div className="workout-grid">{loading && <p className="status">Loading workouts...</p>}{error && <p className="status error">{error}</p>}{!loading && !error && items.map((workout) => <article className="workout-card" key={workout._id}><span className="pill">{workout.difficulty}</span><h3>{workout.title}</h3><p>{workout.description}</p><footer><span>{workout.type}</span><b>{workout.duration} min</b></footer></article>)}</div></section>
}