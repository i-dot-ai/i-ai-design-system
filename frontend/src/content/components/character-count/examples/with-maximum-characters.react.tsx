import FormGroup from "@i-dot-ai-npm/component-library-react/form-group/FormGroup";
import InputLabel from "@i-dot-ai-npm/component-library-react/input-label/InputLabel";
import CharacterCount from "@i-dot-ai-npm/component-library-react/character-count/CharacterCount";
import CharacterCountMessage from "@i-dot-ai-npm/component-library-react/character-count/CharacterCountMessage";

export default function Example() {
  return (
    <FormGroup
      className="govuk-character-count"
      data-module="govuk-character-count"
      data-maxlength={10}
    >
      <InputLabel htmlFor="more-detail">Can you provide more detail?</InputLabel>
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
