import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";
import Input from "@i-dot-ai-npm/component-library-react/input/Input";

export default function Example() {
  return (
    <FormGroup className="govuk-form-group--error">
      <InputLabel htmlFor="input-error">National Insurance number</InputLabel>
      <Input id="input-error" name="input-error" error />
    </FormGroup>
  );
}
