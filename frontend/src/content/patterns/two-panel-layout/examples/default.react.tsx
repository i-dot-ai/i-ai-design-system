import {
  Tabs,
  TabsTitle,
  TabsList,
  Tab,
  TabPanel,
  Button,
} from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <div className="govuk-main-wrapper">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <Tabs>
            <TabsTitle>Contents</TabsTitle>
            <TabsList>
              <Tab href="#context-1" selected>Context 1</Tab>
              <Tab href="#context-2">Context 2</Tab>
            </TabsList>
            <TabPanel id="context-1">
              <p className="govuk-body">Context 1</p>
            </TabPanel>
            <TabPanel id="context-2" hidden>
              <p className="govuk-body">Context 2</p>
            </TabPanel>
          </Tabs>
        </div>
        <div className="govuk-grid-column-one-half">
          <p className="govuk-body">Action content</p>
          <Button>Click here</Button>
        </div>
      </div>
    </div>
  );
}
