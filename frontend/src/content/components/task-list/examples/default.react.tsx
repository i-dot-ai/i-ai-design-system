import TaskList from "@i-dot-ai-npm/component-library-react/task-list/TaskList";
import TaskListItem from "@i-dot-ai-npm/component-library-react/task-list/TaskListItem";
import TaskListNameAndHint from "@i-dot-ai-npm/component-library-react/task-list/TaskListNameAndHint";
import TaskListLink from "@i-dot-ai-npm/component-library-react/task-list/TaskListLink";
import TaskListStatus from "@i-dot-ai-npm/component-library-react/task-list/TaskListStatus";
import Tag from "@i-dot-ai-npm/component-library-react/tag/Tag";

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
