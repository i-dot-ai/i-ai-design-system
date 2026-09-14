import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";
import PasswordInput from "@i-dot-ai-npm/component-library-react/password-input/PasswordInput";

export default function Example() {
  return (
    <FormGroup className="govuk-password-input" data-module="govuk-password-input">
      <InputLabel htmlFor="password">Password</InputLabel>
      <PasswordInput id="password" name="password" />
    </FormGroup>
  );
}
