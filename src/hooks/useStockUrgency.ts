export function useStockUrgency(stock: number) {
  const getUrgencyLevel = (): 'critical' | 'low' | 'normal' | null => {
    if (stock === 0) return null
    if (stock <= 2) return 'critical'
    if (stock <= 5) return 'low'
    return 'normal'
  }

  const getUrgencyMessage = (): string | null => {
    const level = getUrgencyLevel()
    if (!level || level === 'normal') return null
    
    if (level === 'critical') {
      return `Only ${stock} left in stock!`
    }
    
    if (level === 'low') {
      return `Only ${stock} left - order soon`
    }
    
    return null
  }

  const getUrgencyColor = (): string => {
    const level = getUrgencyLevel()
    if (level === 'critical') return 'text-error'
    if (level === 'low') return 'text-error'
    return 'text-secondary'
  }

  return {
    urgencyLevel: getUrgencyLevel(),
    urgencyMessage: getUrgencyMessage(),
    urgencyColor: getUrgencyColor(),
    hasUrgency: getUrgencyLevel() !== 'normal' && getUrgencyLevel() !== null,
  }
}
