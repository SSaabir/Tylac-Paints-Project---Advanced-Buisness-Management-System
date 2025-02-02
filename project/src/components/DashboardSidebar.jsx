import React from 'react'
import { Sidebar } from 'flowbite-react';
import { useAuthContext } from '../hooks/useAuthContext';
import { HiChartPie, HiViewBoards, HiInbox, HiUser, HiShoppingBag, HiArrowSmRight, HiTable } from 'react-icons/hi';

export const DashboardSidebar = () => {
    const {user} = useAuthContext();
    const role = user?.role || 'Guest';
  return (
         <Sidebar aria-label="Sidebar">
           <Sidebar.Logo href="#" img="https://flowbite.com/docs/images/logo.svg" imgAlt="Flowbite logo">
             Dashboard
           </Sidebar.Logo>
           <Sidebar.Items>
             <Sidebar.ItemGroup>
               <Sidebar.Item href="#" icon={HiChartPie}>
                 Dashboard
               </Sidebar.Item>
               {role=='Admin'&&(
               <Sidebar.Item href="/projectd" icon={HiViewBoards}>
                 Projects
               </Sidebar.Item>
               )}
               <Sidebar.Item href="/inboxd" icon={HiInbox}>
                 Inbox
               </Sidebar.Item>
               <Sidebar.Item href="userd" icon={HiUser}>
                 Users
               </Sidebar.Item>
               <Sidebar.Item href="productd" icon={HiShoppingBag}>
                 Products
               </Sidebar.Item>
               <Sidebar.Item href="#" icon={HiArrowSmRight}>
                 Sign In
               </Sidebar.Item>
               <Sidebar.Item href="#" icon={HiTable}>
                 Sign Up
               </Sidebar.Item>
             </Sidebar.ItemGroup>
           </Sidebar.Items>
         </Sidebar>
  )
}
