import { FormGroup, InputLabel, Textarea } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="textarea-default">Can you provide more detail?</InputLabel>
      <Textarea id="textarea-default" name="textarea-default" rows="5" />
    </FormGroup>
  );
}
