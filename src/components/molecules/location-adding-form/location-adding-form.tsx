import { SubmitHandler, useForm } from "react-hook-form";

import { useLocalizedStrings } from "../../../lib/hooks/use-localized-strings";
import { FormWrapper } from "../../atoms/form-wrapper/form-wrapper";
import { Input } from "../../atoms/input/input";
import { InputContainer } from "../../atoms/input-container/input-container";
import { i18n } from "./location-adding-form.i18n";

export type LocationAddingFormProps = {
  onChange: (values: Partial<LocationAddingFormInputs>) => void;
};

export type LocationAddingFormInputs = {
  location: string;
  name: string;
};

export const LocationAddingForm = ({ onChange }: LocationAddingFormProps) => {
  const { strings } = useLocalizedStrings(i18n);
  const { register, handleSubmit, watch } = useForm<LocationAddingFormInputs>({
    defaultValues: { location: "", name: "" },
  });

  watch((data) => onChange(data));

  const onSubmit: SubmitHandler<LocationAddingFormInputs> = (data) =>
    console.log(data);
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <InputContainer label={strings.location}>
        <Input {...register("location")} />
      </InputContainer>
      <InputContainer label={strings.name}>
        <Input {...register("name")} />
      </InputContainer>
    </FormWrapper>
  );
};
