import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";
import FileUpload from "@i-dot-ai-npm/component-library-react/file-upload/FileUpload";

export default function Example() {
  return (
    <FormGroup>
      <InputLabel htmlFor="file-upload-1">Upload a file</InputLabel>
      <FileUpload id="file-upload-1" name="file-upload-1" />
    </FormGroup>
  );
}
