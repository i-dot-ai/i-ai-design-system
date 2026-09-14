<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import Fieldset from "@i-dot-ai-npm/component-library-svelte/fieldset/Fieldset.svelte";
  import FieldsetLegend from "@i-dot-ai-npm/component-library-svelte/fieldset/FieldsetLegend.svelte";
  import Checkboxes from "@i-dot-ai-npm/component-library-svelte/checkboxes/Checkboxes.svelte";
  import CheckboxItem from "@i-dot-ai-npm/component-library-svelte/checkboxes/CheckboxItem.svelte";
  import CheckboxInput from "@i-dot-ai-npm/component-library-svelte/checkboxes/CheckboxInput.svelte";
  import CheckboxLabel from "@i-dot-ai-npm/component-library-svelte/checkboxes/CheckboxLabel.svelte";
</script>

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
