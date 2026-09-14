<script>
  import CardGroup from "@i-dot-ai-npm/component-library-svelte/card/CardGroup.svelte";
  import Card from "@i-dot-ai-npm/component-library-svelte/card/Card.svelte";
  import CardHeading from "@i-dot-ai-npm/component-library-svelte/card/CardHeading.svelte";
  import CardLink from "@i-dot-ai-npm/component-library-svelte/card/CardLink.svelte";
  import CardContent from "@i-dot-ai-npm/component-library-svelte/card/CardContent.svelte";
</script>

<CardGroup>
  <Card>
    <CardHeading>
      <h3 class="govuk-heading-m">
        <CardLink href="#">Dashboard</CardLink>
      </h3>
    </CardHeading>
    <CardContent>See the state of everything in one place.</CardContent>
  </Card>
  <Card>
    <CardHeading>
      <h3 class="govuk-heading-m">
        <CardLink href="#">Reports</CardLink>
      </h3>
    </CardHeading>
    <CardContent>Generate and download service reports.</CardContent>
  </Card>
  <Card>
    <CardHeading>
      <h3 class="govuk-heading-m">
        <CardLink href="#">Settings</CardLink>
      </h3>
    </CardHeading>
    <CardContent>Manage your account and preferences.</CardContent>
  </Card>
</CardGroup>
