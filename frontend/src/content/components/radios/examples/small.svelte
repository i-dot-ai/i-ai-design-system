<script>
  import { FormGroup, Fieldset, FieldsetLegend, Radios, RadioItem, RadioInput, InputLabel } from "@i-dot-ai-npm/component-library-svelte";
</script>

<FormGroup>
  <Fieldset>
    <FieldsetLegend>Have you changed your name?</FieldsetLegend>
    <Radios small>
      <RadioItem>
        <RadioInput id="changed-name-small" name="changed-name-small" value="yes" />
        <InputLabel for="changed-name-small" class="govuk-radios__label">Yes</InputLabel>
      </RadioItem>
      <RadioItem>
        <RadioInput id="changed-name-small-2" name="changed-name-small" value="no" />
        <InputLabel for="changed-name-small-2" class="govuk-radios__label">No</InputLabel>
      </RadioItem>
    </Radios>
  </Fieldset>
</FormGroup>
