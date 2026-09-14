import SummaryList from "@i-dot-ai-npm/component-library-react/summary-list/SummaryList";
import SummaryListRow from "@i-dot-ai-npm/component-library-react/summary-list/SummaryListRow";
import SummaryListKey from "@i-dot-ai-npm/component-library-react/summary-list/SummaryListKey";
import SummaryListValue from "@i-dot-ai-npm/component-library-react/summary-list/SummaryListValue";
import SummaryListActions from "@i-dot-ai-npm/component-library-react/summary-list/SummaryListActions";

export default function Example() {
  return (
    <SummaryList>
      <SummaryListRow>
        <SummaryListKey>Name</SummaryListKey>
        <SummaryListValue>Firstname Lastname</SummaryListValue>
        <SummaryListActions>
          <a className="govuk-link" href="#">
            Change<span className="govuk-visually-hidden"> name</span>
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
          <p className="govuk-body">email@email.com</p>
          <p className="govuk-body">
            Address line 1<br />
            Address line 2<br />
            Address line 3
          </p>
        </SummaryListValue>
      </SummaryListRow>
    </SummaryList>
  );
}
