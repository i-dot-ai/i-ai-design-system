import { NotificationBanner, NotificationBannerHeader, NotificationBannerTitle, NotificationBannerContent, NotificationBannerHeading } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <NotificationBanner>
      <NotificationBannerHeader>
        <NotificationBannerTitle>Important</NotificationBannerTitle>
      </NotificationBannerHeader>
      <NotificationBannerContent>
        <NotificationBannerHeading>
          This publication was withdrawn on 7 March 2014.
        </NotificationBannerHeading>
      </NotificationBannerContent>
    </NotificationBanner>
  );
}
