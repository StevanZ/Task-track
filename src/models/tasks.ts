export interface TaskModel {
  creatorId?: string;
  createdAt?: string;
  assigneeId?: null | string | undefined;
  assignerId?: null | string | undefined;
  commentCount?: number;
  isCompleted?: boolean;
  content: string;
  description?: string;
  due?: {
    date?: string;
    isRecurring?: boolean;
    datetime?: string | null;
    string?: string;
    timezone?: string | null;
  } | null;
  duration?: {
    amount: number;
    unit: "minute" | "day";
  } | null;
  id?: string;
  labels?: string[];
  order?: number;
  priority?: number;
  projectId?: string;
  sectionId?: null | string;
  parentId?: null | string;
  url?: string;
}
