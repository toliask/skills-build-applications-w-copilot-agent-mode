export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  return payload?.results ?? payload?.data ?? payload?.items ?? []
}

export async function fetchItems(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return responseItems(await response.json())
}

export function useApiData(useEffect, useState, endpoint) {
  const [state, setState] = useState({ items: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchItems(endpoint)
      .then((items) => active && setState({ items, loading: false, error: '' }))
      .catch((error) => active && setState({ items: [], loading: false, error: error.message }))
    return () => { active = false }
  }, [endpoint, useEffect])

  return state
}