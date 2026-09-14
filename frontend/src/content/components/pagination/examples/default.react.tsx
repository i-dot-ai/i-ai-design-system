import Pagination from "@i-dot-ai-npm/component-library-react/pagination/Pagination";
import PaginationList from "@i-dot-ai-npm/component-library-react/pagination/PaginationList";
import PaginationItem from "@i-dot-ai-npm/component-library-react/pagination/PaginationItem";
import PaginationPrev from "@i-dot-ai-npm/component-library-react/pagination/PaginationPrev";
import PaginationNext from "@i-dot-ai-npm/component-library-react/pagination/PaginationNext";

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
