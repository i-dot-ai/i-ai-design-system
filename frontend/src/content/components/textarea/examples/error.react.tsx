import { FormGroup, InputLabel, Textarea } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup className="govuk-form-group--error">
      <InputLabel htmlFor="textarea-error">Can you provide more detail?</InputLabel>
      <Textarea id="textarea-error" name="textarea-error" rows="5" error />
    </FormGroup>
  );
}
