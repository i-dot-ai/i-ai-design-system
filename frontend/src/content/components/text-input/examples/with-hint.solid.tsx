import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";
import Hint from "@i-dot-ai-npm/component-library-solid/hint/Hint";
import Input from "@i-dot-ai-npm/component-library-solid/input/Input";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="input-hint">National Insurance number</InputLabel>
      <Hint id="input-hint-hint">
        It’s on your National Insurance card, benefit letter, payslip or P60.
      </Hint>
      <Input
        id="input-hint"
        name="input-hint"
        aria-describedby="input-hint-hint"
      />
    </FormGroup>
  );
}
