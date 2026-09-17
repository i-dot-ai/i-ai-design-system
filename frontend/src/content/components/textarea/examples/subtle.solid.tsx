import { FormGroup, InputLabel, Textarea } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="textarea-subtle">Can you provide more detail?</InputLabel>
      <Textarea id="textarea-subtle" name="textarea-subtle" rows="5" subtle />
    </FormGroup>
  );
}
