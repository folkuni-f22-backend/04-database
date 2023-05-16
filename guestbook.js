// Övning 3.2

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { question } from 'readline-sync'

function getDb(filename, defaultData) {
	// Skapa sökväg till databasen
	const __dirname = dirname(fileURLToPath(import.meta.url))
	const file = join(__dirname, filename)
	const adapter = new JSONFile(file)
	const db = new Low(adapter, defaultData)
	return db
}
const db = getDb('guestbook.json', [])
await db.read()


menu()

async function menu() {
	console.log('\nWelcome to the guestbook! Choose an option:')
	console.log('1. Add a new name')
	console.log('2. View guestbook')
	console.log('3. Exit')

	let chosen = question('? ')

	if (chosen === '1') {
		await addName()
	}
	else if( chosen === '2' ) {
		await viewGuestbook()
	}
	else if (chosen === '3') {
		console.log('Welcome back...')
		return
	}
	// Rekursiv funktion - menu anropar sig själv
	menu()
}

async function addName() {
	// fråga efter anv. namn
	// lägg till sist i gb
	let name = question('What is your name? ')
	// Data är en array den här gången, eftersom det är så i filen
	db.data.push(name)
	// console.log('Writing to db: ', db.data)
	await db.write()
	console.log('Name saved. Thank you!')
}
async function viewGuestbook() {
	if( db.data.length === 0 ) {
		console.log('No names in guestbook :(')
		return
	}
	console.log('Viewing the guestbook:')
	db.data.forEach(name => {
		console.log('+ ' + name)
	})
}
