//alle Komponenten im app-Ordner sind per default ServerKomponenten.
//Ist jedoch Interktivität gefragt, brauchen wir eine Client-Komponente.
"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateForm() {
const router = useRouter()

const [title, setTitle] = useState('')
const [body, setBody] = useState('')
const [priority, setPriority] = useState('low')
const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const ticket = {
        title, body, priority, user_email:'mario@netninja.dev'
    }
    const res = await fetch('http://localhost:4000/tickets', {
        method:"POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(ticket)
    })

    if(res.status === 201){
        router.refresh()
        router.push('/tickets')
    }

}

  return (
   <form  onSubmit={handleSubmit} className="x-1/2">
        <label> 
            <span>Title:</span>
            <input 
                required
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}/>
            </label>

         <label >
            <span>Content:</span>
            <textarea 
            required 
            onChange={(e) => setBody(e.target.value)}
            value={body}/>
        </label>

        <label>
            <span>Priority:</span>
                <select
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}>

                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
        </label>

        <button className="btn-primary" disabled={isLoading}>
            {isLoading && <span>Adding... </span>}
            {!isLoading && <span>Add ticket </span>}
        </button>
    </form>
  )
}
