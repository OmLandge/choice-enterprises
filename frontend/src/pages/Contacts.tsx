import { ContactRequests } from '@/components/contact-requests'
import { SVGBackground } from '@/components/svg-background'

export default function Contacts() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br relative overflow-hidden">
      {/* SVG background */}
      <SVGBackground />

      <ContactRequests />
    </div>
  )
}

