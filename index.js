import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Skapa sökväg till databasen
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter, {})
// {} är default data

await db.read()

console.log('Database contents:', db.data)

// { books }
db.data.books = [
	{ id: 1, title: 'Pippi Långstrump' },
	{ id: 100, title: 'Mio min Mio' }
]
db.data.books.push({ id: 101, title: 'Karlsson på taket' })

db.data.users = [
	{ name: 'David', borrowedBooks: [1, 100] },
	{ name: 'Annika', borrowedBooks: [] },
	{ name: 'Ann-Sophie', borrowedBooks: [101] }
]
// Vilka böcker har David lånat?
let davidsBookIds = db.data.users.find(user => user.name === 'David').borrowedBooks
let davidsBooks = davidsBookIds.map(bookId => db.data.books.find(book => book.id === bookId).title)

console.log('Davids böcker: ', davidsBooks)

await db.write()