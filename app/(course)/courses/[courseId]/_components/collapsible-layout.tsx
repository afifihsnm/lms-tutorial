'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { cn } from '@/lib/utils';

interface CollapsibleLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
}

export const CollapsibleLayout = ({ children, sidebar, navbar }: CollapsibleLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-full">
      <div className="h-[75px] fixed inset-y-0 w-full z-50">
        {navbar}
      </div>
      <div className={`hidden md:flex mt-[75px] h-full flex-col fixed inset-y-0 z-50 transition-all duration-300 ${isCollapsed ? 'w-[50px] border-r' : 'w-80 border-r'}`}>
        <div className="flex flex-col h-full">
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)} 
            variant="coursera" 
            className={cn(
              "flex items-center transition-all duration-300",
              isCollapsed && "w-[50px] pl-2 pr-1 py-1 justify-center",
              !isCollapsed && "w-36 p-6 justify-normal ml-10 mt-4 mb-2"
            )}
          >
            <Menu className='mr-2' />
            <span className={isCollapsed ? 'sr-only' : ''}>{!isCollapsed && "Hide menu"}</span>
          </Button>
          <div className={`flex-grow overflow-y-auto ${isCollapsed ? 'hidden' : 'block'}`}>
            {sidebar}
          </div>
        </div>
      </div>
      <main className={`transition-all duration-300 pt-[75px] h-full ${isCollapsed ? 'md:pl-[50px]' : 'md:pl-80'}`}>
        {children}
      </main>
    </div>
  )
}