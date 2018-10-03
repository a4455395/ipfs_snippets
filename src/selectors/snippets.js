export function selectSnippets(state) {
  return state.snippets
}

export function selectCurrentSnippet(state, id) {
  const items = state.snippets.items;
  return items.find(item => item.id === id)
}
