import { CardGroup, Card, CardHeading, CardLink, CardContent } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <CardGroup>
      <Card>
        <CardHeading>
          <h3 className="govuk-heading-m">
            <CardLink href="#">Dashboard</CardLink>
          </h3>
        </CardHeading>
        <CardContent>See the state of everything in one place.</CardContent>
      </Card>
      <Card>
        <CardHeading>
          <h3 className="govuk-heading-m">
            <CardLink href="#">Reports</CardLink>
          </h3>
        </CardHeading>
        <CardContent>Generate and download service reports.</CardContent>
      </Card>
      <Card>
        <CardHeading>
          <h3 className="govuk-heading-m">
            <CardLink href="#">Settings</CardLink>
          </h3>
        </CardHeading>
        <CardContent>Manage your account and preferences.</CardContent>
      </Card>
    </CardGroup>
  );
}
