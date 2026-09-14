import ErrorSummary from "@i-dot-ai-npm/component-library-react/error-summary/ErrorSummary";
import ErrorSummaryTitle from "@i-dot-ai-npm/component-library-react/error-summary/ErrorSummaryTitle";
import ErrorSummaryBody from "@i-dot-ai-npm/component-library-react/error-summary/ErrorSummaryBody";
import ErrorSummaryList from "@i-dot-ai-npm/component-library-react/error-summary/ErrorSummaryList";
import ErrorSummaryItem from "@i-dot-ai-npm/component-library-react/error-summary/ErrorSummaryItem";

export default function Example() {
  return (
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
  );
}
