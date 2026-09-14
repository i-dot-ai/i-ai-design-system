<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import InputLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
  import Hint from "@i-dot-ai-npm/component-library-svelte/hint/Hint.svelte";
  import Input from "@i-dot-ai-npm/component-library-svelte/input/Input.svelte";
</script>

<FormGroup>
  <InputLabel for="input-hint">National Insurance number</InputLabel>
  <Hint id="input-hint-hint">
    It’s on your National Insurance card, benefit letter, payslip or P60.
  </Hint>
  <Input
    id="input-hint"
    name="input-hint"
    aria-describedby="input-hint-hint"
  />
</FormGroup>
