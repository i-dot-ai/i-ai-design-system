import CardGroup from "@i-dot-ai-npm/component-library-react/card/CardGroup";
import Card from "@i-dot-ai-npm/component-library-react/card/Card";
import CardHeading from "@i-dot-ai-npm/component-library-react/card/CardHeading";
import CardLink from "@i-dot-ai-npm/component-library-react/card/CardLink";
import CardContent from "@i-dot-ai-npm/component-library-react/card/CardContent";

export default function Example() {
  return (
    <CardGroup>
      <Card secondary>
        <CardHeading>
          <h3 className="govuk-heading-m">
            <CardLink href="#">Dashboard</CardLink>
          </h3>
        </CardHeading>
        <CardContent>See the state of everything in one place.</CardContent>
      </Card>
      <Card secondary>
        <CardHeading>
          <h3 className="govuk-heading-m">
            <CardLink href="#">Reports</CardLink>
          </h3>
        </CardHeading>
        <CardContent>Generate and download service reports.</CardContent>
      </Card>
      <Card secondary>
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
