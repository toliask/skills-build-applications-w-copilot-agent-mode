import { useEffect, useState } from 'react'
import { useApiData } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const endpoint = `${apiBaseUrl}/api/users/`
// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/

export default function Users() {
  const { items, loading, error } = useApiData(useEffect, useState, endpoint)
  return <ResourcePage title="Users" description="Students building consistent movement habits." items={items} loading={loading} error={error} renderItem={(user) => <article className="resource-row" key={user._id}><div><strong>{user.name || user.username}</strong><span>{user.email}</span></div><b>{user.points ?? 0} pts</b></article>} />
}

function ResourcePage({ title, description, items, loading, error, renderItem }) {
  return <section><div className="section-heading"><div><p className="eyebrow">Community</p><h2>{title}</h2><p>{description}</p></div><span className="count-badge">{items.length} records</span></div><div className="resource-list">{loading && <p className="status">Loading {title.toLowerCase()}...</p>}{error && <p className="status error">{error}. Check that the API is running on port 8000.</p>}{!loading && !error && items.length === 0 && <p className="status">No records found.</p>}{items.map(renderItem)}</div></section>
}