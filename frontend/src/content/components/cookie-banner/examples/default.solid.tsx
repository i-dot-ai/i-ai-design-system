import { CookieBanner, CookieBannerMessage, CookieBannerHeading, CookieBannerContent, CookieBannerActions, Button } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
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
  );
}
