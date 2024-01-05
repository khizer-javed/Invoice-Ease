import { ActionLink } from "@/components/shared";
import { useState } from "react";
import SubscriptionForm from "./subscription";
import UserDetails from "./user-details";

const STEPS = {
  SIGNUP: 1,
  SUBSCRIPTION: 2,
};
const SignUpForm = (props) => {
  const { className, signInUrl = "/sign-in" } = props;
  const [signupData, setSignupData] = useState(null);
  const [step, setStep] = useState(STEPS.SIGNUP);

  const nextStep = (values) => {
    setStep((prev) => prev + 1);
    setSignupData(values);
  };
  const prevStep = () => {
    setStep((prev) => prev - 1);
    setIsExited(false);
  };

  return (
    <div className={className}>
      {step === STEPS.SIGNUP && (
        <UserDetails nextStep={nextStep} step={step} signupData={signupData} />
      )}
      {step === STEPS.SUBSCRIPTION && (
        <SubscriptionForm prevStep={prevStep} signupData={signupData} />
      )}
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <ActionLink to={signInUrl}>Sign In</ActionLink>
      </div>
    </div>
  );
};

export default SignUpForm;
