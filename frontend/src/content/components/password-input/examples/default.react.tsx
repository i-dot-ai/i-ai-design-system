import { FormGroup, InputLabel, PasswordInput } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup className="govuk-password-input" data-module="govuk-password-input">
      <InputLabel htmlFor="password">Password</InputLabel>
      <PasswordInput id="password" name="password" />
    </FormGroup>
  );
}
