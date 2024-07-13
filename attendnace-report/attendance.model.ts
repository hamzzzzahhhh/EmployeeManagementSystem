export interface Attendance {
    employeeName: string;
    department: string;
    date: Date;
    checkInTime: Date | null;
    checkOutTime: Date | null;
}
