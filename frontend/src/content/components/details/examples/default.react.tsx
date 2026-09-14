import Details from "@i-dot-ai-npm/component-library-react/details/Details";
import DetailsSummary from "@i-dot-ai-npm/component-library-react/details/DetailsSummary";
import DetailsText from "@i-dot-ai-npm/component-library-react/details/DetailsText";

export default function Example() {
  return (
    <Details>
      <DetailsSummary>Help with nationality</DetailsSummary>
      <DetailsText>
        We need to know your nationality so we can work out which elections you’re
        entitled to vote in. If you can’t provide your nationality, you’ll have to
        send copies of identity documents through the post.
      </DetailsText>
    </Details>
  );
}
