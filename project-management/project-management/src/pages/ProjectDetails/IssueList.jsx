import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useEffect } from 'react'
import IssueCard from './IssueCard'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import CreateIssueForm from './CreateIssueForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssues } from '@/Redux/Issue/Action'
import { useParams } from 'react-router-dom'

const statusConfig = {
    pending: { color: 'hsl(45, 93%, 47%)', bg: 'hsla(45, 93%, 47%, 0.1)', label: '⏳' },
    in_progress: { color: 'hsl(200, 95%, 55%)', bg: 'hsla(200, 95%, 55%, 0.1)', label: '🔄' },
    done: { color: 'hsl(142, 71%, 45%)', bg: 'hsla(142, 71%, 45%, 0.1)', label: '✅' },
};

const IssueList = ({ title, status }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { issue } = useSelector(store => store);

    useEffect(() => {
        dispatch(fetchIssues(id))
    }, [id])

    const filteredIssues = issue.issues.filter(i => i.status === status);
    const config = statusConfig[status] || statusConfig.pending;

    return (
        <div className='w-full md:w-[280px] lg:w-[300px] shrink-0'>
            <Dialog>
                <Card className="glass-card hover:transform-none">
                    <CardHeader className='pb-3'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div 
                                    className='w-2.5 h-2.5 rounded-full'
                                    style={{ backgroundColor: config.color }}
                                />
                                <CardTitle className='text-sm font-semibold'>
                                    {title}
                                </CardTitle>
                            </div>
                            <span 
                                className='text-xs font-medium px-2 py-0.5 rounded-full'
                                style={{ color: config.color, background: config.bg }}
                            >
                                {filteredIssues.length}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 pb-2">
                        <div className='space-y-2 min-h-[100px]'>
                            {filteredIssues.length > 0 ? (
                                filteredIssues.map((item) => (
                                    <IssueCard projectId={id} item={item} key={item.id} />
                                ))
                            ) : (
                                <div className='flex items-center justify-center h-[100px] text-muted-foreground/50 text-xs'>
                                    No issues
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className='pt-0'>
                        <DialogTrigger className='w-full'>
                            <Button variant='outline' className='w-full text-xs border-dashed border-white/10 hover:border-primary/30 text-muted-foreground hover:text-foreground'>
                                <PlusIcon className='mr-1' />
                                Create Issue
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new issue</DialogTitle>
                        <CreateIssueForm status={status} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default IssueList