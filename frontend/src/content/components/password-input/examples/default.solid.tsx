import { FormGroup, InputLabel, PasswordInput } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <FormGroup class="govuk-password-input" data-module="govuk-password-input">
      <InputLabel for="password">Password</InputLabel>
      <PasswordInput id="password" name="password" />
    </FormGroup>
  );
}
