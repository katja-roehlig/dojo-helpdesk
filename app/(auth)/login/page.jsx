//Der Parent auth-Ordner soll nicht mit in den Path. Er dient nur der Ordnung - deshalb in runden Klammern.
'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
const [loginError, setLoginError]= useState('')
const router = useRouter()


    const handleSubmit= async(e,email,password) => {
        e.preventDefault()
        setLoginError('')
        const supabase =createClientComponentClient()
        const {error} = await supabase.auth.signInWithPassword({email, password})

    if(error){
        setLoginError(error.message)
    }  
    
    if(!error){
        router.push('./')
        
    }

    }

    return (
        <main>
            <h2 className="text-center">Log in</h2>
            <AuthForm handleSubmit={handleSubmit}/>

            {loginError && (<div className="error">{loginError}</div>)}
            </main>
      )
}
