import { FormGroup, InputLabel, FileUpload } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="file-upload-1">Upload a file</InputLabel>
      <FileUpload id="file-upload-1" name="file-upload-1" />
    </FormGroup>
  );
}
