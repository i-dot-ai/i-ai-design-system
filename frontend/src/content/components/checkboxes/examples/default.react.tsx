import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import Fieldset from "@i-dot-ai-npm/component-library-react/fieldset/Fieldset";
import FieldsetLegend from "@i-dot-ai-npm/component-library-react/fieldset/FieldsetLegend";
import Checkboxes from "@i-dot-ai-npm/component-library-react/checkboxes/Checkboxes";
import CheckboxItem from "@i-dot-ai-npm/component-library-react/checkboxes/CheckboxItem";
import CheckboxInput from "@i-dot-ai-npm/component-library-react/checkboxes/CheckboxInput";
import CheckboxLabel from "@i-dot-ai-npm/component-library-react/checkboxes/CheckboxLabel";

export default function Example() {
  return (
    <FormGroup>
      <Fieldset>
        <FieldsetLegend>What is your nationality?</FieldsetLegend>
        <Checkboxes>
          <CheckboxItem>
            <CheckboxInput id="nationality" name="nationality" value="british" />
            <CheckboxLabel htmlFor="nationality"> British </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput id="nationality-2" name="nationality" value="irish" />
            <CheckboxLabel htmlFor="nationality-2"> Irish </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput id="nationality-3" name="nationality" value="other" />
            <CheckboxLabel htmlFor="nationality-3">
              Citizen of another country
            </CheckboxLabel>
          </CheckboxItem>
        </Checkboxes>
      </Fieldset>
    </FormGroup>
  );
}
