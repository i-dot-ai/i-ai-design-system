import { ServiceNavigation, ServiceNavigationItem } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <div style="display: flex;">
      <ServiceNavigation sideNav navigationId="side-nav-navigation">
        <ServiceNavigationItem href="#/1">Navigation item 1</ServiceNavigationItem>
        <ServiceNavigationItem href="#/2">Navigation item 2</ServiceNavigationItem>
        <ServiceNavigationItem href="#/3">Navigation item 3</ServiceNavigationItem>
        <ServiceNavigationItem href="#/4">Navigation item 4</ServiceNavigationItem>
      </ServiceNavigation>
      <div
        style="flex: 1; border: 1px solid var(--govuk-border-colour);"
        className="govuk-!-padding-6"
      >
        Page content
      </div>
    </div>
  );
}
