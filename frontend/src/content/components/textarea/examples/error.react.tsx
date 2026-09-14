import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";
import Textarea from "@i-dot-ai-npm/component-library-react/textarea/Textarea";

export default function Example() {
  return (
    <FormGroup className="govuk-form-group--error">
      <InputLabel htmlFor="textarea-error">Can you provide more detail?</InputLabel>
      <Textarea id="textarea-error" name="textarea-error" rows="5" error />
    </FormGroup>
  );
}
