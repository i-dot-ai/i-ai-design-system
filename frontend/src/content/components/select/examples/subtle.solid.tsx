import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";
import Select from "@i-dot-ai-npm/component-library-solid/select/Select";
import SelectOption from "@i-dot-ai-npm/component-library-solid/select/SelectOption";

export default function Example() {
  return (
    <FormGroup inline>
      <InputLabel for="select-1">Label text goes here</InputLabel>
      <Select id="select-1" name="select-1" subtle>
        <SelectOption value="1">GOV.UK frontend option 1</SelectOption>
        <SelectOption value="2" selected>GOV.UK frontend option 2</SelectOption>
        <SelectOption value="3" disabled>GOV.UK frontend option 3</SelectOption>
      </Select>
    </FormGroup>
  );
}
