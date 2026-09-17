<script>
  import { FormGroup, Fieldset, FieldsetLegend, Checkboxes, CheckboxItem, CheckboxInput, CheckboxLabel } from "@i-dot-ai-npm/component-library-svelte";
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
        />
        <CheckboxLabel for="nationality-subtle"> British </CheckboxLabel>
      </CheckboxItem>
      <CheckboxItem>
        <CheckboxInput
          id="nationality-subtle-2"
          name="nationality-subtle"
          value="irish"
        />
        <CheckboxLabel for="nationality-subtle-2"> Irish </CheckboxLabel>
      </CheckboxItem>
      <CheckboxItem>
        <CheckboxInput
          id="nationality-subtle-3"
          name="nationality-subtle"
          value="other"
        />
        <CheckboxLabel for="nationality-subtle-3">
          Citizen of another country
        </CheckboxLabel>
      </CheckboxItem>
    </Checkboxes>
  </Fieldset>
</FormGroup>
