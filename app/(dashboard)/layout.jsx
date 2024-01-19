
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs" //Kommunikation mit Supabase in Server-Components
import {cookies} from 'next/headers'
import Navbar from "../components/Navbar"
import { redirect } from "next/navigation"

export default async function DashboardLayout({children}) {
  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession() //Hier bekomme ich die current User-Session und destrukture data!
if(!data.session){
  //useRouter kann nur in Client-Components genutzt werden. Diese hier ist eine Server-Component. Dafür wird redirect() verwendet.
  //Weil layout.jsx im Dashboard-Ordner ist, werden alle Versuche auf eine dieser Seiten zu kommen zur Login-Page umgeleitet. Sie erreichen nie den Browser!
  redirect('/login')
}

  return (
    <>
    <Navbar user={data.session.user}/> {/* User wird als Prop in Navbar gegeben */}
    {children}
    </>
  )
}
