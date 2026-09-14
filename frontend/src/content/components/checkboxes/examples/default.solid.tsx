import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import Fieldset from "@i-dot-ai-npm/component-library-solid/fieldset/Fieldset";
import FieldsetLegend from "@i-dot-ai-npm/component-library-solid/fieldset/FieldsetLegend";
import Checkboxes from "@i-dot-ai-npm/component-library-solid/checkboxes/Checkboxes";
import CheckboxItem from "@i-dot-ai-npm/component-library-solid/checkboxes/CheckboxItem";
import CheckboxInput from "@i-dot-ai-npm/component-library-solid/checkboxes/CheckboxInput";
import CheckboxLabel from "@i-dot-ai-npm/component-library-solid/checkboxes/CheckboxLabel";

export default function Example() {
  return (
    <FormGroup>
      <Fieldset>
        <FieldsetLegend>What is your nationality?</FieldsetLegend>
        <Checkboxes>
          <CheckboxItem>
            <CheckboxInput id="nationality" name="nationality" value="british" />
            <CheckboxLabel for="nationality"> British </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput id="nationality-2" name="nationality" value="irish" />
            <CheckboxLabel for="nationality-2"> Irish </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput id="nationality-3" name="nationality" value="other" />
            <CheckboxLabel for="nationality-3">
              Citizen of another country
            </CheckboxLabel>
          </CheckboxItem>
        </Checkboxes>
      </Fieldset>
    </FormGroup>
  );
}
