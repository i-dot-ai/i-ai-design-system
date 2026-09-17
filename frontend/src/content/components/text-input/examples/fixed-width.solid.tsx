import { FormGroup, InputLabel, Input } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="input-width">National Insurance number</InputLabel>
      <Input id="input-width" name="input-width" width={10} />
    </FormGroup>
  );
}
