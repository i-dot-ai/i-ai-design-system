<script>
  import { FormGroup, InputLabel, Textarea } from "@i-dot-ai-npm/component-library-svelte";
</script>

<FormGroup class="govuk-form-group--error">
  <InputLabel for="textarea-error">Can you provide more detail?</InputLabel>
  <Textarea id="textarea-error" name="textarea-error" rows="5" error />
</FormGroup>
