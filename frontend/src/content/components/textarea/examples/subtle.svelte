<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import InputLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
  import Textarea from "@i-dot-ai-npm/component-library-svelte/textarea/Textarea.svelte";
</script>

<FormGroup>
  <InputLabel for="textarea-subtle">Can you provide more detail?</InputLabel>
  <Textarea id="textarea-subtle" name="textarea-subtle" rows="5" subtle />
</FormGroup>
