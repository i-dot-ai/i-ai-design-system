<script>
  import Accordion from "@i-dot-ai-npm/component-library-svelte/accordion/Accordion.svelte";
  import AccordionSection from "@i-dot-ai-npm/component-library-svelte/accordion/AccordionSection.svelte";
  import AccordionSectionHeader from "@i-dot-ai-npm/component-library-svelte/accordion/AccordionSectionHeader.svelte";
  import AccordionSectionHeading from "@i-dot-ai-npm/component-library-svelte/accordion/AccordionSectionHeading.svelte";
  import AccordionSectionContent from "@i-dot-ai-npm/component-library-svelte/accordion/AccordionSectionContent.svelte";
</script>

<Accordion>
  <AccordionSection>
    <AccordionSectionHeader>
      <AccordionSectionHeading>Section A</AccordionSectionHeading>
    </AccordionSectionHeader>
    <AccordionSectionContent>
      <p class="govuk-body">
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
      <p class="govuk-body">
        You can find your National Insurance number on your payslip, P60, or
        on letters about tax, pensions and benefits.
      </p>
    </AccordionSectionContent>
  </AccordionSection>
</Accordion>
