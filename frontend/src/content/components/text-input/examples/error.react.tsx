import { FormGroup, InputLabel, Input } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup className="govuk-form-group--error">
      <InputLabel htmlFor="input-error">National Insurance number</InputLabel>
      <Input id="input-error" name="input-error" error />
    </FormGroup>
  );
}
