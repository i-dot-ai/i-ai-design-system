import Table from "@i-dot-ai-npm/component-library-react/table/Table";
import TableCaption from "@i-dot-ai-npm/component-library-react/table/TableCaption";
import TableHead from "@i-dot-ai-npm/component-library-react/table/TableHead";
import TableBody from "@i-dot-ai-npm/component-library-react/table/TableBody";
import TableRow from "@i-dot-ai-npm/component-library-react/table/TableRow";
import TableHeader from "@i-dot-ai-npm/component-library-react/table/TableHeader";
import TableCell from "@i-dot-ai-npm/component-library-react/table/TableCell";

export default function Example() {
  return (
    <Table subtle>
      <TableCaption size="medium">Monthly energy costs</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeader>Month</TableHeader>
          <TableHeader numeric>Gas</TableHeader>
          <TableHeader numeric>Electricity</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>January</TableCell>
          <TableCell numeric>£85</TableCell>
          <TableCell numeric>£95</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>February</TableCell>
          <TableCell numeric>£75</TableCell>
          <TableCell numeric>£55</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>March</TableCell>
          <TableCell numeric>£165</TableCell>
          <TableCell numeric>£125</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
