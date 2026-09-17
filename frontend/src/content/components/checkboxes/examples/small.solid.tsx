import { FormGroup, Fieldset, FieldsetLegend, Checkboxes, CheckboxItem, CheckboxInput, CheckboxLabel } from "@i-dot-ai-npm/component-library-solid";

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
            />
            <CheckboxLabel for="nationality-small"> British </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput
              id="nationality-small-2"
              name="nationality-small"
              value="irish"
            />
            <CheckboxLabel for="nationality-small-2"> Irish </CheckboxLabel>
          </CheckboxItem>
          <CheckboxItem>
            <CheckboxInput
              id="nationality-small-3"
              name="nationality-small"
              value="other"
            />
            <CheckboxLabel for="nationality-small-3">
              Citizen of another country
            </CheckboxLabel>
          </CheckboxItem>
        </Checkboxes>
      </Fieldset>
    </FormGroup>
  );
}
