// Any sirve para ignorar el tipo
let nombre: any = 'Mauricio'
// Debido a que se ignoro el tipo se le puede asignar un numero
nombre = 31

const persona = {
  nombre: 'Mauricio',
  edad: 31
}

persona.nombre

// Validar entradas en una función 
function saludar(name: string) {
  console.log(`Hola ${name}`)
}
saludar('Pepe')

function saludarNombre({ name }: { name: string }) {
  console.log(`Hola ${name}`)
}
saludarNombre({ name: 'Pepe' })

function saludarNombreEdad({ name, age }: { name: string, age: number }) {
  console.log(`Hola ${name}, tienes ${age} años`)
}
saludarNombreEdad({ name: 'Pepe', age: 31 })

// Otra forma
function saludarNombreEdad2(persona: { name: string, age: number }) {
  const { name, age } = persona
  console.log(`Hola ${name}, tienes ${age} años`)
}

// Retorno de una función => function nombreFunción () :tipoDato {}
function saludarRetorno({ name, age }: { name: string, age: number }): number {
  console.log(`Hola ${name}, tienes ${age} años`)
  return age;
}

// Función que retorna una función con arrow function
// Se usa void para decir que no retorna nada
const saludarDesdeFuncion = (fn: (name: string) => void) => {
  fn('Mauricio')
}

const saludarFunction = ((name: string) => {
  console.log(`Hola ${name}`)
})

saludarDesdeFuncion(saludarFunction)

// Tipar arrow function 
const sumar = (a: number, b: number): number => {
  return a + b
}

const restar: (a: number, b: number) => number = (a, b) => {
  return a - b
}

// never: para funciones que nunca van a devolver algo (funciones sin return)
// A diferencia de void que permite devolver algo 
function throwError(): never {
  throw new Error('Error')
}

// Template union types
type HeroID = `${string}-${string}-${string}-${string}-${string}`

type HeroBasicInput = {
  name: string,
  age: number
}

// Type alias
type HeroProperties = {
  // readonly: una vez asignado un id esta no se puede modificar
  readonly id?: HeroID // propiedad opcional(?): si esta es de tipo bolean pero si no esta esta bien
  isActive?: boolean
  powerScale?: HeroPowerScale
}

// Intersection types: fusiona 2 types para crear un nuevo type
type Hero = HeroBasicInput & HeroProperties

// Accediendo a una parte del type
type newHeroProperties = {
  powerScale: HeroPowerScale
  addres: {
    planet: string,
    city: string
  }
}
const addresHero: newHeroProperties['addres'] = {
  planet: 'Mars',
  city: 'Mars City'
}

const hero: HeroBasicInput = {
  name: 'Batman',
  age: 40
}

function createHero(hero: HeroBasicInput): Hero {
  const { name, age } = hero
  return { id: crypto.randomUUID(), name, age, isActive: true }
}

const batman = createHero(hero)
console.log(batman.isActive) // -> true
batman.id?.toString()

// Mas ejemplos de template union types
type Hexadecimal = `#${string}`
const color: Hexadecimal = '#0033ff'

// Union Types
// Puede ser una de las escalas de poderes
type HeroPowerScale = 'local' | 'planetary' | 'galactic' | 'universalt' | 'multiversal'
const propertiesHero: HeroProperties = {
  powerScale: 'local'
}
propertiesHero.powerScale = 'galactic'

// Puede ser un boleano (true/false) o un número
const enableAnimationDuration: boolean | number = 200 // 200ms

// Typeof: en typeScript crea un type desde una constante
const address = {
  planet: 'Tierra',
  city: 'Santiago'
}
type Address = typeof address
const addressTwitch: Address = {
  planet: 'Saturno',
  city: 'Ciudad de Saturno'
}

// ReturnType: devuelve el tipo de una función
function createAddress() {
  return {
    planet: 'Marte',
    city: 'Ciudad de Marte'
  }
}
type AddresFromFunction = ReturnType<typeof createAddress>

// Arrays
// 2 formas de tipear arrays
const lenguages1: Array<string> = []
const lenguages2: string[] = []
// Array de string ó números
const lenguages: (string | number)[] = []
lenguages.push('JavaScript')
lenguages.push(2022)

// Matrices y tuplas(array con limite fijado)
// Ejemplo de tupla: array de largo 3 ya que siempre recibe 3 valores
type RGB = [number, number, number]
const colorRGB: RGB = [255, 0, 0]

// Ejemplo con el juego del gato
type CellValue = 'X' | 'O' | ''
type GameBoard = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
]
const gameBoard: GameBoard = [
  ['X', 'O', 'X'],
  ['O', 'X', 'O'],
  ['X', 'O', 'X']
]

// Enums: enumeraciones para colecciones de datos finitas 
// Ejemplo: tipos de errores, días de la semana, mese del año

enum ERROR_TYPES {
  NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN
}

function mostrarMensaje(tipoDeError) {
  if (tipoDeError === ERROR_TYPES.NOT_FOUND) {
    console.log('No se encontró el recurso');
  } else if (tipoDeError === ERROR_TYPES.UNAUTHORIZED) {
    console.log('No tiene permisos para acceder');
  } else if (tipoDeError === ERROR_TYPES.FORBIDDEN) {
    console.log('No tiene permisos para acceder');
  }
}

// Aserciones de tipos: nos permite asegurar que un valor es de un tipo específico
const canvas = document.getElementById('canvas')
if (canvas instanceof HTMLCanvasElement) {
  console.log('Es un canvas');
}

// Interfaces
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  quantity: number
}
interface Zapatilla extends Producto {
  talla: number
}
// 2 formas de hacer interfaces de funciones
interface coarritoOps1 {
  add: (product: Producto) => void
  remove: (id: number) => void
  clear: () => void
}
interface coarritoOps2 {
  add(product: Producto): void
  remove(id: number): void
  clear(): void
}

// Narrowing: asegurarse de tener el tipo correcto
function mostrarLongitud(objeto: number | string) {
  if (typeof objeto === 'string') {
    return objeto.length
  }
  // Otra forma
  return objeto.toString().length
} 