import { Navigation } from './Navigation'


export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <div className="h-full">
      <Navigation />
      {children}
    </div>

  )
}
