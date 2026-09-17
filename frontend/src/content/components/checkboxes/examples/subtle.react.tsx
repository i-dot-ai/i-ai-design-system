import { FormGroup, Fieldset, FieldsetLegend, Checkboxes, CheckboxItem, CheckboxInput, CheckboxLabel } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup>
      <Fieldset>
        <FieldsetLegend>What is your nationality?</FieldsetLegend>
        <Checkboxes subtle>
          <CheckboxItem>
            <CheckboxInput
              id="nationality-subtle"
              name="nationality-subtle"
              value="british"
            />
            <CheckboxLabel htmlFor="nationality-subtle"> British </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput
              id="nationality-subtle-2"
              name="nationality-subtle"
              value="irish"
            />
            <CheckboxLabel htmlFor="nationality-subtle-2"> Irish </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput
              id="nationality-subtle-3"
              name="nationality-subtle"
              value="other"
            />
            <CheckboxLabel htmlFor="nationality-subtle-3">
              Citizen of another country
            </CheckboxLabel>
          </CheckboxItem>
        </Checkboxes>
      </Fieldset>
    </FormGroup>
  );
}
