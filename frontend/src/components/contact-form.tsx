import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BACKEND_URL } from '@/config'
import axios from 'axios'

interface ContactFormData{
  name: string
  contactMethod: 'email' | 'phone'
  email: string | null
  phone: string | null
  concern: string
}

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    contactMethod: 'email',
    email: null,
    phone: null,
    concern: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Add your form submission logic here
    const res = await axios.post(`${BACKEND_URL}/contact`, formData);
    if(res.status === 200) {
      setIsLoading(false)
      return;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg relative z-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="pl-10"
              onChange={handleChange}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preferred Contact Method</Label>
          <RadioGroup
            defaultValue="email"
            onValueChange={(value: "email" | "phone") => {
              setContactMethod(value as 'email' | 'phone');
              setFormData({ ...formData, contactMethod: value });
            }}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone">Phone</Label>
            </div>
          </RadioGroup>
        </div>

        {contactMethod === 'email' ? (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="pl-10"
                onChange={handleChange}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                required
                className="pl-10"
                onChange={handleChange}
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="concern">Concern</Label>
          <div className="relative">
            <Textarea
              id="concern"
              name="concern"
              placeholder="Describe your concern"
              required
              className="pl-10 pt-2 min-h-[100px]"
              onChange={e => setFormData({ ...formData, concern: e.target.value })}
            />
            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
        >
          {isLoading ? (
            <motion.div
              className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </motion.div>
  )
}

