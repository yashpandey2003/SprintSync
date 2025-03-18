package com.yash.project_management.controller;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.yash.project_management.model.PlanType;
import com.yash.project_management.model.User;
import com.yash.project_management.reponse.PaymentLinkResponse;
import com.yash.project_management.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    @Autowired
    private UserService userService;

    @PostMapping("/{planType}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable PlanType planType, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        int amount = 799*100;
        if(planType.equals(PlanType.ANNUALLY)){
            amount = amount*12;
            amount = (int)(amount*0.7);
        }

            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "INR");
            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);
            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("callback_url", "http://localhost:5173/upgrade_plan/success?planType="+planType);
            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);
            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("id");
            PaymentLinkResponse res = new PaymentLinkResponse();
            res.setPayment_link_id(paymentLinkUrl);
            res.setPayment_link_id(paymentLinkId);
            return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}
