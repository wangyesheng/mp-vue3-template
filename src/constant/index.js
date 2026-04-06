export const orderTypes = [
  { key: 1, label: '待施工', color: '#888' },
  { key: 2, label: '施工中', color: '#1890ff' },
  { key: 3, label: '待确认', color: '#666' },
  { key: 4, label: '已完成', color: '#22c55e' }
]

export const orderTypeMap = orderTypes.reduce((memo, current) => {
  memo[current.key] = current
  return memo
}, {})
