import { FormGroup, Fieldset, FieldsetLegend, Radios, RadioItem, RadioInput, InputLabel } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup>
      <Fieldset>
        <FieldsetLegend>Have you changed your name?</FieldsetLegend>
        <Radios small>
          <RadioItem>
            <RadioInput id="changed-name-small" name="changed-name-small" value="yes" />
            <InputLabel htmlFor="changed-name-small" className="govuk-radios__label">Yes</InputLabel>
          </RadioItem>
          <RadioItem>
            <RadioInput id="changed-name-small-2" name="changed-name-small" value="no" />
            <InputLabel htmlFor="changed-name-small-2" className="govuk-radios__label">No</InputLabel>
          </RadioItem>
        </Radios>
      </Fieldset>
    </FormGroup>
  );
}
