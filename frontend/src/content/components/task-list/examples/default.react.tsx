import { TaskList, TaskListItem, TaskListNameAndHint, TaskListLink, TaskListStatus, Tag } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
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
  );
}
