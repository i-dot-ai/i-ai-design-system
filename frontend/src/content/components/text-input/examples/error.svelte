<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import InputLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
  import Input from "@i-dot-ai-npm/component-library-svelte/input/Input.svelte";
</script>

<FormGroup class="govuk-form-group--error">
  <InputLabel for="input-error">National Insurance number</InputLabel>
  <Input id="input-error" name="input-error" error />
</FormGroup>
