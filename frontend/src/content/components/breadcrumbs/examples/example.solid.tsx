import Breadcrumbs from "@i-dot-ai-npm/component-library-solid/breadcrumbs/Breadcrumbs";
import BreadcrumbItem from "@i-dot-ai-npm/component-library-solid/breadcrumbs/BreadcrumbItem";

export default function Example() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Section</BreadcrumbItem>
      <BreadcrumbItem href="#">Sub-section</BreadcrumbItem>
      <BreadcrumbItem href="#">Sub Sub-section</BreadcrumbItem>
    </Breadcrumbs>
  );
}
