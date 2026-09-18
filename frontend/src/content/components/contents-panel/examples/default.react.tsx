import {
  ContentsPanel,
  ContentsPanelListHeading,
  ContentsPanelList,
  ContentsPanelItem,
} from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <ContentsPanel>
      <ContentsPanelListHeading>Getting started</ContentsPanelListHeading>
      <ContentsPanelList>
        <ContentsPanelItem href="#">Overview</ContentsPanelItem>
        <ContentsPanelItem href="#" current>
          Before you start
        </ContentsPanelItem>
        <ContentsPanelItem href="#">What you'll need</ContentsPanelItem>
      </ContentsPanelList>
      <ContentsPanelListHeading>Making an application</ContentsPanelListHeading>
      <ContentsPanelList>
        <ContentsPanelItem href="#">Complete the form</ContentsPanelItem>
        <ContentsPanelItem href="#">Pay the fee</ContentsPanelItem>
        <ContentsPanelItem href="#">After you apply</ContentsPanelItem>
      </ContentsPanelList>
    </ContentsPanel>
  );
}
