import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { assignedUserToIssue } from '@/Redux/Issue/Action'
import { store } from '@/Redux/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserList = ({issueDetails}) => {
    const {project} = useSelector(store=>store);
    const dispatch = useDispatch();
    const handleAssignIssueToUser = (userId)=>{
        dispatch(assignedUserToIssue({issueId:issueDetails.id, userId}))
    }
    return (
        <>
            <div className='space-y-2'>
                <div className='border rounded-md'>
                    <p className='py-2 px-3'>{issueDetails.assignee?.fullName || "Unassigned"}</p>
                </div>
                {project.projectDetails?.team.map((item)=><div onClick={()=>handleAssignIssueToUser(item.id)} key={item} className='py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border-pz-4'>
                    <Avatar className="bg-transparent">
                        <AvatarFallback className="bg-transparent text-white">
                            {item.fullName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className='space-y-1'>
                        <p className='text-sm leading-none'>{item.fullName}</p>
                        <p className='text-sm text-gray-500'>@{item.fullName?.toLowerCase()}</p>
                        </div>
                </div>)}

            </div>
        </>
    )
}

export default UserList