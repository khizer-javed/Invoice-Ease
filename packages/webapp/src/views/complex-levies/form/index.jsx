import {
  Dialog,
  FormContainer,
  Input,
  Card,
  Button,
  toast,
  Notification,
  Badge,
  Select,
} from "@/components/ui";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { RiSave2Line } from "react-icons/ri";
import { FormRow } from "@/components/shared";
import { useParams } from "react-router-dom";
import { saveHomeLoan } from "@/services/home-loan";
import { HiCheck } from "react-icons/hi";
import { components } from "react-select";

const { Control } = components;

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
      {...innerProps}
    >
      <div className="flex items-center">
        <Badge className={`bg-${data.value}-500`} />
        <span className="ml-2 rtl:mr-2 capitalize">{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CustomControl = ({ children, ...props }) => {
  const selected = props.getValue()[0];
  return (
    <Control className="capitalize" {...props}>
      {selected && <Badge className={`${selected.color} ltr:ml-4 rtl:mr-4`} />}
      {children}
    </Control>
  );
};

const HomeLoanForm = (props) => {
  const { isEdit = false, open = false, onClose, data = {} } = props;
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({
    defaultValues: {
      values: {
        label: null,
        color: null,
      },
    },
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && data) {
      const values = _.pick(data, ["id", "label", "companyId"]);
      setValue("values", values);
    }
  }, [isEdit]);

  const handleDialogClose = () => {
    onClose();
    setTimeout(() => {
      reset();
    }, 700);
  };

  const onSubmit = async ({ values }) => {
    // try {
    //   values.companyId = params.companyId;
    //   values.color = values.color.value;
    //   setLoading(true);
    //   const response = await saveHomeLoan(values);
    //   setLoading(false);
    //   toast.push(
    //     <Notification className="mb-4" type="success">
    //       {response?.data.message}
    //     </Notification>
    //   );
    //   handleDialogClose();
    // } catch (error) {
    //   setLoading(false);
    //   toast.push(
    //     <Notification className="mb-4" type="danger">
    //       {error?.response?.data.message}
    //     </Notification>
    //   );
    // }
  };

  return (
    <Dialog
      isOpen={open}
      onClose={handleDialogClose}
      onRequestClose={handleDialogClose}
      shouldCloseOnOverlayClick={false}
      contentClassName="bg-[#F3F4F6] px-0 py-0"
      bodyOpenClassName="overflow-hidden"
    >
      <h4 className="p-4 dark:bg-gray-700 bg-white rounded-tl-lg rounded-tr-lg">{`${
        isEdit ? "Edit" : "Add New"
      } Complex Levies`}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <div className="p-4">
            <Card className="dark:bg-gray-700 bg-white">
              <h1>Form Fields</h1>
              {/* <FormRow
                asterisk
                label="Home Loan"
                invalid={errors.values?.label}
                errorMessage="HomeLoan is required!"
              >
                <Controller
                  control={control}
                  name="values.label"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input type="text" placeholder="HomeLoan" {...field} />
                  )}
                />
              </FormRow>

              <FormRow
                border={false}
                asterisk
                label="Color"
                invalid={errors.values?.color}
                errorMessage="Color is required!"
              >
                <Controller
                  control={control}
                  name="values.color"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={colorOptions}
                      components={{
                        Option: CustomSelectOption,
                        Control: CustomControl,
                      }}
                    />
                  )}
                />
              </FormRow> */}
            </Card>
          </div>
          <div className="p-4 flex items-center justify-end dark:bg-gray-700 bg-white rounded-bl-lg rounded-br-lg">
            <Button
              type="button"
              size="sm"
              className="w-50 mr-2"
              onClick={handleDialogClose}
            >
              Cancel
            </Button>
            <Button
              icon={<RiSave2Line />}
              type="submit"
              variant="solid"
              size="sm"
              className="w-50"
              loading={loading}
            >
              {isEdit ? "Update" : "Save"}
            </Button>
          </div>
        </FormContainer>
      </form>
    </Dialog>
  );
};
export default HomeLoanForm;
