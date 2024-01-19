//api endpoint ist wie eine page -Seite, nur eben als api: api/tickets.
//Aber Achtung: nicht in den gleichen Ordner wie pages, das gibt Routing-Probleme!!!

import { NextResponse } from "next/server"

//einige GET-Request werden statisch gehandelt. Das Bedeutet, sie werden einmal ausgeführt und dass Ergebnis dann im Cache gespeichert. 
//Nachteil: Wenn sich der Content ändert, werden die Änderungen nicht angezeigt, da nicht neu gefetcht wird!
//mit export cnst dynamic = 'force-dynamic' werden alle request-Handler in dieser Datei dynamisch gemacht.

export const dynamic = 'force-dynamic'

export async function GET(){
    const res = await fetch('http://localhost:4000/tickets')
    const tickets= await res.json()
    return NextResponse.json(tickets, {status: 200})
}

export async function POST(request){
const ticket = await request.json()

const res = await fetch('http://localhost: 4000/tickets', {
    method: "POST",
    headers:{"Content-Type": "application.json"},
    body: JSON.stringyfy(ticket)
})
const newTicket = await res.json()
// als response wird das neue Ticket zurückgesendet!
//status 201 heißt, dass wir eine neue Ressource dazugefügt haben.
return NextResponse(newTicket, {status: 201})
}