import PhaseBanner from "@i-dot-ai-npm/component-library-solid/phase-banner/PhaseBanner";
import PhaseBannerText from "@i-dot-ai-npm/component-library-solid/phase-banner/PhaseBannerText";
import Tag from "@i-dot-ai-npm/component-library-solid/tag/Tag";

export default function Example() {
  return (
    <PhaseBanner>
      <Tag class="govuk-phase-banner__content__tag">Alpha</Tag>
      <PhaseBannerText>
        This is a new service - your <a href="#" class="govuk-link">feedback</a> will
        help us to improve it.
      </PhaseBannerText>
    </PhaseBanner>
  );
}
