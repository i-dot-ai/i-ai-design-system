import { Pagination, PaginationList, PaginationItem, PaginationPrev, PaginationNext } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <Pagination>
      <PaginationPrev href="/previous" />
      <PaginationList>
        <PaginationItem href="/page/1" aria-label="Page 1">1</PaginationItem>
        <PaginationItem href="/page/2" aria-label="Page 2" current>
          2
        </PaginationItem>
        <PaginationItem href="/page/3" aria-label="Page 3">3</PaginationItem>
      </PaginationList>
      <PaginationNext href="/next" />
    </Pagination>
  );
}
