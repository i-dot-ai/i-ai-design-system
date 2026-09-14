import FormGroup from "@i-dot-ai-npm/component-library-solid/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-solid/input-label/InputLabel";
import CharacterCount from "@i-dot-ai-npm/component-library-solid/character-count/CharacterCount";
import CharacterCountMessage from "@i-dot-ai-npm/component-library-solid/character-count/CharacterCountMessage";

export default function Example() {
  return (
    <FormGroup
      class="govuk-character-count"
      data-module="govuk-character-count"
      data-maxlength={10}
    >
      <InputLabel for="more-detail">Can you provide more detail?</InputLabel>
      <CharacterCount
        id="more-detail"
        name="more-detail"
        rows="5"
        aria-describedby="more-detail-info"
      />
      <CharacterCountMessage id="more-detail-info">
        You can enter up to 10 characters
      </CharacterCountMessage>
    </FormGroup>
  );
}
