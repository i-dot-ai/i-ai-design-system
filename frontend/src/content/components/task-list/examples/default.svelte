<script>
  import TaskList from "@i-dot-ai-npm/component-library-svelte/task-list/TaskList.svelte";
  import TaskListItem from "@i-dot-ai-npm/component-library-svelte/task-list/TaskListItem.svelte";
  import TaskListNameAndHint from "@i-dot-ai-npm/component-library-svelte/task-list/TaskListNameAndHint.svelte";
  import TaskListLink from "@i-dot-ai-npm/component-library-svelte/task-list/TaskListLink.svelte";
  import TaskListStatus from "@i-dot-ai-npm/component-library-svelte/task-list/TaskListStatus.svelte";
  import Tag from "@i-dot-ai-npm/component-library-svelte/tag/Tag.svelte";
</script>

<TaskList>
  <TaskListItem withLink>
    <TaskListNameAndHint>
      <TaskListLink href="#" aria-describedby="status-1">
        Company Directors
      </TaskListLink>
    </TaskListNameAndHint>
    <TaskListStatus id="status-1">Completed</TaskListStatus>
  </TaskListItem>
  <TaskListItem withLink>
    <TaskListNameAndHint>
      <TaskListLink href="#" aria-describedby="status-2">
        Registered company details
      </TaskListLink>
    </TaskListNameAndHint>
    <TaskListStatus id="status-2">
      <Tag colour="blue">Incomplete</Tag>
    </TaskListStatus>
  </TaskListItem>
  <TaskListItem withLink>
    <TaskListNameAndHint>
      <TaskListLink href="#" aria-describedby="status-3">
        Business plan
      </TaskListLink>
    </TaskListNameAndHint>
    <TaskListStatus id="status-3">
      <Tag colour="blue">Incomplete</Tag>
    </TaskListStatus>
  </TaskListItem>
</TaskList>
