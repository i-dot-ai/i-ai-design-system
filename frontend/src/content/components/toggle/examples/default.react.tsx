import { ToggleItem, ToggleLabel, Toggle } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <ToggleItem>
      <ToggleLabel htmlFor="toggle"> Toggle label </ToggleLabel>
      <Toggle id="toggle" />
    </ToggleItem>
  );
}
