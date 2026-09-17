import { ToggleItem, ToggleLabel, Toggle } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <ToggleItem>
      <ToggleLabel for="toggle"> Toggle label </ToggleLabel>
      <Toggle id="toggle" />
    </ToggleItem>
  );
}
