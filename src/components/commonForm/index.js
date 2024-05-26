import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CommonForm(props) {
  const {
    action: formAction,
    controls: formControls,
    buttonType,
    buttonText,
    isButtonDisabled,
    formData,
    setFormData,
    handleFileChange,
  } = props;

  return (
    <form action={formAction}>
      {formControls.map((formControl) => {
        if (formControl.componentType === "file")
          return (
            <Label
              for={formControl.name}
              className="flex bg-gray-100 items-center px-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
            >
              <h2>{formControl.label}</h2>
              <Input
                onChange={handleFileChange}
                id={formControl.name}
                type="file"
              />
            </Label>
          );
        //   if (formControl.componentType === "input")
        else
          return (
            <div className="relative flex items-center mt-8">
              <Input
                type="text"
                {...formControl}
                id={formControl.name}
                value={formData[formControl.name]}
                onChange={({ target }) =>
                  setFormData({
                    ...formData,
                    [target.name]: target.value,
                  })
                }
                className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          );
      })}
      <div className="mt-6 w-full">
        <Button
          type={buttonType || "submit"}
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
          disabled={isButtonDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
