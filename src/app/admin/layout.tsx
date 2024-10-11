import AdminHeader from '@/components/AdminHeader'
import SideNav from '@/components/SideNav'
import { verifySession } from '@/lib/dal'
import React, { ReactNode } from 'react'

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  await verifySession()

  return (
    <div className={`flex w-full h-screen overflow-hidden font-poppins bg-white`}> 
    <SideNav />
    <div className="relative flex-1 overflow-y-auto rounded-md">
      <AdminHeader />
      <div className='h-full p-4 pt-6 md:p-8'>
        {children}
      </div>
    </div>
  </div>
  )
}

export default AdminLayout
