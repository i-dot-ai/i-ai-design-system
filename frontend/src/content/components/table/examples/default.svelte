<script>
  import Table from "@i-dot-ai-npm/component-library-svelte/table/Table.svelte";
  import TableCaption from "@i-dot-ai-npm/component-library-svelte/table/TableCaption.svelte";
  import TableHead from "@i-dot-ai-npm/component-library-svelte/table/TableHead.svelte";
  import TableBody from "@i-dot-ai-npm/component-library-svelte/table/TableBody.svelte";
  import TableRow from "@i-dot-ai-npm/component-library-svelte/table/TableRow.svelte";
  import TableHeader from "@i-dot-ai-npm/component-library-svelte/table/TableHeader.svelte";
  import TableCell from "@i-dot-ai-npm/component-library-svelte/table/TableCell.svelte";
</script>

<Table>
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
