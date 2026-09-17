import { useEffect, useState } from 'react'
import { useApiData } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const endpoint = `${apiBaseUrl}/api/leaderboard/`
// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/

export default function Leaderboard() {
  const { items, loading, error } = useApiData(useEffect, useState, endpoint)
  return <section><div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h2>Leaderboard</h2><p>Celebrate the consistency that keeps our teams moving.</p></div></div><div className="leaderboard-list">{loading && <p className="status">Loading leaderboard...</p>}{error && <p className="status error">{error}</p>}{!loading && !error && items.map((entry) => <article className="leaderboard-row" key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><strong>{entry.username}</strong><b>{entry.points} pts</b></article>)}</div></section>
}