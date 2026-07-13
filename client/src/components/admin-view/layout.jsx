import { Outlet } from 'react-router-dom'
import React, { useState } from 'react'
import AdminHeader from './header'
import AdminSidebar from './sidebar'

const AdminLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false)

    return (
        <div className="flex min-h-screen w-full">
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-col flex-1">
                <AdminHeader setOpen={setOpenSidebar} />
                <main className="flex-1 bg-muted/80 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout