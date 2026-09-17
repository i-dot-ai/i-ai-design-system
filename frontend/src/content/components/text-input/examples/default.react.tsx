import { FormGroup, InputLabel, Input } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel htmlFor="input-default">National Insurance number</InputLabel>
      <Input id="input-default" name="input-default" />
    </FormGroup>
  );
}
