export type Guest = {
  name: string
  plusOne: boolean
}

// Fuente: lista de invitados completa provista por los novios (nombre y
// apellido de cada invitado principal). Reemplaza la lista anterior, que
// solo tenía apodos/nombres sueltos sin apellido.
export const guests: Guest[] = [
  { name: 'Gilberto Picado', plusOne: false },
  { name: 'Jazmin Picado', plusOne: false },
  { name: 'Olga Perez', plusOne: false },
  { name: 'Sofia Picado', plusOne: true },
  { name: 'Giovanni Tames', plusOne: true },
  { name: 'David Otarola', plusOne: true },
  { name: 'Melissa Anchia', plusOne: true },
  { name: 'Javier Badilla', plusOne: true },
  { name: 'Daniel Anchia', plusOne: true },
  { name: 'Rosa Sanchez', plusOne: false },
  { name: 'Eduardo Campos Rodriguez', plusOne: false },
  { name: 'Sebastian Marin', plusOne: false },
  { name: 'Yanira Barrera', plusOne: false },
  { name: 'Irlanda Hernandez', plusOne: true },
  { name: 'Otto Barrera', plusOne: false },
  { name: 'Joshue Venegas', plusOne: true },
  { name: 'Rosie Osorio', plusOne: false },
  { name: 'Titi', plusOne: false },
  { name: 'Adrian Noguera', plusOne: false },
  { name: 'Sonia De Orellana', plusOne: true },
  { name: 'Daniela Rojas', plusOne: false },
  { name: 'Juan Osorio', plusOne: false },
  { name: 'Ronald Rojas', plusOne: false },
  { name: 'Sonia Osorio', plusOne: false },
  { name: 'Ruben Padilla', plusOne: false },
  { name: 'Alex Alfaro', plusOne: false },
  { name: 'Monica Bermudez', plusOne: true },
  { name: 'Guido Andres Chaves', plusOne: true },
  { name: 'Viria Castro', plusOne: false },
  { name: 'Josue Romero', plusOne: false },
  { name: 'Isaac Cordero', plusOne: false },
  { name: 'Gabriela Romero', plusOne: false },
  { name: 'Eduardo Ayales', plusOne: false },
  { name: 'Nohemi', plusOne: false },
  { name: 'Lucy Mora', plusOne: false },
  { name: 'Ashley Jimenez', plusOne: false },
  { name: 'Tiff', plusOne: false },
  { name: 'Sebastian Herrera', plusOne: false },
  { name: 'Isayanna Alfaro', plusOne: true },
  { name: 'Andony Calvo', plusOne: false },
  { name: 'Donovan Chavarria', plusOne: true },
  { name: 'Yamil Picado', plusOne: false },
  { name: 'Maria Jose Fallas', plusOne: true },
  { name: 'Joshua Sosa', plusOne: false },
  { name: 'Silvia Acosta', plusOne: true },
  { name: 'Adrian Espinoza', plusOne: false },
  { name: 'Jefferson Barrantes', plusOne: false },
  { name: 'Isaac Mora', plusOne: true },
  { name: 'Gretel Gamboa', plusOne: true },
  { name: 'Andrey Alvarez', plusOne: false },
  { name: 'Alexa Liang', plusOne: false },
  { name: 'Lucia Cuevas', plusOne: true },
  { name: 'Luis Chaves', plusOne: false },
  { name: 'Cristina Martinez', plusOne: true },
  { name: 'Gineth Salas', plusOne: false },
  { name: 'Liz Liang', plusOne: true },
  { name: 'Holly Salas', plusOne: false },
  { name: 'Isabel Madrigal', plusOne: false },
  { name: 'Rolando Salas', plusOne: false },
  { name: 'Ivan Rodriguez', plusOne: true },
  { name: 'Tamara Molina', plusOne: false },
  { name: 'Marco Coto', plusOne: true },
  { name: 'Bianca Valverde', plusOne: false },
  { name: 'Abril Cruz', plusOne: false },
  { name: 'Allison Rodriguez', plusOne: false },
  { name: 'Daniela Rivera', plusOne: false },
  { name: 'Tania Carmona', plusOne: false },
  { name: 'Gabriela Jimenez', plusOne: false },
  { name: 'Fabiana Segura', plusOne: false },
  { name: 'Dayana Zambrano', plusOne: false },
  { name: 'Karol Mata', plusOne: false },
]

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[a.length][b.length]
}

// Guests rarely type their name exactly as listed (missing an accent, a
// shortened first name, a typo). This resolves loosely, but only commits to
// a match when it's unambiguous — anything uncertain falls back to the
// honor-system toggle rather than risk denying someone their +1.
export function findGuest(name: string): Guest | null {
  const target = normalize(name)
  if (!target) return null

  const exact = guests.find((g) => normalize(g.name) === target)
  if (exact) return exact

  const targetTokens = target.split(' ').filter(Boolean)
  const containment = guests.filter((g) => {
    const gTokens = normalize(g.name).split(' ').filter(Boolean)
    return (
      targetTokens.every((t) => gTokens.includes(t)) ||
      gTokens.every((t) => targetTokens.includes(t))
    )
  })
  if (containment.length === 1) return containment[0]
  if (containment.length > 1) {
    return containment.every((g) => g.plusOne === containment[0].plusOne) ? containment[0] : null
  }

  const scored = guests
    .map((g) => ({ guest: g, distance: levenshtein(target, normalize(g.name)) }))
    .sort((a, b) => a.distance - b.distance)
  const [best, second] = scored
  const threshold = Math.max(1, Math.floor(target.length * 0.3))
  if (best && best.distance <= threshold && (!second || second.distance > best.distance)) {
    return best.guest
  }

  return null
}
