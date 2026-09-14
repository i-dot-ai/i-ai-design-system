import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";
import Select from "@i-dot-ai-npm/component-library-react/select/Select";
import SelectOption from "@i-dot-ai-npm/component-library-react/select/SelectOption";

export default function Example() {
  return (
    <FormGroup inline>
      <InputLabel htmlFor="select-3">Label text goes here</InputLabel>
      <Select id="select-3" name="select-3" error>
        <SelectOption value="1">GOV.UK frontend option 1</SelectOption>
        <SelectOption value="2" selected>GOV.UK frontend option 2</SelectOption>
        <SelectOption value="3" disabled>GOV.UK frontend option 3</SelectOption>
      </Select>
    </FormGroup>
  );
}
