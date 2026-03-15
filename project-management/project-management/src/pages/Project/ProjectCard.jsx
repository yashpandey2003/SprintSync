import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { deleteProject } from '@/Redux/Project/Action'
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProjectCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        dispatch(deleteProject(item.id))
    }

    return (
        <Card className="p-0 w-full lg:max-w-3xl card-hover overflow-hidden group">
            <div className='flex'>
                {/* Left accent bar */}
                <div className='w-1 shrink-0 rounded-l-lg' 
                    style={{ background: 'var(--gradient-primary)' }}
                />
                
                <div className='p-5 w-full space-y-3'>
                    <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                            <div className='flex items-center gap-3 mb-1'>
                                <h2 
                                    onClick={() => navigate("/project/" + item.id)} 
                                    className='cursor-pointer font-semibold text-base hover:text-primary transition-colors'
                                >
                                    {item.name}
                                </h2>
                                <DotFilledIcon className='text-muted-foreground/50' />
                                <span className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
                                    {item.category}
                                </span>
                            </div>
                            <p className='text-muted-foreground text-sm line-clamp-2 leading-relaxed'>
                                {item.description}
                            </p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button 
                                    className='rounded-full opacity-0 group-hover:opacity-100 transition-opacity' 
                                    variant="ghost" 
                                    size="icon"
                                >
                                    <DotsVerticalIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='glass border-white/10'>
                                <DropdownMenuItem className='cursor-pointer'>Update</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDelete} className='cursor-pointer text-red-400 focus:text-red-300'>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                    <div className='flex flex-wrap gap-1.5 items-center'>
                        {item.tags.map((tag) => (
                            <Badge 
                                key={tag} 
                                variant="outline" 
                                className='text-xs px-2 py-0.5 border-white/10 text-muted-foreground hover:border-primary/30 transition-colors'
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ProjectCard