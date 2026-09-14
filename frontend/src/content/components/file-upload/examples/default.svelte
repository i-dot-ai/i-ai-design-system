<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import InputLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
  import FileUpload from "@i-dot-ai-npm/component-library-svelte/file-upload/FileUpload.svelte";
</script>

<FormGroup>
  <InputLabel for="file-upload-1">Upload a file</InputLabel>
  <FileUpload id="file-upload-1" name="file-upload-1" />
</FormGroup>
