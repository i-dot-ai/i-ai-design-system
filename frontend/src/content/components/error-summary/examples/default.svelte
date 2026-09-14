<script>
  import ErrorSummary from "@i-dot-ai-npm/component-library-svelte/error-summary/ErrorSummary.svelte";
  import ErrorSummaryTitle from "@i-dot-ai-npm/component-library-svelte/error-summary/ErrorSummaryTitle.svelte";
  import ErrorSummaryBody from "@i-dot-ai-npm/component-library-svelte/error-summary/ErrorSummaryBody.svelte";
  import ErrorSummaryList from "@i-dot-ai-npm/component-library-svelte/error-summary/ErrorSummaryList.svelte";
  import ErrorSummaryItem from "@i-dot-ai-npm/component-library-svelte/error-summary/ErrorSummaryItem.svelte";
</script>

<ErrorSummary>
  <ErrorSummaryTitle>There is a problem</ErrorSummaryTitle>
  <ErrorSummaryBody>
    <ErrorSummaryList>
      <ErrorSummaryItem href="#ex-1">
        The date your passport was issued must be in the past
      </ErrorSummaryItem>
      <ErrorSummaryItem href="#ex-2">
        Enter a postcode, like AA1 1AA
      </ErrorSummaryItem>
    </ErrorSummaryList>
  </ErrorSummaryBody>
</ErrorSummary>
