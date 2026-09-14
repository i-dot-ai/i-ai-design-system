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
        <Radios>
          <RadioItem>
            <RadioInput id="changed-name" name="changed-name" value="yes" />
            <InputLabel htmlFor="changed-name" className="govuk-radios__label">Yes</InputLabel>
          </RadioItem>
          <RadioItem>
            <RadioInput id="changed-name-2" name="changed-name" value="no" />
            <InputLabel htmlFor="changed-name-2" className="govuk-radios__label">No</InputLabel>
          </RadioItem>
        </Radios>
      </Fieldset>
    </FormGroup>
  );
}
