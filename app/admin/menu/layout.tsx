import { Navigation } from './TabLinks'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-gray-50 h-full">
      <Navigation /> 
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
