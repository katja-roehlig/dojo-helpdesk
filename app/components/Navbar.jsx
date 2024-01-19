import Image from 'next/image'
import Link from 'next/link'
import Logo from './dojo-logo.png'
import LogoutButton from './LogoutButton'

export default function Navbar({user}) {
  return (
    <nav>
      <Image 
      /* Width ist immer in px, Höhe wird, wen nicht anders angegeben auotmatisch berechnet. Qualitiy max ist 100, default~80 */
      src={Logo}
      alt="Dojo Logo"
      width={70}
      quality={100}
      placeholder='blur'/>

          <h1>Dojo Helpdesk</h1>
          <Link href="/">Dashboard</Link>
          <Link href="/tickets" className='mr-auto'>Tickets</Link>
          {user && <span>Hello, {user.email}</span>}
         <LogoutButton />
     </nav> 
  )
}
