import NotificationBanner from "@i-dot-ai-npm/component-library-react/notification-banner/NotificationBanner";
import NotificationBannerHeader from "@i-dot-ai-npm/component-library-react/notification-banner/NotificationBannerHeader";
import NotificationBannerTitle from "@i-dot-ai-npm/component-library-react/notification-banner/NotificationBannerTitle";
import NotificationBannerContent from "@i-dot-ai-npm/component-library-react/notification-banner/NotificationBannerContent";
import NotificationBannerHeading from "@i-dot-ai-npm/component-library-react/notification-banner/NotificationBannerHeading";

export default function Example() {
  return (
    <NotificationBanner
      success
      titleId="govuk-notification-banner-title-success"
    >
      <NotificationBannerHeader>
        <NotificationBannerTitle id="govuk-notification-banner-title-success">
          Success
        </NotificationBannerTitle>
      </NotificationBannerHeader>
      <NotificationBannerContent>
        <NotificationBannerHeading>
          Training outcome recorded and trainee withdrawn
        </NotificationBannerHeading>
      </NotificationBannerContent>
    </NotificationBanner>
  );
}
