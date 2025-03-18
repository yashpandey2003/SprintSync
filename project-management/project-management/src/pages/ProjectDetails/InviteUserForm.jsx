import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { inviteToProject } from '@/Redux/Project/Action';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const InviteUserForm = ({ closeDialog }) => {  // Accept closeDialog prop
    const dispatch = useDispatch();
    const { id } = useParams();
    const form = useForm({
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async (data) => {
        try {
            await dispatch(inviteToProject({ email: data.email, projectId: id }));
            console.log("Inviting user with email:", data.email);
            closeDialog();  // Close the dialog after success
        } catch (error) {
            console.error("Error inviting user:", error);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form className='space-y-5' onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"  
                                        className="border w-full border-gray-700 py-2 px-3"
                                        placeholder="Enter user email..." 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full mt-5'>
                        Invite User
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default InviteUserForm;
