import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";
import Textarea from "@i-dot-ai-npm/component-library-solid/textarea/Textarea";

export default function Example() {
  return (
    <FormGroup class="govuk-form-group--error">
      <InputLabel for="textarea-error">Can you provide more detail?</InputLabel>
      <Textarea id="textarea-error" name="textarea-error" rows="5" error />
    </FormGroup>
  );
}
