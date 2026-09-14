import ToggleItem from "@i-dot-ai-npm/component-library-solid/toggle/ToggleItem";
import ToggleLabel from "@i-dot-ai-npm/component-library-solid/toggle/ToggleLabel";
import Toggle from "@i-dot-ai-npm/component-library-solid/toggle/Toggle";

export default function Example() {
  return (
    <ToggleItem>
      <ToggleLabel for="toggle"> Toggle label </ToggleLabel>
      <Toggle id="toggle" />
    </ToggleItem>
  );
}
