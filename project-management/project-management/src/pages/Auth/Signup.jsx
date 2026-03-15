import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { register } from '@/Redux/Auth/Action';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: ""
    },
  });

  const onSubmit = (data) => {
    dispatch(register(data));
  };

  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-bold gradient-text text-center'>Create Account</h1>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full py-5 px-4"
                    placeholder="Full name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="w-full py-5 px-4"
                    placeholder="Email address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="w-full py-5 px-4"
                    placeholder="Create a strong password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-full mt-5 py-5 font-semibold'>
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
