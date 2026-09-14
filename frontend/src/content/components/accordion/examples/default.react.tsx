import Accordion from "@i-dot-ai-npm/component-library-react/accordion/Accordion";
import AccordionSection from "@i-dot-ai-npm/component-library-react/accordion/AccordionSection";
import AccordionSectionHeader from "@i-dot-ai-npm/component-library-react/accordion/AccordionSectionHeader";
import AccordionSectionHeading from "@i-dot-ai-npm/component-library-react/accordion/AccordionSectionHeading";
import AccordionSectionContent from "@i-dot-ai-npm/component-library-react/accordion/AccordionSectionContent";

export default function Example() {
  return (
    <Accordion>
      <AccordionSection>
        <AccordionSectionHeader>
          <AccordionSectionHeading>Section A</AccordionSectionHeading>
        </AccordionSectionHeader>
        <AccordionSectionContent>
          <p className="govuk-body">
            We need to know your nationality so we can work out which elections
            you’re entitled to vote in. If you cannot provide your nationality,
            you’ll have to send copies of identity documents through the post.
          </p>
        </AccordionSectionContent>
      </AccordionSection>
      <AccordionSection>
        <AccordionSectionHeader>
          <AccordionSectionHeading>Section B</AccordionSectionHeading>
        </AccordionSectionHeader>
        <AccordionSectionContent>
          <p className="govuk-body">
            You can find your National Insurance number on your payslip, P60, or
            on letters about tax, pensions and benefits.
          </p>
        </AccordionSectionContent>
      </AccordionSection>
    </Accordion>
  );
}
