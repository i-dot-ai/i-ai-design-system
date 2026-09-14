<script>
  import CookieBanner from "@i-dot-ai-npm/component-library-svelte/cookie-banner/CookieBanner.svelte";
  import CookieBannerMessage from "@i-dot-ai-npm/component-library-svelte/cookie-banner/CookieBannerMessage.svelte";
  import CookieBannerHeading from "@i-dot-ai-npm/component-library-svelte/cookie-banner/CookieBannerHeading.svelte";
  import CookieBannerContent from "@i-dot-ai-npm/component-library-svelte/cookie-banner/CookieBannerContent.svelte";
  import CookieBannerActions from "@i-dot-ai-npm/component-library-svelte/cookie-banner/CookieBannerActions.svelte";
  import Button from "@i-dot-ai-npm/component-library-svelte/button/Button.svelte";
</script>

<CookieBanner>
  <CookieBannerMessage>
    <CookieBannerHeading>
      Cookies on this government service
    </CookieBannerHeading>
    <CookieBannerContent>
      <p class="govuk-body">
        We use analytics cookies to help understand how users use our service.
      </p>
    </CookieBannerContent>
    <CookieBannerActions>
      <Button variant="primary">Accept analytics cookies</Button>
      <Button variant="primary">Reject analytics cookies</Button>
      <a class="govuk-link" href="/cookie-preferences">View cookie preferences</a>
    </CookieBannerActions>
  </CookieBannerMessage>
</CookieBanner>
