<script>
  import Pagination from "@i-dot-ai-npm/component-library-svelte/pagination/Pagination.svelte";
  import PaginationList from "@i-dot-ai-npm/component-library-svelte/pagination/PaginationList.svelte";
  import PaginationItem from "@i-dot-ai-npm/component-library-svelte/pagination/PaginationItem.svelte";
  import PaginationPrev from "@i-dot-ai-npm/component-library-svelte/pagination/PaginationPrev.svelte";
  import PaginationNext from "@i-dot-ai-npm/component-library-svelte/pagination/PaginationNext.svelte";
</script>

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
