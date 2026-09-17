import { FormGroup, InputLabel, Hint, Fieldset, FieldsetLegend, DateInput, DateInputItem, DateInputField } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <FormGroup>
      <Fieldset role="group" aria-describedby="dob-hint">
        <FieldsetLegend>What is your date of birth?</FieldsetLegend>
        <Hint id="dob-hint">For example, 31 3 1980</Hint>
        <DateInput id="dob">
          <DateInputItem>
            <FormGroup>
              <InputLabel htmlFor="dob-day" className="govuk-date-input__label">Day</InputLabel>
              <DateInputField id="dob-day" name="day" width={2} />
            </FormGroup>
          </DateInputItem>
          <DateInputItem>
            <FormGroup>
              <InputLabel htmlFor="dob-month" className="govuk-date-input__label">Month</InputLabel>
              <DateInputField id="dob-month" name="month" width={2} />
            </FormGroup>
          </DateInputItem>
          <DateInputItem>
            <FormGroup>
              <InputLabel htmlFor="dob-year" className="govuk-date-input__label">Year</InputLabel>
              <DateInputField id="dob-year" name="year" width={4} />
            </FormGroup>
          </DateInputItem>
        </DateInput>
      </Fieldset>
    </FormGroup>
  );
}
