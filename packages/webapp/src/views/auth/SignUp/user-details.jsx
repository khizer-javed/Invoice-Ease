import { PasswordInput } from "@/components/shared";
import { FormContainer, FormItem, Button, Input } from "@/components/ui";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

const UserDetails = (props) => {
  const { nextStep, step, signupData = {} } = props;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const watcher = useWatch({ control });

  const submit = (values = {}) => {
    nextStep(values?.userdata);
  };

  useEffect(() => {
    if (signupData?.email) {
      setValue("userdata", signupData);
    }
  }, [step]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormContainer>
        <FormItem
          label="User Name"
          asterisk
          invalid={errors.userdata?.username}
          errorMessage="User name is required!"
        >
          <Controller
            control={control}
            name="userdata.username"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="User Name"
                autocomplete="off"
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Email"
          asterisk
          invalid={errors.userdata?.email}
          errorMessage="Email is required!"
        >
          <Controller
            control={control}
            rules={{ required: true }}
            name="userdata.email"
            render={({ field }) => (
              <Input type="email" placeholder="Email" {...field} />
            )}
          />
        </FormItem>

        <FormItem
          label="Password"
          asterisk
          invalid={errors.userdata?.password}
          errorMessage="Password is required!"
        >
          <Controller
            control={control}
            name="userdata.password"
            rules={{ required: true }}
            render={({ field }) => (
              <PasswordInput
                type="password"
                placeholder="Password"
                {...field}
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Confirm Password"
          asterisk
          invalid={errors.userdata?.confirmPassword}
          errorMessage="Password mis match!"
        >
          <Controller
            control={control}
            name="userdata.confirmPassword"
            rules={{
              validate: () => watcher?.password === watcher?.confirmPassword,
            }}
            render={({ field }) => (
              <PasswordInput
                type="password"
                placeholder="Confirm Password"
                {...field}
              />
            )}
          />
        </FormItem>
        <Button block variant="solid" type="submit">
          Next
        </Button>
      </FormContainer>
    </form>
  );
};

export default UserDetails;
