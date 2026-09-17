import { useEffect, useState } from 'react'
import { useApiData } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const endpoint = `${apiBaseUrl}/api/teams/`
// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/

export default function Teams() {
  const { items, loading, error } = useApiData(useEffect, useState, endpoint)
  return <section><div className="section-heading"><div><p className="eyebrow">Team energy</p><h2>Teams</h2><p>Small groups, shared goals, and a little friendly pressure.</p></div><span className="count-badge">{items.length} teams</span></div><div className="team-grid">{loading && <p className="status">Loading teams...</p>}{error && <p className="status error">{error}</p>}{!loading && !error && items.map((team) => <article className="team-card" key={team._id}><span className="team-number">{String(items.indexOf(team) + 1).padStart(2, '0')}</span><h3>{team.name}</h3><p>{team.members?.length ?? 0} members</p><b>{team.points ?? 0} points</b></article>)}</div></section>
}