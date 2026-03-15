import { useEffect, useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSubscription } from '@/Redux/Subscription/Action';

const paidPlan = [
    "Add unlimited project",
    "Access to live chat",
    "Add unlimited team member",
    "Advanced Reporting",
    "Priority Support",
    "Customization Options",
    "Integration Support",
    "Advanced Security",
    "Training and Resources",
    "Access Control",
    "Custom Workflows"
];

const annualPlan = [
    "Add unlimited project",
    "Access to live chat",
    "Add unlimited team member",
    "Advanced Reporting",
    "Priority Support",
    "Everything which monthly plan has"
];

const freePlan = [
    "Add only 3 projects",
    "Basic Task Management",
    "Project Collaboration",
    "Basic Reporting",
    "Email Notification",
    "Basic Access Control"
];

const Subscription = () => {
    const dispatch = useDispatch();
    const subscription = useSelector(store => store.subscription);
    const [userSubscription, setUserSubscription] = useState(null);

    useEffect(() => {
        dispatch(getUserSubscription());
    }, [dispatch]);

    useEffect(() => {
        setUserSubscription(subscription?.userSubscription);
    }, [subscription]);

    return (
        <div className='py-12 px-6 max-w-6xl mx-auto animate-fade-in'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl font-bold gradient-text mb-3'>Choose Your Plan</h1>
                <p className='text-muted-foreground text-sm max-w-md mx-auto'>
                    Unlock powerful features to boost your team's productivity and project delivery
                </p>
            </div>
            <div className='flex flex-col lg:flex-row justify-center items-stretch gap-6'>
                <SubscriptionCard data={{
                    planName: "Free",
                    features: freePlan,
                    planType: "FREE",
                    price: 0,
                    buttonName: userSubscription?.planType === "FREE" ? "Current Plan" : "Get Started"
                }} />

                <SubscriptionCard data={{
                    planName: "Monthly Pro",
                    features: paidPlan,
                    planType: "MONTHLY",
                    price: 799,
                    buttonName: userSubscription?.planType === "MONTHLY" ? "Current Plan" : "Get Started",
                    popular: true
                }} />

                <SubscriptionCard data={{
                    planName: "Annual Pro",
                    features: annualPlan,
                    planType: "ANNUALLY",
                    price: 6711,
                    buttonName: userSubscription?.planType === "ANNUALLY" ? "Current Plan" : "Get Started"
                }} />
            </div>
        </div>
    );
}

export default Subscription;
