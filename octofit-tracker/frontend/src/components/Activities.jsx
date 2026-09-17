import { useEffect, useState } from 'react'
import { useApiData } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const endpoint = `${apiBaseUrl}/api/activities/`
// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/

export default function Activities() {
  const { items, loading, error } = useApiData(useEffect, useState, endpoint)
  return <section><div className="section-heading"><div><p className="eyebrow">Movement log</p><h2>Activities</h2><p>Recent training sessions across the OctoFit community.</p></div><span className="count-badge">{items.length} sessions</span></div><div className="resource-list">{loading && <p className="status">Loading activities...</p>}{error && <p className="status error">{error}</p>}{!loading && !error && items.map((activity) => <article className="resource-row" key={activity._id}><div><strong>{activity.type}</strong><span>{activity.distance ? `${activity.distance} km · ` : ''}{activity.duration} minutes</span></div><b>+{activity.points ?? 0} pts</b></article>)}</div></section>
}