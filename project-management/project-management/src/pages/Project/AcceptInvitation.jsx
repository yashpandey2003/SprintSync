import { Button } from '@/components/ui/button'
import { acceptInvitation } from '@/Redux/Project/Action';
import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

const AcceptInvitation = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleAcceptInvitation = () => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        dispatch(acceptInvitation({ invitationToken: token, navigate }))
    }
    return (
        <div className='h-[85vh] flex flex-col justify-center items-center'>
            <h1 className='py-5 font-semibold text-xl'>You are invited to join the project</h1>
            <Button onClick={handleAcceptInvitation}>Accept Invitation</Button>
        </div>
    )
}

export default AcceptInvitation