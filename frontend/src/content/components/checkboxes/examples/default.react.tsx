import { FormGroup, Fieldset, FieldsetLegend, Checkboxes, CheckboxItem, CheckboxInput, CheckboxLabel } from "@i-dot-ai-npm/component-library-react";

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
