import React from 'react'

interface MainLayoutProps {
  children?: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div className="flex flex-col h-full px-5 py-5 pb-5 ">{children}</div>
}
