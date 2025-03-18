import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import CreateProjectForm from '../Project/CreateProjectForm'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '@/Redux/Store'
import { logout } from '@/Redux/Auth/Action'

const Navbar = () => {
    const { auth } = useSelector(store => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='border-b py-4 px-5 flex items-center justify-between'>
            {/* Left Section - Logo and Navigation */}
            <div className='flex items-center gap-3'>
                {/* Logo */}
                <img 
                    src='./meeting.png'  
                    alt='Logo'
                    className='h-10 w-10 cursor-pointer'
                    onClick={() => navigate("/")} 
                />

                <p onClick={() => navigate("/")} className='cursor-pointer font-semibold text-lg'>
                    SprintSync
                </p>

                {/* New Project Button */}
                <Dialog>
                    <DialogTrigger>
                        <Button variant="ghost">New Project</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>Create New Project</DialogHeader>
                        <CreateProjectForm />
                    </DialogContent>
                </Dialog>

                {/* Upgrade Button */}
                <Button onClick={() => navigate("/upgrade_plan")} variant='ghost'>Upgrade</Button>
            </div>

            {/* Right Section - User Profile */}
            <div className='flex gap-3 items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline" size="icon" className='rounded-full border-2 border-gray-500'>
                            <PersonIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout}>LogOut</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Display User Name */}
                <p className='font-medium'>{auth.user.fullName}</p>
            </div>
        </div>
    );
}

export default Navbar;
