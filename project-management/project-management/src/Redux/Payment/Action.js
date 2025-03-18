import api from "@/config/api";

export const createPayment = async({planType, jwt})=>{
    try {
        const {data} = await api.post(`/api/payments/${planType}`)
        if(data.payment_link_id){
            window.location.href = `https://razorpay.com/payment-link/`+data.payment_link_id+"/test";
        }
        console.log(data);
    } catch (error) {
        console.log(error);
        
    }
}