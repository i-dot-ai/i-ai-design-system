import { FormGroup, Fieldset, FieldsetLegend, Radios, RadioItem, RadioInput, InputLabel } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup>
      <Fieldset>
        <FieldsetLegend>Have you changed your name?</FieldsetLegend>
        <Radios>
          <RadioItem>
            <RadioInput id="changed-name" name="changed-name" value="yes" />
            <InputLabel htmlFor="changed-name" className="govuk-radios__label">Yes</InputLabel>
          </RadioItem>
          <RadioItem>
            <RadioInput id="changed-name-2" name="changed-name" value="no" />
            <InputLabel htmlFor="changed-name-2" className="govuk-radios__label">No</InputLabel>
          </RadioItem>
        </Radios>
      </Fieldset>
    </FormGroup>
  );
}
