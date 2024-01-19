'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import AuthForm from "../AuthForm"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Signup() {
  const router= useRouter()
const [formerror, setFormerror]= useState('')


  const handleSubmit= async(e,email,password) => {
    e.preventDefault()
    setFormerror('')
    const supabase = createClientComponentClient() //von supabase bereitgestellte Function zur Kommunikation
    const {error} = await supabase.auth.signUp({
      email, 
      password,
      options:{emailRedirectTo:`${location.origin}/api/auth/callback`}
    })
  
    if(error){
      setFormerror(error.message)
    }

    if(!error){
router.push('/verify') //ich möchte den User auf eine Mail-Verfizierungseite leiten
    }
}
  return (
    <main>
        <h2 className="text-center">Sign up</h2>
        <AuthForm handleSubmit={handleSubmit}/>
        {formerror && (
          <div className="error">{formerror}</div>
        )}
        </main>
  )
}
