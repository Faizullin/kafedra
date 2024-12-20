import { ChangeEvent, useState } from "react";

export default function useForm<TFormData>(options: {
  onSubmit: (data: TFormData) => void;
  defaultData: TFormData;
}) {
  options = {
    ...options,
  };
  const [data, setData] = useState<TFormData>(options.defaultData);
  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    return options.onSubmit(data);
  };
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return {
    data,
    onInputChange,
    onSubmit,
  };
}
