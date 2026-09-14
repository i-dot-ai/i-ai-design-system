import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";
import PasswordInput from "@i-dot-ai-npm/component-library-solid/password-input/PasswordInput";

export default function Example() {
  return (
    <FormGroup class="govuk-password-input" data-module="govuk-password-input">
      <InputLabel for="password">Password</InputLabel>
      <PasswordInput id="password" name="password" />
    </FormGroup>
  );
}
