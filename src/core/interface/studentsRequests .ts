export interface IstudentsRequests {
  id: string;
  firstname: string;
  lastname: string;
  capicity: string;
  requests: {
    acceptsd: boolean;
    rejected: boolean;
    NotChecked: boolean;
  };
  term: string;
  Course: string;
  studentID: string;
  masterID: string;
  req: string;
  res: string;
}
