import CookieBanner from "@i-dot-ai-npm/component-library-solid/cookie-banner/CookieBanner";
import CookieBannerMessage from "@i-dot-ai-npm/component-library-solid/cookie-banner/CookieBannerMessage";
import CookieBannerHeading from "@i-dot-ai-npm/component-library-solid/cookie-banner/CookieBannerHeading";
import CookieBannerContent from "@i-dot-ai-npm/component-library-solid/cookie-banner/CookieBannerContent";
import CookieBannerActions from "@i-dot-ai-npm/component-library-solid/cookie-banner/CookieBannerActions";
import Button from "@i-dot-ai-npm/component-library-solid/button/Button";

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
