<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import Fieldset from "@i-dot-ai-npm/component-library-svelte/fieldset/Fieldset.svelte";
  import FieldsetLegend from "@i-dot-ai-npm/component-library-svelte/fieldset/FieldsetLegend.svelte";
  import Checkboxes from "@i-dot-ai-npm/component-library-svelte/checkboxes/Checkboxes.svelte";
  import CheckboxItem from "@i-dot-ai-npm/component-library-svelte/checkboxes/CheckboxItem.svelte";
  import CheckboxInput from "@i-dot-ai-npm/component-library-svelte/checkboxes/CheckboxInput.svelte";
  import CheckboxLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
</script>

<FormGroup>
  <Fieldset>
    <FieldsetLegend>What is your nationality?</FieldsetLegend>
    <Checkboxes subtle>
      <CheckboxItem>
        <CheckboxInput
          id="nationality-subtle"
          name="nationality-subtle"
          value="british"
        />>
          British
        </CheckboxLabel>
      </CheckboxItem>
      <CheckboxItem>
        <CheckboxInput
          id="nationality-subtle-2"
          name="nationality-subtle"
          value="irish"
        />>
          Irish
        </CheckboxLabel>
      </CheckboxItem>
      <CheckboxItem>
        <CheckboxInput
          id="nationality-subtle-3"
          name="nationality-subtle"
          value="other"
        />>
          Citizen of another country
        </CheckboxLabel>
      </CheckboxItem>
    </Checkboxes>
  </Fieldset>
</FormGroup>
