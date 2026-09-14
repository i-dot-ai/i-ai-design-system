<script>
  import FormGroup from "@i-dot-ai-npm/component-library-svelte/form-group/FormGroup.svelte";
  import InputLabel from "@i-dot-ai-npm/component-library-svelte/input-label/InputLabel.svelte";
  import CharacterCount from "@i-dot-ai-npm/component-library-svelte/character-count/CharacterCount.svelte";
  import CharacterCountMessage from "@i-dot-ai-npm/component-library-svelte/character-count/CharacterCountMessage.svelte";
</script>

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
