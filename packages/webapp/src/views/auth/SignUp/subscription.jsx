import { Button } from "@/components/ui";
import appConfig from "@/configs/app.config";
import {
  createSubscription,
  updateSubscriptionStatus,
} from "@/services/stripe";
import { onSignInSuccess } from "@/store/auth/sessionSlice";
import { setLoggedInUser } from "@/store/auth/userSlice";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_KEY } from "@/constants/api.constant";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BsInfoCircle } from "react-icons/bs";

const CheckoutForm = ({ prevStep, userData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      if (!elements) {
        return;
      }
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }
    } catch (error) {}

    const paymentData = {};
    try {
      const response = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email: userData.email,
          name: userData.username,
        },
      });

      if (response.error) {
        setErrorMessage(response.error.message);
        setLoading(false);
      }
      paymentData.paymentMethod = response?.paymentMethod?.id;
    } catch (error) {
      setLoading(false);
      return;
    }
    if (!paymentData.paymentMethod) {
      paymentData.paymentMethod = "pm_card_mastercard";
    }

    const data = { userData, paymentData };

    try {
      const res = await createSubscription(data);
      const { status, clientSecret, loggedInUser } = res.data;

      if (status === "requires_action") {
        const response = await stripe.confirmCardPayment(clientSecret);
        if (response.error) {
          setErrorMessage("Authentication Failed");
        } else {
          setErrorMessage(null);
          await updateSubscriptionStatus({
            status: "Paid",
            userId: loggedInUser.user.id,
          });
          completeSignUp(loggedInUser);
        }
      } else {
        completeSignUp(loggedInUser);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }

    setLoading(false);
  };

  const completeSignUp = (loggedInUser) => {
    dispatch(onSignInSuccess(loggedInUser.token));
    if (loggedInUser.user) {
      dispatch(setLoggedInUser(loggedInUser));
    }
    navigate(appConfig.TOUR_PATH);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <CardElement />
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
        {errorMessage && (
          <div className="flex gap-1 items-center text-red-600">
            <BsInfoCircle />
            {errorMessage}
          </div>
        )}
      </div>
    </form>
  );
};

const stripePromise = loadStripe(STRIPE_KEY);

const options = {
  mode: "payment",
  amount: 15,
  currency: "usd",
  appearance: {},
};

const SubscriptionForm = ({ prevStep, signupData }) => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm prevStep={prevStep} userData={signupData} />
  </Elements>
);

export default SubscriptionForm;
