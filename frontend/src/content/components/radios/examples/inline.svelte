<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import Fieldset from "@i-dot-ai-npm/component-library-svelte/fieldset/Fieldset.svelte";
  import FieldsetLegend from "@i-dot-ai-npm/component-library-svelte/fieldset/FieldsetLegend.svelte";
  import Radios from "@i-dot-ai-npm/component-library-svelte/radios/Radios.svelte";
  import RadioItem from "@i-dot-ai-npm/component-library-svelte/radios/RadioItem.svelte";
  import RadioInput from "@i-dot-ai-npm/component-library-svelte/radios/RadioInput.svelte";
  import InputLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
</script>

<FormGroup>
  <Fieldset>
    <FieldsetLegend>Have you changed your name?</FieldsetLegend>
    <Radios inline>
      <RadioItem>
        <RadioInput id="changed-name-inline" name="changed-name-inline" value="yes" />
        <InputLabel for="changed-name-inline" class="govuk-radios__label">Yes</InputLabel>
      </RadioItem>
      <RadioItem>
        <RadioInput id="changed-name-inline-2" name="changed-name-inline" value="no" />
        <InputLabel for="changed-name-inline-2" class="govuk-radios__label">No</InputLabel>
      </RadioItem>
    </Radios>
  </Fieldset>
</FormGroup>
