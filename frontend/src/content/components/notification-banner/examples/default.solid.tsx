import NotificationBanner from "@i-dot-ai-npm/component-library-solid/notification-banner/NotificationBanner";
import NotificationBannerHeader from "@i-dot-ai-npm/component-library-solid/notification-banner/NotificationBannerHeader";
import NotificationBannerTitle from "@i-dot-ai-npm/component-library-solid/notification-banner/NotificationBannerTitle";
import NotificationBannerContent from "@i-dot-ai-npm/component-library-solid/notification-banner/NotificationBannerContent";
import NotificationBannerHeading from "@i-dot-ai-npm/component-library-solid/notification-banner/NotificationBannerHeading";

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
