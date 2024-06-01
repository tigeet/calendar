export type TTodo = {
  id: string;
  createdAt: number;
  completed: boolean;
  title: string;
  createdBy: string;
};

export type TProfile = {
  id: string;
  name: string;
};

export type View = "month" | "week";
