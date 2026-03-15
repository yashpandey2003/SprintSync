import { Button } from '@/components/ui/button'
import { createPayment } from '@/Redux/Payment/Action'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useSelector } from 'react-redux'

const SubscriptionCard = ({ data }) => {
    const { subscription } = useSelector(store => store);
    const isActivePlan = subscription.userSubscription?.planType === data.planType;

    const handleUpgrade = async () => {
        if (isActivePlan) return;
        try {
            await createPayment({ planType: data.planType, jwt: localStorage.getItem("jwt") });
        } catch (error) {
            // Payment error handled silently
        }
    };

    return (
        <div className={`
            relative rounded-xl p-6 space-y-5 w-full lg:w-[20rem] flex flex-col
            glass-card hover:transform-none
            ${data.popular ? 'border-primary/40 ring-1 ring-primary/20' : ''}
        `}>
            {/* Popular Badge */}
            {data.popular && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                    <span className='text-xs font-semibold px-3 py-1 rounded-full text-primary-foreground'
                        style={{ background: 'var(--gradient-primary)' }}
                    >
                        Most Popular
                    </span>
                </div>
            )}

            {/* Plan Header */}
            <div>
                <p className='text-sm font-medium text-muted-foreground'>{data.planName}</p>
                <div className='mt-2 flex items-baseline gap-1'>
                    <span className='text-3xl font-bold'>₹{data.price.toLocaleString()}</span>
                    <span className='text-sm text-muted-foreground'>/{data.planType === "ANNUALLY" ? "year" : data.planType === "MONTHLY" ? "month" : "forever"}</span>
                </div>
                {data.planType === "ANNUALLY" && (
                    <p className='text-xs font-medium mt-1' style={{ color: 'hsl(142, 71%, 45%)' }}>
                        Save 30% compared to monthly
                    </p>
                )}
            </div>

            {/* CTA Button */}
            <Button
                onClick={handleUpgrade}
                disabled={isActivePlan}
                className={`w-full font-semibold py-5 ${data.popular
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : isActivePlan 
                        ? 'cursor-not-allowed opacity-50' 
                        : ''
                }`}
                variant={data.popular ? 'default' : 'outline'}
            >
                {data.buttonName}
            </Button>

            {/* Features */}
            <div className='flex-1 space-y-2.5 pt-2 border-t border-white/5'>
                {data.features.map((item) => (
                    <div key={item} className='flex items-start gap-2.5'>
                        <CheckCircledIcon className='h-4 w-4 shrink-0 mt-0.5' style={{ color: 'hsl(142, 71%, 45%)' }} />
                        <p className='text-sm text-muted-foreground leading-tight'>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubscriptionCard;
