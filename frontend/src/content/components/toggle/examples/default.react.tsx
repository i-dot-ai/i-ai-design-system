import ToggleItem from "@i-dot-ai-npm/component-library-react/toggle/ToggleItem";
import ToggleLabel from "@i-dot-ai-npm/component-library-react/toggle/ToggleLabel";
import Toggle from "@i-dot-ai-npm/component-library-react/toggle/Toggle";

export default function Example() {
  return (
    <ToggleItem>
      <ToggleLabel htmlFor="toggle"> Toggle label </ToggleLabel>
      <Toggle id="toggle" />
    </ToggleItem>
  );
}
