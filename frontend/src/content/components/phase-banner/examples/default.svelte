<script>
  import PhaseBanner from "@i-dot-ai-npm/component-library-svelte/phase-banner/PhaseBanner.svelte";
  import PhaseBannerText from "@i-dot-ai-npm/component-library-svelte/phase-banner/PhaseBannerText.svelte";
  import Tag from "@i-dot-ai-npm/component-library-svelte/tag/Tag.svelte";
</script>

<PhaseBanner>
  <Tag class="govuk-phase-banner__content__tag">Alpha</Tag>
  <PhaseBannerText>
    This is a new service - your <a href="#" class="govuk-link">feedback</a> will
    help us to improve it.
  </PhaseBannerText>
</PhaseBanner>
