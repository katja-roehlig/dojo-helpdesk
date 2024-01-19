//Hier erstellen wir eine API zur Route: api/auth/callback - wie in signup/page.jsx verlangt!!!
//Wir haben hier Zugriff auf das Request-Object

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import {cookies} from 'next/headers' //Die createRouteHandlerClient-Funktion läuft auf dem Server, sodass wir keinen Zugriff auf client-cookies haben, deshalb nutzen wir next und geben die cookies in die Funktion als Parameter.
import { NextResponse } from "next/server"



export async function GET(request){
    const url = new URL(request.url)
    const code = url.searchParams.get('code') //Hier bekommen wir Zugriff auf den Code, der den User verifiziert hat und speichern es in der Variablen code!


    //Kommunikation mit Supabase über die bereitgestelle createRouteHandlerClient-Function, weil wir uns nicht in einer Client Componente befinden, sondern in einem route-Handler!
if(code){
    const supabase = createRouteHandlerClient({cookies})
    await supabase.auth.exchangeCodeForSession(code)
}
//Wenn ich den Code von supabase habe, redirecte ich meine Seite zur base-Seite: url.origin(lokal= localhost, in Produktion was anderes!)
return NextResponse.redirect(url.origin)

}