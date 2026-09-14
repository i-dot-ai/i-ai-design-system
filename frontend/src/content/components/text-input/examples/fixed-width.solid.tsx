import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";
import Input from "@i-dot-ai-npm/component-library-solid/input/Input";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="input-width">National Insurance number</InputLabel>
      <Input id="input-width" name="input-width" width={10} />
    </FormGroup>
  );
}
