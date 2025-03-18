import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateCommentForm from './CreateCommentForm';
import CommentCard from './CommentCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssueById, updateIssueStatus } from '@/Redux/Issue/Action';
import { store } from '@/Redux/Store';
import { fetchComments } from '@/Redux/Comment/Action';

const IssueDetails = () => {
    const dispatch = useDispatch();
    const { projectId, issueId } = useParams();
    const {issue, comment} = useSelector(store=>store);
    const handleUpdateIssueStatus = (status) => {
        dispatch(updateIssueStatus({status, id:issueId}))
        console.log(status);
    };
    useEffect(() => {
        dispatch(fetchIssueById(issueId));
        dispatch(fetchComments(issueId));
    }, [issueId])
    return (
        <div className='px-10 py-8 text-gray-400'>
            <div className='flex justify-between border p-6 rounded-lg gap-6'>
                {/* Left Side */}
                <ScrollArea className="h-[80vh] w-[65%]">
                    <div>
                        <h1 className='text-lg font-semibold text-gray-400 mb-4'>{issue.issueDetails?.title}</h1>
                        <div className='py-4'>
                            <h2 className='font-semibold text-gray-400'>Description</h2>
                            <p className='text-gray-400 text-sm mt-3'>
                            {issue.issueDetails?.description}
                            </p>
                        </div>
                        <div className='mt-5'>
                            <h1 className='pb-3'>Activity</h1>
                            <Tabs defaultValue="comments" className='w-[400px] text-white'>
                                <TabsList className='mb-4 bg-gray-800 text-white rounded-md'>
                                    <TabsTrigger value='all' className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger value='comments' className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                                        Comments
                                    </TabsTrigger>
                                    <TabsTrigger value='history' className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                                        History
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value='all'>
                                    All make changes to your account here.
                                </TabsContent>
                                <TabsContent value='history'>
                                    History change your password here.
                                </TabsContent>
                                <TabsContent value='comments'>
                                    <CreateCommentForm issueId={issueId} />
                                    <div className='mt-6 space-y-4'>
                                        {comment.comments.map((item) => <CommentCard item = {item} key={item.id} />)}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>

                {/* Right Side */}
                <div className='w-full lg:w-[30%] space-y-3 p-4 border rounded-lg'>
                    <Select onValueChange={handleUpdateIssueStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="To Do" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className='border rounded-lg p-4'>
                        <p className='border-b py-2 px-3'>Details</p>
                        <div className='space-y-5 mt-3'>
                            <div className='flex gap-5 items-center'>
                                <p className='w-[7rem]'>Assignee</p>
                                {issue.issueDetails?.assignee?.fullName?<div className='flex items-center gap-2'>
                                    <Avatar className="bg-gray-500 h-8 w-8 text-xs">
                                        <AvatarFallback className="bg-transparent text-white">{issue.issueDetails?.assignee?.fullName[0]}</AvatarFallback>
                                    </Avatar>
                                    <p>{issue.issueDetails?.assignee?.fullName}</p>
                                </div>:<p>unassigned</p>}
                                
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-[7rem]'>Labels</p>
                                <p>None</p>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-[7rem]'>Status</p>
                                <Badge>{issue.issueDetails?.status}</Badge>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-[7rem]'>Release</p>
                                <p>10-04-2024</p>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <p className='w-[7rem]'>Reporter</p>
                                <div className='flex items-center gap-2'>
                                    <Avatar className="bg-gray-500 h-8 w-8 text-xs">
                                        <AvatarFallback className="bg-transparent text-white">{issue.issueDetails?.assignee?.fullName[0]}</AvatarFallback>
                                    </Avatar>
                                    <p>{issue.issueDetails?.assignee?.fullName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetails;
