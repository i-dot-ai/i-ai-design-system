<script>
  import SummaryList from "@i-dot-ai-npm/component-library-svelte/summary-list/SummaryList.svelte";
  import SummaryListRow from "@i-dot-ai-npm/component-library-svelte/summary-list/SummaryListRow.svelte";
  import SummaryListKey from "@i-dot-ai-npm/component-library-svelte/summary-list/SummaryListKey.svelte";
  import SummaryListValue from "@i-dot-ai-npm/component-library-svelte/summary-list/SummaryListValue.svelte";
  import SummaryListActions from "@i-dot-ai-npm/component-library-svelte/summary-list/SummaryListActions.svelte";
</script>

<SummaryList>
  <SummaryListRow>
    <SummaryListKey>Name</SummaryListKey>
    <SummaryListValue>Firstname Lastname</SummaryListValue>
    <SummaryListActions>
      <a class="govuk-link" href="#">
        Change<span class="govuk-visually-hidden"> name</span>
      </a>
    </SummaryListActions>
  </SummaryListRow>
  <SummaryListRow noActions>
    <SummaryListKey>Date of birth</SummaryListKey>
    <SummaryListValue>13/08/1980</SummaryListValue>
  </SummaryListRow>
  <SummaryListRow noActions>
    <SummaryListKey>Contact information</SummaryListKey>
    <SummaryListValue>
      <p class="govuk-body">email@email.com</p>
      <p class="govuk-body">
        Address line 1<br />
        Address line 2<br />
        Address line 3
      </p>
    </SummaryListValue>
  </SummaryListRow>
</SummaryList>
