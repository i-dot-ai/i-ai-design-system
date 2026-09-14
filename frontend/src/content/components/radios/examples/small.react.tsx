import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import Fieldset from "@i-dot-ai-npm/component-library-react/fieldset/Fieldset";
import FieldsetLegend from "@i-dot-ai-npm/component-library-react/fieldset/FieldsetLegend";
import Radios from "@i-dot-ai-npm/component-library-react/radios/Radios";
import RadioItem from "@i-dot-ai-npm/component-library-react/radios/RadioItem";
import RadioInput from "@i-dot-ai-npm/component-library-react/radios/RadioInput";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";

export default function Example() {
  return (
    <FormGroup>
      <Fieldset>
        <FieldsetLegend>Have you changed your name?</FieldsetLegend>
        <Radios small>
          <RadioItem>
            <RadioInput id="changed-name-small" name="changed-name-small" value="yes" />
            <InputLabel htmlFor="changed-name-small" className="govuk-radios__label">Yes</InputLabel>
          </RadioItem>
          <RadioItem>
            <RadioInput id="changed-name-small-2" name="changed-name-small" value="no" />
            <InputLabel htmlFor="changed-name-small-2" className="govuk-radios__label">No</InputLabel>
          </RadioItem>
        </Radios>
      </Fieldset>
    </FormGroup>
  );
}
