import { ContactRequests } from '@/components/contact-requests'
import { MoveBack } from '@/components/move-back'
import { SVGBackground } from '@/components/svg-background'

export default function Contacts() {
  return (
    <div className='relative'>
      <MoveBack />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br relative overflow-hidden">
        <SVGBackground />
        <ContactRequests />
      </div>
    </div>
  )
}

