import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";
import Textarea from "@i-dot-ai-npm/component-library-react/textarea/Textarea";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel htmlFor="textarea-default">Can you provide more detail?</InputLabel>
      <Textarea id="textarea-default" name="textarea-default" rows="5" />
    </FormGroup>
  );
}
