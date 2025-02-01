import React from 'react';
import { Sidebar, Navbar, Card, Button } from 'flowbite-react';
import { HiChartPie, HiViewBoards, HiInbox, HiUser, HiShoppingBag, HiArrowSmRight, HiTable } from 'react-icons/hi';
import { useAuthContext } from '../hooks/useAuthContext';
export default function Dashboard () {
  const {user} = useAuthContext();
  const role = user?.role || 'Guest';;
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Projects
            </Sidebar.Item>
            )}
            <Sidebar.Item href="#" icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <Navbar fluid rounded>
          <Navbar.Brand href="https://flowbite.com/">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Dashboard</span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Button>Get started</Button>
          </div>
        </Navbar>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Revenue
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                $12,345
              </p>
            </Card>

            {/* Card 2 */}
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Users
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                1,234
              </p>
            </Card>

            {/* Card 3 */}
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Projects
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                45
              </p>
            </Card>
          </div>

          {/* Chart Section */}
          <div className="mt-6">
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Monthly Sales
              </h5>
              <div className="h-96">
                {/* Placeholder for a chart (e.g., Chart.js or ApexCharts) */}
                <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                  <span className="text-gray-500">Chart will go here</span>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};