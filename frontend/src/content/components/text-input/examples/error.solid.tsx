import { FormGroup, InputLabel, Input } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <FormGroup class="govuk-form-group--error">
      <InputLabel for="input-error">National Insurance number</InputLabel>
      <Input id="input-error" name="input-error" error />
    </FormGroup>
  );
}
