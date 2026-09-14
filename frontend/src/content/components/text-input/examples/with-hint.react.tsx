import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";
import Hint from "@i-dot-ai-npm/component-library-react/hint/Hint";
import Input from "@i-dot-ai-npm/component-library-react/input/Input";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel htmlFor="input-hint">National Insurance number</InputLabel>
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
