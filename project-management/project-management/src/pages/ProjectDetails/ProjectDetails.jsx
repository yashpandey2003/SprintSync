import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PlusIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import InviteUserForm from './InviteUserForm'
import IssueList from './IssueList'
import ChatBox from './ChatBox'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectById } from '@/Redux/Project/Action'
import { useParams } from 'react-router-dom'

const ProjectDetails = () => {
    const dispatch = useDispatch();
    const { project } = useSelector(store => store);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchProjectById(id))
    }, [id])

    return (
        <div className='mt-5 lg:px-10 max-w-7xl mx-auto animate-fade-in'>
            <div className='lg:flex gap-5 justify-between pb-4'>
                {/* Chat Panel - Moved to Left side for better project detail visibility */}
                <div className='lg:w-[25%] rounded-md sticky top-20 self-start'>
                    <ChatBox />
                </div>

                {/* Main Content (Project Info & Kanban Board) */}
                <ScrollArea className='h-screen lg:w-[73%] pr-2'>
                    <div className='text-muted-foreground pb-10 w-full'>
                        {/* Project Header */}
                        <h1 className='text-2xl font-bold text-foreground pb-2'>
                            {project.projectDetails?.name}
                        </h1>
                        <p className='text-sm leading-relaxed max-w-2xl mb-6'>
                            {project.projectDetails?.description}
                        </p>

                        {/* Project Info Grid */}
                        <div className='space-y-3 pb-8 text-sm'>
                            <div className='flex items-center'>
                                <p className='w-32 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70'>
                                    Project Lead
                                </p>
                                <Badge variant="outline" className='border-primary/30 text-primary'>
                                    {project.projectDetails?.owner?.fullName}
                                </Badge>
                            </div>
                            <div className='flex items-center'>
                                <p className='w-32 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70'>
                                    Category
                                </p>
                                <span className='capitalize'>{project.projectDetails?.category}</span>
                            </div>
                            <div className='flex items-center'>
                                <p className='w-32 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70'>
                                    Members
                                </p>
                                <div className='flex items-center gap-1.5'>
                                    {project.projectDetails?.team.map((item) => (
                                        <Avatar key={item.id} className='cursor-pointer h-7 w-7 text-xs border border-white/10 hover:border-primary/50 transition-colors'>
                                            <AvatarFallback className='bg-primary/10 text-primary text-xs'>
                                                {item.fullName?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                    ))}
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button size='sm' variant='outline' className='ml-1 h-7 text-xs border-dashed border-white/20 hover:border-primary/50'>
                                                <PlusIcon className='w-3 h-3 mr-1' />
                                                Invite
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>Invite User</DialogHeader>
                                            <InviteUserForm />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>

                        {/* Kanban Board */}
                        <section>
                            <div className='flex items-center gap-3 py-4 border-b border-white/5 mb-5'>
                                <h2 className='text-lg font-semibold text-foreground'>Tasks</h2>
                                <Badge variant="secondary" className='text-xs'>
                                    {project.projectDetails?.issues?.length || 0}
                                </Badge>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4 py-2 overflow-x-auto pb-4 custom-scrollbar'>
                                <IssueList status="pending" title="To Do" />
                                <IssueList status="in_progress" title="In Progress" />
                                <IssueList status="done" title="Done" />
                            </div>
                        </section>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default ProjectDetails