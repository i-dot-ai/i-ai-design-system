import { FormGroup, InputLabel, Input } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="input-subtle">National Insurance number</InputLabel>
      <Input id="input-subtle" name="input-subtle" subtle />
    </FormGroup>
  );
}
