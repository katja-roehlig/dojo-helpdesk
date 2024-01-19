import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs" //Kommunikation mit Supabase in Server-Components
import {cookies} from 'next/headers'
import { redirect } from "next/navigation"



export default async function AuthLayout({children}) {


//Wenn ich eingeloggt bin und komme auf login oder signup, sollte ich wieder zum Dashboard geleitet werden!
  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

  if(data.session){
    redirect('./')
  }

  return (
    <>
    <nav>
        <h1>Doja Helpdesk</h1>
      <Link href="/signup"> Sign up</Link>
      <Link href="/login"> Log in</Link>
    </nav>
    {children}
    </>
  )
}
