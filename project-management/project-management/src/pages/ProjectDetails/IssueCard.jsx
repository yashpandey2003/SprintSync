import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotsVerticalIcon, PersonIcon } from '@radix-ui/react-icons'
import UserList from './UserList'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteIssue, updateIssueStatus } from '@/Redux/Issue/Action'

const priorityColors = {
    high: 'hsl(0, 72%, 51%)',
    medium: 'hsl(45, 93%, 47%)',
    low: 'hsl(142, 71%, 45%)',
};

const IssueCard = ({ item, projectId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleIssueDelete = () => {
        dispatch(deleteIssue(item.id));
    }

    const handleUpdateIssueStatus = (status) => {
        dispatch(updateIssueStatus({ status: status, id: item.id }));
    }

    const priorityColor = priorityColors[item.priority?.toLowerCase()] || priorityColors.medium;

    return (
        <Card className='rounded-lg py-0 bg-card/50 border-white/5 hover:border-white/10 transition-all duration-200 group'>
            <CardHeader className='py-2.5 px-3'>
                <div className='flex justify-between items-start gap-2'>
                    <div className='flex items-center gap-2 min-w-0'>
                        <div 
                            className='w-1.5 h-1.5 rounded-full shrink-0' 
                            style={{ backgroundColor: priorityColor }} 
                        />
                        <CardTitle 
                            className="cursor-pointer text-sm font-medium truncate hover:text-primary transition-colors"
                            onClick={() => navigate(`/project/${projectId}/issue/${item.id}`)}
                        >
                            {item.title}
                        </CardTitle>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button 
                                className='rounded-full h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity' 
                                size="icon" 
                                variant="ghost"
                            >
                                <DotsVerticalIcon className='h-3 w-3' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='glass border-white/10'>
                            <DropdownMenuItem onClick={() => handleUpdateIssueStatus('pending')} className='cursor-pointer text-xs'>To Do</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateIssueStatus('in_progress')} className='cursor-pointer text-xs'>In progress</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateIssueStatus('done')} className='cursor-pointer text-xs'>Done</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/project/${projectId}/issue/${item.id}`)} className='cursor-pointer text-xs'>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleIssueDelete} className='cursor-pointer text-xs text-red-400 focus:text-red-300'>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className='py-0 px-3 pb-2.5'>
                <div className='flex items-center justify-between'>
                    <span className='text-xs text-muted-foreground/60'>
                        #{item.id}
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button size='icon' className='h-6 w-6 bg-secondary hover:bg-secondary/80 rounded-full'>
                                <Avatar className="h-5 w-5">
                                    <AvatarFallback className="bg-transparent text-foreground text-[10px]">
                                        {item.assignee 
                                            ? item.assignee.fullName?.[0]
                                            : <PersonIcon className="h-3 w-3 text-muted-foreground" />
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='glass border-white/10'>
                            <UserList issueDetails={item} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}

export default IssueCard