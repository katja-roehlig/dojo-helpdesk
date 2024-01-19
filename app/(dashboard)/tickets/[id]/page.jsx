import { notFound } from "next/navigation"

/* Kommt ein Parameter rein,z.B. eine ID_Seite, die nicht vorgerendert ist, was soll getan werden:
ist dynamicParams = false, gibt next eine 404-Page aus. Ist es true, fetched next die Daten nochmal, 
baut eine statische Seite und zeigt sie analyticsId. */
export const dynamicParams = true

/* Mit generateMetadata() genreriere ich eine Funktion, die mir dynamisch die Metadaten erstellt. 
In diesem Fall enthält der Titel der Seite den jeweiligen Namen des Tickets.
Über params greife ich auf die id zu, die mir dann DAS Objekt liefert, in dem der Titel enthalten ist. */

export async function generateMetadata({params}){
  const id = params.id
  const res = await fetch(`http://localhost:4000/tickets/${id}`)
  const ticket = await res.json()
  
  return{
    title: `Dojo Helpdesk | ${ticket.title}`
  }
}


/* Mit genereateStaticParams sage ich next.js, wieviele Seiten mit dynamischen Parametern
ich habe, sodass next sie schonmal serverseitig rendern kann. Next liegt quasi eine Liste dieser Seiten an.
Im lokalen Modus macht das keinen Unterschied. Die Funktion kommt erst bei build-time zum Tragen und baut die Seiten.
 */
export async function generateStaticParams(){

const res = await fetch('http://localhost:4000/tickets/')
const tickets = await res.json()
 return tickets.map((ticket) =>({id: ticket.id}))
// ergibt einen Array dieser Form: [{id:"1"}, {id: 2}, ...], returnt wird für jedes Ticket ein Objekt der Form{id: "ticket.id"}
}

async function getTicket(id){
  const res = await fetch('http://localhost:4000/tickets/'+ id, {
      next:{
          revalidate:60 //wird alle 60s neu gefetched
      }
  })
 /*  Wenn er keine Daten zur ID findet, soll eine 404-Page angezeigt werden. */
  if(!res.ok){
notFound()
  }
  return res.json()
  }

export default async function TicketDetails({params}) {
  const ticket = await getTicket(params.id)
  //Mit Params hat man Zugriff auf das Params Objekt und damit auch Zugriff auf die ID:const id = params.id


  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
      
       <h3>{ticket.title}</h3>
       <small>Created by {ticket.user_email}</small>
       <p>{ticket.body}</p>
       <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
      </div>
    </main>
  )
}
