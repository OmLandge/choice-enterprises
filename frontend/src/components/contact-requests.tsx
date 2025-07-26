import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '@/config'

const getContacts = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/admin/contacts`,{
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });
    if(response.status === 200) {
      return response.data;
    }else {
      return [];
    }
  }

export function ContactRequests() {
    const [contacts, setContacts] = useState<any[]>([]);
    useEffect(() => {
        getContacts().then(data => {
          setContacts(data);
        }).catch(error => {
          console.log(error);
          setContacts([]);
        })
      }, [])
    return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-3/4 max-h-[90vh] custom-scroll overflow-y-auto p-8 bg-white rounded-lg shadow-lg relative z-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Contact Requests</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {contacts.map((contact, index) => (
          <ContactRequest key={index} contact={contact} />
        ))}
      </div>
    </motion.div>
    )
}

const ContactRequest = ({contact}: {contact: any}) => {
    return (
        <div className='flex flex-col gap-2 p-4 border rounded-lg shadow-sm'>
            <p><span className='font-semibold'>ID:</span> {contact.id}</p>
            <p><span className='font-semibold'>Name:</span> {contact.name}</p>
            {contact.email && <p><span className='font-semibold'>Email:</span> {contact.email}</p>}
            {contact.phone && <p><span className='font-semibold'>Phone:</span> {contact.phone}</p>}
            <p><span className='font-semibold'>Concern:</span> {contact.concern}</p>
            <p><span className='font-semibold'>Created At:</span> {new Date(contact.createdAt).toLocaleString()}</p>
        </div>
    )
}