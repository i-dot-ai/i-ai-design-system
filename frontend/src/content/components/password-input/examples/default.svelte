<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import InputLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
  import PasswordInput from "@i-dot-ai-npm/component-library-svelte/password-input/PasswordInput.svelte";
</script>

<FormGroup class="govuk-password-input" data-module="govuk-password-input">
  <InputLabel for="password">Password</InputLabel>
  <PasswordInput id="password" name="password" />
</FormGroup>
