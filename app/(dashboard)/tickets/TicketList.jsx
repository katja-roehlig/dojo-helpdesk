import Link from "next/link"

/* Dies ist eine serverseitige Komponente. Das heißt: Die Daten werden gefetcht
und im Cache gespeichert und sind von dort aus verfügbar.
Mit Next + revalidate kann ich bestimmen, wann/wie oft die Daten neu gefetcht werden, weil sie sich ja doch ändern können. 
Angezeigt werden die neue Daten aber erst nach zweimaligen neuem Laden.*/
async function getTickets(){
const res = await fetch('http://localhost:4000/tickets', {
    next:{
        revalidate:0 //Wenn es 0 ist, werden die Daten stänig neu gefetcht, wenn ich die Seite neu lade.
    }
})
return res.json()
}

export default async function TicketList() {
    const tickets = await getTickets()
  return (
    <>
    {tickets.map((ticket) =>(
        <div key={ticket.id} className="card my-5">
          <Link href={`tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0,200)}...</p>
            <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
           {/*  Hier wird dynamisch eine 2. Klasse zugeordnet, je nachdem wie die Ticket-Priority in den Daten ist. */}
           </Link>
        </div>
    ))}
    {tickets.length ===0 && (<p>There are no open tickets, yay!</p>)}
    <button className="btn-primary">
    <Link href="tickets/create">Create a new ticket</Link></button>
    </>
  )
}
