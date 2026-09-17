<script>
  import { FormGroup, InputLabel, Select, SelectOption } from "@i-dot-ai-npm/component-library-svelte";
</script>

<FormGroup inline>
  <InputLabel for="select-1">Label text goes here</InputLabel>
  <Select id="select-1" name="select-1" subtle>
    <SelectOption value="1">GOV.UK frontend option 1</SelectOption>
    <SelectOption value="2" selected>GOV.UK frontend option 2</SelectOption>
    <SelectOption value="3" disabled>GOV.UK frontend option 3</SelectOption>
  </Select>
</FormGroup>
