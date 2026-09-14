import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";
import Input from "@i-dot-ai-npm/component-library-solid/input/Input";

export default function Example() {
  return (
    <FormGroup class="govuk-form-group--error">
      <InputLabel for="input-error">National Insurance number</InputLabel>
      <Input id="input-error" name="input-error" error />
    </FormGroup>
  );
}
