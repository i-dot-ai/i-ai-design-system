import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";
import Textarea from "@i-dot-ai-npm/component-library-solid/textarea/Textarea";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="textarea-subtle">Can you provide more detail?</InputLabel>
      <Textarea id="textarea-subtle" name="textarea-subtle" rows="5" subtle />
    </FormGroup>
  );
}
