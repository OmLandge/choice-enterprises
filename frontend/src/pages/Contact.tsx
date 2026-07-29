import { ContactForm } from '@/components/contact-form'
import { MoveBack } from '@/components/move-back'
import { SVGBackground } from '@/components/svg-background'

export default function ContactPage() {
  return (
    <div className='relative'>
      <MoveBack />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br relative overflow-hidden">
        <SVGBackground />
        <ContactForm />
      </div>
    </div>
  )
}

