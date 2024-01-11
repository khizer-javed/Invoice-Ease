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
import { Controller, useForm } from "react-hook-form";
import { ActionLink } from "@/components/shared";
import useAuth from "@/utils/hooks/useAuth";
import { PasswordInput } from "@/components/shared";

const SignInForm = (props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
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
            asterisk
            invalid={errors.username}
            errorMessage="User Name is required!"
          >
            <Controller
              control={control}
              name="username"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="username"
                  placeholder="User Name"
                  autoComplete="off"
                  {...field}
                />
              )}
            />
          </FormItem>

          <FormItem
            label="Password"
            asterisk
            invalid={errors.password}
            errorMessage="Password is required!"
          >
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                <PasswordInput
                  type="password"
                  placeholder="Password"
                  {...field}
                  autoComplete="current-password"
                />
              )}
            />
          </FormItem>

          <div className="flex justify-between mb-6">
            <Controller
              control={control}
              name="rememberMe"
              render={({ field }) => (
                <Checkbox className="mb-0" children="Remember Me" {...field} />
              )}
            />
            {/* <ActionLink to={forgotPasswordUrl}>Forgot Password?</ActionLink> */}
          </div>

          <Button
            className="mb-2"
            block
            loading={loading}
            variant="solid"
            type="submit"
            disabled={disableSubmit}
          >
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
