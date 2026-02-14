// utils/formatDuration.ts
export function formatDuration(seconds: number): string {
  // Função simples e honesta: resolve 90% do que a gente precisa aqui.
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  if (h > 0) {
    // estilo “1h 05m”
    return `${h}h ${String(m).padStart(2, '0')}m`
  }

  // estilo “12:07”
  return `${m}:${String(s).padStart(2, '0')}`
}
