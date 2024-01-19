import { notFound } from 'next/navigation'


export default function NotFound() {
 notFound()
}
//notFound ist eine von next.js bereitgestellt Funktion. Der Ordner [...not-found] greift alle nicht existierenden Routen ab.
//Mit notFound wird die im Verzeichnis nächste not-found-page geladen.
