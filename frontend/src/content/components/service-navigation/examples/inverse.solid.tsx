import ServiceNavigation from "@i-dot-ai-npm/component-library-solid/service-navigation/ServiceNavigation";
import ServiceNavigationItem from "@i-dot-ai-npm/component-library-solid/service-navigation/ServiceNavigationItem";

export default function Example() {
  return (
    <ServiceNavigation inverse navigationId="inverse-navigation">
      <ServiceNavigationItem href="#/1">
        Navigation item 1
      </ServiceNavigationItem>
      <ServiceNavigationItem href="#/2">
        Navigation item 2
      </ServiceNavigationItem>
      <ServiceNavigationItem href="#/3">
        Navigation item 3
      </ServiceNavigationItem>
    </ServiceNavigation>
  );
}
