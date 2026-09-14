import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";
import Input from "@i-dot-ai-npm/component-library-react/input/Input";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel htmlFor="input-width">National Insurance number</InputLabel>
      <Input id="input-width" name="input-width" width={10} />
    </FormGroup>
  );
}
