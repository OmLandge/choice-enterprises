import { Key, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEffect, useState } from 'react'
interface DashboardLayoutProps {
  children: React.ReactNode
  name: string
  onLogout: () => void
  changePassword: () => void
}

export function DashboardLayout({ children, name, onLogout, changePassword }: DashboardLayoutProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')

    const [open, setOpen] = useState(false);
    

  return (
    <div className='max-w-screen-xl mx-auto'>
    <div className="min-h-screen bg-white">
      <div className="h-16 border-b bg-white flex items-center px-6">
        <div className="flex-1 flex items-center">
        
          <div className="w-16 h-16 flex items-center px-4">
              <img src="/logo.png" alt="Choice Enterprises Logo" width={50} height={50} />
          </div>
      
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip open={open}>
              <TooltipTrigger onClick={() => setOpen(!open)}>
                <Avatar>
                  <AvatarFallback className="bg-red-100 text-red-600">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <Button variant="ghost" size="sm" onClick={changePassword} className="text-gray-500 hover:text-gray-700">
                    <Key className="h-4 w-4 mr-2" />
                    Change Pass
                  </Button>
                </div>
                <div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onLogout}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <main className="p-6">{children}</main>
    </div>
    </div>
  )
}

