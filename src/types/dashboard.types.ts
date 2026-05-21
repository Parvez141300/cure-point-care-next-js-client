export interface INavItems {
    title: string;
    href: string;
    icon: string;
}

export interface INavSections {
    title?: string;
    items: INavItems[];
}

export interface IPieChartData {
    status: string;
    count: number;
}

export interface IBarchartData {
    month: Date | string;
    count: number;
}

export interface IAdminDashboardData {
    appointmentCount: number;
    patientCount: number;
    doctorCount: number;
    usersCount: number;
    adminCount: number;
    superAdminCount: number;
    paymentCount: number;
    totalRevenue: number;
    totalExpense: number;
    pieChartData: IPieChartData[];
    barchartData: IBarchartData[];
}

export interface IPatientDashboardData {
    appointmentCount: number;
    reviewCount: number;
    patientExpense: number;
    appointmentStatusDistribution: IPieChartData[];
}

export interface IDoctorDashboardData {
    reviewCount: number;
    patientCount: number;
    appointmentCount: number;
    doctorRevenue: number;
    apppointmentStatusDistribution: IPieChartData[];
}