import React, { useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  FormItem,
  FormContainer,
  Notification,
  toast,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { ActionLink } from "@/components/shared";
import useAuth from "@/utils/hooks/useAuth";

const SignInForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = "/forgot-password",
    signUpUrl = "/sign-up",
  } = props;

  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const onSubmit = async (values) => {
    setLoading(true);
    const result = await signIn(values);
    setLoading(false);
    if (result.status === "failed") {
      toast.push(
        <Notification className="mb-4" type="danger">
          {result.message}
        </Notification>
      );
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <FormItem
            label="User Name"
            invalid={errors.username}
            errorMessage='User Name is required!'
          >
            <Input
              {...register("username", { required: true })}
              type="text"
              placeholder="User Name"
            />
          </FormItem>

          <FormItem
            label="Password"
            invalid={errors.password}
            errorMessage='Password is required!'
          >
            <Input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
            />
          </FormItem>

          <div className="flex justify-between mb-6">
            <Checkbox
              {...register("rememberMe")}
              id="rememberMe"
              className="mb-0"
              children="Remember Me"
            />
            {/* <ActionLink to={forgotPasswordUrl}>Forgot Password?</ActionLink> */}
          </div>

          <Button block loading={loading} variant="solid" type="submit" disabled={disableSubmit}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="mt-4 text-center">
            <span>Don't have an account yet? </span>
            <ActionLink to={signUpUrl}>Sign up</ActionLink>
          </div>
        </FormContainer>
      </form>
    </div>
  );
};
export default SignInForm;
