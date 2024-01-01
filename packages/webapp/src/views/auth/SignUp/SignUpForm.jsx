import React, { useState } from "react";
import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Notification,
  toast,
  Alert,
} from "@/components/ui";
import { ActionLink } from "@/components/shared";
import { onSignInSuccess } from "@/store/auth/sessionSlice";
import { setUser } from "@/store/auth/userSlice";
import appConfig from "@/configs/app.config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignUp } from "@/services/auth";
import { useForm } from "react-hook-form";
import { DEFAULT_ROLES } from "@/constants/app.constant";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";

const SignUpForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { disableSubmit = false, className, signInUrl = "/sign-in" } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useTimeOutMessage();

  const onSignUp = async (values = {}) => {
    setLoading(true);
    if (!isPasswordMatched(values)) {
      return;
    }
    try {
      values.roleId = DEFAULT_ROLES.USER;
      const resp = await userSignUp(values);
      const { token } = resp.data;
      dispatch(onSignInSuccess(token));
      if (resp.data.user) {
        dispatch(
          setUser(
            resp.data.user || {
              avatar: "",
              username: "Anonymous",
              authority: [],
              email: "",
            }
          )
        );
      }
      navigate(appConfig.TOUR_PATH);
    } catch (error) {
      setLoading(false);
      toast.push(
        <Notification className="mb-4" type="danger">
          {error?.response?.data.message}
        </Notification>
      );
    }
  };

  const isPasswordMatched = (values) => {
    if (values.password !== values.confirmPassword) {
      setMessage("Password did not match Confirm Password");
      setLoading(false);
      return false;
    }
		return true
  };

  return (
    <div className={className}>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSignUp)}>
        <FormContainer>
          <FormItem
            label="User Name"
            invalid={errors.username}
            errorMessage="User name is required!"
          >
            <Input
              {...register("username", { required: true })}
              type="text"
              placeholder="User Name"
            />
          </FormItem>
          <FormItem
            label="Email"
            invalid={errors.email}
            errorMessage="Email is required!"
          >
            <Input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
            />
          </FormItem>
          <FormItem
            label="Password"
            invalid={errors.password}
            errorMessage="Password is required!"
          >
            <Input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
            />
          </FormItem>
          <FormItem
            label="Confirm Password"
            invalid={errors.confirmPassword}
            errorMessage="Password Confirmation is required!"
          >
            <Input
              {...register("confirmPassword", { required: true })}
              type="password"
              placeholder="Confirm Password"
            />
          </FormItem>
          <Button
            block
            loading={loading}
            variant="solid"
            type="submit"
            disabled={disableSubmit}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <ActionLink to={signInUrl}>Sign in</ActionLink>
          </div>
        </FormContainer>
      </form>
    </div>
  );
};

export default SignUpForm;
