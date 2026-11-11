export interface EmployeeModel {
  Id: string;
  EmployeeName: string | null;
  StarTimeUtc: string;
  EndTimeUtc: string;
  EntryNotes: string | null;
  DeletedOn: string | null;
}

export interface EmployeeTotalHours {
  name: string;
  totalHours: number;
}
