export interface TaskModel {
  creator_id?: string;
  created_at?: string;
  assignee_id?: null | string | undefined;
  assigner_id?: null | string | undefined;
  comment_count?: number;
  is_completed?: boolean;
  content: string;
  description?: string;
  due?: {
    date?: string;
    is_recurring?: boolean;
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
  project_id?: string;
  section_id?: null | string;
  parent_id?: null | string;
  url?: string;
}
