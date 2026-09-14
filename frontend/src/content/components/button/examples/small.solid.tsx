import Button from "@i-dot-ai-npm/component-library-solid/button/Button";
import ButtonGroup from "@i-dot-ai-npm/component-library-solid/button-group/ButtonGroup";

export default function Example() {
  return (
    <ButtonGroup>
      <Button variant="tertiary" small>Edit</Button>
      <Button variant="tertiary" small>Export</Button>
      <Button variant="tertiary" small>Download</Button>
      <Button variant="primary" small>Save</Button>
    </ButtonGroup>
  );
}
