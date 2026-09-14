import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import Fieldset from "@i-dot-ai-npm/component-library-react/fieldset/Fieldset";
import FieldsetLegend from "@i-dot-ai-npm/component-library-react/fieldset/FieldsetLegend";
import Checkboxes from "@i-dot-ai-npm/component-library-react/checkboxes/Checkboxes";
import CheckboxItem from "@i-dot-ai-npm/component-library-react/checkboxes/CheckboxItem";
import CheckboxInput from "@i-dot-ai-npm/component-library-react/checkboxes/CheckboxInput";
import CheckboxLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";

export default function Example() {
  return (
    <FormGroup>
      <Fieldset>
        <FieldsetLegend>What is your nationality?</FieldsetLegend>
        <Checkboxes small>
          <CheckboxItem>
            <CheckboxInput
              id="nationality-small"
              name="nationality-small"
              value="british"
            />>
              British
            </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput
              id="nationality-small-2"
              name="nationality-small"
              value="irish"
            />>
              Irish
            </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput
              id="nationality-small-3"
              name="nationality-small"
              value="other"
            />>
              Citizen of another country
            </CheckboxLabel>
          </CheckboxItem>
        </Checkboxes>
      </Fieldset>
    </FormGroup>
  );
}
