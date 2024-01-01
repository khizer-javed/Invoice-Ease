import { ActionLink } from "@/components/shared";
import appConfig from "@/configs/app.config";
import { userSignUp } from "@/services/auth";
import { onSignInSuccess } from "@/store/auth/sessionSlice";
import { setLoggedInUser } from "@/store/auth/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubscriptionForm from "./subscription";
import UserDetails from "./user-details";

const STEPS = {
  SIGNUP: 1,
  SUBSCRIPTION: 2,
};
const SignUpForm = (props) => {
  const { className, signInUrl = "/sign-in" } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const isComplete = async () => {
    const response = await userSignUp(signupData);
    const { token } = response.data;
    dispatch(onSignInSuccess(token));
    if (response.data.user) {
      dispatch(setLoggedInUser(response.data));
    }
    navigate(appConfig.TOUR_PATH);
  };

  return (
    <div className={className}>
      {step === STEPS.SIGNUP && (
        <UserDetails nextStep={nextStep} step={step} signupData={signupData} />
      )}

      {step === STEPS.SUBSCRIPTION && (
        <SubscriptionForm prevStep={prevStep} isComplete={isComplete} />
      )}

      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <ActionLink to={signInUrl}>Sign In</ActionLink>
      </div>
    </div>
  );
};

export default SignUpForm;
