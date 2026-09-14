<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import InputLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
  import Textarea from "@i-dot-ai-npm/component-library-svelte/textarea/Textarea.svelte";
</script>

<FormGroup class="govuk-form-group--error">
  <InputLabel for="textarea-error">Can you provide more detail?</InputLabel>
  <Textarea id="textarea-error" name="textarea-error" rows="5" error />
</FormGroup>
