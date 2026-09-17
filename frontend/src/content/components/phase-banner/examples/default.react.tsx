import PhaseBanner from "@i-dot-ai-npm/component-library-react/phase-banner/PhaseBanner";
// import PhaseBannerText from "@i-dot-ai-npm/component-library-react/phase-banner/PhaseBannerText";
import Tag from "@i-dot-ai-npm/component-library-react/tag/Tag";

export default function Example() {
  return (
    <PhaseBanner>
      <Tag className="govuk-phase-banner__content__tag">Alpha</Tag>
      {/* <PhaseBannerText> */}
      This is a new service - your <a href="#" className="govuk-link">feedback</a> will
      help us to improve it.
      {/* </PhaseBannerText> */}
    </PhaseBanner>
  );
}
