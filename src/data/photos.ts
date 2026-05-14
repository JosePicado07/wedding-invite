export const photos = Array.from({ length: 16 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return `/assets/photo-${n}.jpg`
})
