import { FormGroup, InputLabel, Input } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel htmlFor="input-width">National Insurance number</InputLabel>
      <Input id="input-width" name="input-width" width={10} />
    </FormGroup>
  );
}
