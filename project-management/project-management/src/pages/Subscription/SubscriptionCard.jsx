import { Button } from '@/components/ui/button'
import { createPayment } from '@/Redux/Payment/Action'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SubscriptionCard = ({ data }) => {
  const dispatch = useDispatch();
  const { subscription } = useSelector(store => store);
  const isActivePlan = subscription.userSubscription?.planType === data.planType;

  const handleUpgrade = async () => {
    if (isActivePlan) return; 
    try {
      await createPayment({ planType: data.planType, jwt: localStorage.getItem("jwt") });
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className='rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]'>
      <p>{data.planName}</p>
      <p>
        <span className='text-xl font-semibold'>&#8377;{data.price}/</span>
        <span>{data.planType}</span>
      </p>
      {data.planType === "ANNUALLY" && <p className='text-green-500'>30% off</p>}

      <Button
        onClick={handleUpgrade}
        disabled={isActivePlan} 
        className={`w-full ${isActivePlan ? 'cursor-not-allowed opacity-50' : ''}`} // 🔥 Add visual effect
      >
        {data.buttonName}
      </Button>

      <div>
        {data.features.map((item) => (
          <div key={item} className='flex items-center gap-2'>
            <CheckCircledIcon />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionCard;
