import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import CreateProjectForm from '../Project/CreateProjectForm'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/Redux/Auth/Action'

const Navbar = () => {
    const { auth } = useSelector(store => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className='sticky top-0 z-50 glass border-b border-white/5'>
            <div className='max-w-7xl mx-auto px-6 py-3 flex items-center justify-between'>
                {/* Left Section - Logo and Navigation */}
                <div className='flex items-center gap-5'>
                    {/* Logo */}
                    <div 
                        className='flex items-center gap-2.5 cursor-pointer group'
                        onClick={() => navigate("/")}
                    >
                        <div className='relative'>
                            <img 
                                src='./meeting.png'  
                                alt='SprintSync Logo'
                                className='h-9 w-9 transition-transform duration-300 group-hover:scale-110'
                            />
                            <div className='absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                                style={{ boxShadow: '0 0 15px hsla(250, 95%, 64%, 0.4)' }}
                            />
                        </div>
                        <span className='font-bold text-lg gradient-text tracking-tight'>
                            SprintSync
                        </span>
                    </div>

                    <div className='h-5 w-px bg-white/10 mx-1'></div>

                    {/* New Project Button */}
                    <Dialog>
                        <DialogTrigger>
                            <Button 
                                variant="ghost" 
                                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200'
                            >
                                New Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>Create New Project</DialogHeader>
                            <CreateProjectForm />
                        </DialogContent>
                    </Dialog>

                    {/* Upgrade Button */}
                    <Button 
                        onClick={() => navigate("/upgrade_plan")} 
                        variant='ghost'
                        className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200'
                    >
                        Upgrade
                    </Button>
                </div>

                {/* Right Section - User Profile */}
                <div className='flex gap-3 items-center'>
                    <span className='text-sm font-medium text-muted-foreground'>
                        {auth.user?.fullName}
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button 
                                variant="outline" 
                                size="icon" 
                                className='rounded-full h-9 w-9 border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-200'
                            >
                                <PersonIcon className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='glass border-white/10'>
                            <DropdownMenuItem 
                                onClick={handleLogout}
                                className='cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300'
                            >
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
