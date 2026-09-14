import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import Fieldset from "@i-dot-ai-npm/component-library-solid/fieldset/Fieldset";
import FieldsetLegend from "@i-dot-ai-npm/component-library-solid/fieldset/FieldsetLegend";
import Radios from "@i-dot-ai-npm/component-library-solid/radios/Radios";
import RadioItem from "@i-dot-ai-npm/component-library-solid/radios/RadioItem";
import RadioInput from "@i-dot-ai-npm/component-library-solid/radios/RadioInput";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";

export default function Example() {
  return (
    <FormGroup>
      <Fieldset>
        <FieldsetLegend>Have you changed your name?</FieldsetLegend>
        <Radios small>
          <RadioItem>
            <RadioInput id="changed-name-small" name="changed-name-small" value="yes" />
            <InputLabel for="changed-name-small" class="govuk-radios__label">Yes</InputLabel>
          </RadioItem>
          <RadioItem>
            <RadioInput id="changed-name-small-2" name="changed-name-small" value="no" />
            <InputLabel for="changed-name-small-2" class="govuk-radios__label">No</InputLabel>
          </RadioItem>
        </Radios>
      </Fieldset>
    </FormGroup>
  );
}
