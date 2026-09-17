import { FormGroup, InputLabel, Input } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel htmlFor="input-subtle">National Insurance number</InputLabel>
      <Input id="input-subtle" name="input-subtle" subtle />
    </FormGroup>
  );
}
