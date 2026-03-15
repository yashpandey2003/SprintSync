import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateCommentForm from './CreateCommentForm';
import CommentCard from './CommentCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssueById, updateIssueStatus } from '@/Redux/Issue/Action';
import { fetchComments } from '@/Redux/Comment/Action';

const statusColors = {
    pending: { color: 'hsl(45, 93%, 47%)', bg: 'hsla(45, 93%, 47%, 0.1)', label: 'To Do' },
    in_progress: { color: 'hsl(200, 95%, 55%)', bg: 'hsla(200, 95%, 55%, 0.1)', label: 'In Progress' },
    done: { color: 'hsl(142, 71%, 45%)', bg: 'hsla(142, 71%, 45%, 0.1)', label: 'Done' },
};

const IssueDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projectId, issueId } = useParams();
    const { issue, comment } = useSelector(store => store);

    const handleUpdateIssueStatus = (status) => {
        dispatch(updateIssueStatus({ status, id: issueId }));
    };

    useEffect(() => {
        dispatch(fetchIssueById(issueId));
        dispatch(fetchComments(issueId));
    }, [issueId]);

    const currentStatus = statusColors[issue.issueDetails?.status] || statusColors.pending;

    return (
        <div className='px-6 lg:px-10 py-8 max-w-7xl mx-auto animate-fade-in'>
            {/* Breadcrumbs */}
            <div className='flex items-center gap-2 text-xs font-medium text-muted-foreground/60 mb-6 px-1'>
                <span className='cursor-pointer hover:text-primary transition-colors' onClick={() => navigate('/')}>Projects</span>
                <span>/</span>
                <span className='cursor-pointer hover:text-primary transition-colors' onClick={() => navigate(`/project/${projectId}`)}>
                    {issue.issueDetails?.project?.name || 'Project'}
                </span>
                <span>/</span>
                <span className='text-muted-foreground'>Issue #{issueId}</span>
            </div>

            <div className='flex justify-between glass-card rounded-xl p-6 gap-6 hover:transform-none'>
                {/* Left Side - Issue Content */}
                <ScrollArea className="h-[80vh] w-[65%] pr-4">
                    <div>
                        <h1 className='text-xl font-bold text-foreground mb-2'>
                            {issue.issueDetails?.title}
                        </h1>

                        <div className='py-4'>
                            <h2 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2'>
                                Description
                            </h2>
                            <p className='text-muted-foreground text-sm leading-relaxed'>
                                {issue.issueDetails?.description}
                            </p>
                        </div>

                        <div className='mt-6'>
                            <h2 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4'>
                                Activity
                            </h2>
                            <Tabs defaultValue="comments" className='w-full'>
                                <TabsList className='mb-4 bg-secondary/50 rounded-lg'>
                                    <TabsTrigger value='all' className="text-xs data-[state=active]:bg-card data-[state=active]:text-foreground rounded-md">
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger value='comments' className="text-xs data-[state=active]:bg-card data-[state=active]:text-foreground rounded-md">
                                        Comments
                                    </TabsTrigger>
                                    <TabsTrigger value='history' className="text-xs data-[state=active]:bg-card data-[state=active]:text-foreground rounded-md">
                                        History
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value='all'>
                                    <p className='text-sm text-muted-foreground'>All activity will appear here.</p>
                                </TabsContent>
                                <TabsContent value='history'>
                                    <p className='text-sm text-muted-foreground'>Status change history will appear here.</p>
                                </TabsContent>
                                <TabsContent value='comments'>
                                    <CreateCommentForm issueId={issueId} />
                                    <div className='mt-5 space-y-3'>
                                        {comment.comments?.length > 0 ? (
                                            comment.comments.map((item) => (
                                                <CommentCard item={item} key={item.id} />
                                            ))
                                        ) : (
                                            <p className='text-sm text-muted-foreground/50 py-4 text-center'>
                                                No comments yet
                                            </p>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>

                {/* Right Side - Detail Panel */}
                <div className='w-full lg:w-[30%] space-y-4'>
                    <Select onValueChange={handleUpdateIssueStatus}>
                        <SelectTrigger className="w-full bg-card border-white/10">
                            <SelectValue placeholder={currentStatus.label} />
                        </SelectTrigger>
                        <SelectContent className='glass border-white/10'>
                            <SelectItem value="pending">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className='bg-card/50 rounded-lg p-4 border border-white/5'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 pb-3 border-b border-white/5'>
                            Details
                        </p>
                        <div className='space-y-4 mt-3'>
                            <div className='flex gap-4 items-center text-sm'>
                                <p className='w-20 text-muted-foreground/70 text-xs'>Assignee</p>
                                {issue.issueDetails?.assignee?.fullName ? (
                                    <div className='flex items-center gap-2'>
                                        <Avatar className="h-6 w-6 text-xs">
                                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                {issue.issueDetails?.assignee?.fullName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className='text-sm'>{issue.issueDetails?.assignee?.fullName}</span>
                                    </div>
                                ) : (
                                    <span className='text-muted-foreground/50 text-sm'>Unassigned</span>
                                )}
                            </div>
                            <div className='flex gap-4 items-center text-sm'>
                                <p className='w-20 text-muted-foreground/70 text-xs'>Status</p>
                                <Badge 
                                    className='text-xs'
                                    style={{ color: currentStatus.color, background: currentStatus.bg, border: 'none' }}
                                >
                                    {currentStatus.label}
                                </Badge>
                            </div>
                            <div className='flex gap-4 items-center text-sm'>
                                <p className='w-20 text-muted-foreground/70 text-xs'>Priority</p>
                                <span className='text-sm capitalize'>{issue.issueDetails?.priority || 'Not set'}</span>
                            </div>
                            <div className='flex gap-4 items-center text-sm'>
                                <p className='w-20 text-muted-foreground/70 text-xs'>Due Date</p>
                                <span className='text-sm'>{issue.issueDetails?.dueDate || 'Not set'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetails;
