import { Tabs, TabsTitle, TabsList, Tab, TabPanel } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <Tabs>
      <TabsTitle>Contents</TabsTitle>
      <TabsList>
        <Tab href="#tab-1" selected>Past day</Tab>
        <Tab href="#tab-2">Past week</Tab>
      </TabsList>
      <TabPanel id="tab-1">
        <h2 className="govuk-heading-m">Past day</h2>
        <p className="govuk-body">
          There were 3 cases opened and 0 cases closed in the past day.
        </p>
      </TabPanel>
      <TabPanel id="tab-2" hidden>
        <h2 className="govuk-heading-m">Past week</h2>
        <p className="govuk-body">
          There were 24 cases opened and 18 cases closed in the past week.
        </p>
      </TabPanel>
    </Tabs>
  );
}
