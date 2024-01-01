import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui";
import {
  createSubscription,
  updateSubscriptionStatus,
} from "@/services/stripe";

const CheckoutForm = ({ prevStep, isComplete }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let success = false;
    setLoading(true);
    setErrorMessage(null);

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const response = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: user.email,
        name: user.username,
      },
    });
    if (response.error) {
      setErrorMessage(response.error.message);
      setLoading(false);
    }

    const data = {
      paymentMethod: response?.paymentMethod?.id,
      packageName,
    };

    try {
      const res = await createSubscription(data);

      const { status, clientSecret } = res.data;

      if (status === "requires_action") {
        const response = await stripe.confirmCardPayment(clientSecret);
        if (response.error) {
          setErrorMessage("Authentication Failed");
        } else {
          setErrorMessage(null);
          success = true;
          await updateSubscriptionStatus({ status: "Paid", packageName });
        }
      } else {
        success = true;
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }

    setLoading(false);
    if (success) {
      isComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <PaymentElement />
        <Button
          block
          variant="solid"
          type="submit"
          disabled={!stripe || !elements}
          loading={loading}
        >
          Submit
        </Button>
        <Button block type="button" onClick={prevStep} disabled={loading}>
          Back
        </Button>
      </div>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const SubscriptionForm = ({ prevStep, isComplete }) => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm prevStep={prevStep} isComplete={isComplete} />
  </Elements>
);

export default SubscriptionForm;
