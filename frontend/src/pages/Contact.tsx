import { ContactForm } from '@/components/contact-form'
import { SVGBackground } from '@/components/svg-background'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br relative overflow-hidden">
      {/* SVG background */}
      <SVGBackground />

      <ContactForm />
    </div>
  )
}

