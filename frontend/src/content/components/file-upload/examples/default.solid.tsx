import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";
import FileUpload from "@i-dot-ai-npm/component-library-solid/file-upload/FileUpload";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel for="file-upload-1">Upload a file</InputLabel>
      <FileUpload id="file-upload-1" name="file-upload-1" />
    </FormGroup>
  );
}
