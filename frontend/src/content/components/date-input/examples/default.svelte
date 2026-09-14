<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import InputLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
  import Hint from "@i-dot-ai-npm/component-library-svelte/hint/Hint.svelte";
  import Fieldset from "@i-dot-ai-npm/component-library-svelte/fieldset/Fieldset.svelte";
  import FieldsetLegend from "@i-dot-ai-npm/component-library-svelte/fieldset/FieldsetLegend.svelte";
  import DateInput from "@i-dot-ai-npm/component-library-svelte/date-input/DateInput.svelte";
  import DateInputItem from "@i-dot-ai-npm/component-library-svelte/date-input/DateInputItem.svelte";
  import DateInputField from "@i-dot-ai-npm/component-library-svelte/date-input/DateInputField.svelte";
</script>

<FormGroup>
  <Fieldset role="group" aria-describedby="dob-hint">
    <FieldsetLegend>What is your date of birth?</FieldsetLegend>
    <Hint id="dob-hint">For example, 31 3 1980</Hint>
    <DateInput id="dob">
      <DateInputItem>
        <FormGroup>
          <InputLabel for="dob-day" class="govuk-date-input__label">Day</InputLabel>
          <DateInputField id="dob-day" name="day" width={2} />
        </FormGroup>
      </DateInputItem>
      <DateInputItem>
        <FormGroup>
          <InputLabel for="dob-month" class="govuk-date-input__label">Month</InputLabel>
          <DateInputField id="dob-month" name="month" width={2} />
        </FormGroup>
      </DateInputItem>
      <DateInputItem>
        <FormGroup>
          <InputLabel for="dob-year" class="govuk-date-input__label">Year</InputLabel>
          <DateInputField id="dob-year" name="year" width={4} />
        </FormGroup>
      </DateInputItem>
    </DateInput>
  </Fieldset>
</FormGroup>
