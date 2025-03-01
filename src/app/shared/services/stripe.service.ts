
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";

@Injectable({
    providedIn: "root",
})
export class StripeService {

    constructor(private http: HttpClient) { }

    async pay(data: Map<string, string>): Promise<void> {
        console.log(data);
        // stripePromise = ;
        const stripe = await loadStripe(data['key']);

        stripe.redirectToCheckout({
            sessionId: data['id']
        });
    }

}


