<script>
  import NotificationBanner from "@i-dot-ai-npm/component-library-svelte/notification-banner/NotificationBanner.svelte";
  import NotificationBannerHeader from "@i-dot-ai-npm/component-library-svelte/notification-banner/NotificationBannerHeader.svelte";
  import NotificationBannerTitle from "@i-dot-ai-npm/component-library-svelte/notification-banner/NotificationBannerTitle.svelte";
  import NotificationBannerContent from "@i-dot-ai-npm/component-library-svelte/notification-banner/NotificationBannerContent.svelte";
  import NotificationBannerHeading from "@i-dot-ai-npm/component-library-svelte/notification-banner/NotificationBannerHeading.svelte";
</script>

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
