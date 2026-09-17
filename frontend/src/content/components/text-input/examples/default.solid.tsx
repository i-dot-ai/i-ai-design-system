import { FormGroup, InputLabel, Input } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="input-default">National Insurance number</InputLabel>
      <Input id="input-default" name="input-default" />
    </FormGroup>
  );
}
