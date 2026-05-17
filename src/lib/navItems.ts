import { INavSections } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): INavSections[] => {
    const defaultDashboardRoute = getDefaultDashboardRoute(role);
    return [
        {
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home"
                },
                {
                    title: "Dashboard",
                    href: defaultDashboardRoute,
                    icon: "LayoutDashboard"
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "UserCircle"
                }
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Lock"
                },
            ],
        },
    ];
};

export const doctorNavItems: INavSections[] = [
    {
        title: "Patient Management",
        items: [
            {
                title: "My Appointments",
                href: "/doctor/dashboard/my-appointments",
                icon: "Calendar"
            },
            {
                title: "My Schedules",
                href: "/doctor/dashboard/my-schedules",
                icon: "Clock"
            },
            {
                title: "Prescriptions",
                href: "/doctor/dashboard/prescriptions",
                icon: "FileText"
            },
            {
                title: "My Reviews",
                href: "/doctor/dashboard/my-reviews",
                icon: "Star",
            }
        ]
    },
];

export const adminNavItems: INavSections[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield",
            },
            {
                title: "Doctors",
                href: "/admin/dashboard/doctors-management",
                icon: "Stehoscope",
            },
            {
                title: "Patients",
                href: "/admin/dashboard/patients-management",
                icon: "UserGroup",
            }
        ],
    },
    {
        title: "Hospital Management",
        items: [
            {
                title: "Appointments",
                href: "/admin/dashboard/appointments-management",
                icon: "Calender",
            },
            {
                title: "Schedules",
                href: "/admin/dashboard/schedules-management",
                icon: "Clock",
            },
            {
                title: "Specialities",
                href: "/admin/dashboard/doctor-specialities-management",
                icon: "Hospital",
            },
            {
                title: "Doctor Schedules",
                href: "/admin/dashboard/doctor-schedules-management",
                icon: "Calendar",
            },
            {
                title: "Doctor Specialities",
                href: "/admin/dashboard/doctor-specialities-management",
                icon: "Hospital",
            },
            {
                title: "Payments",
                href: "/admin/dashboard/payments-management",
                icon: "CreditCard",
            },
            {
                title: "Prescriptions",
                href: "/admin/dashboard/prescriptions-management",
                icon: "FileText",
            },
            {
                title: "Reviews",
                href: "/admin/dashboard/reviews-management",
                icon: "Star",
            },
        ],
    }
];

export const patientNavItems: INavSections[] = [
    {
        title: "Appointments",
        items: [
            {
                title: "My Appointments",
                href: "/dashboard/my-appointments",
                icon: "Calendar",
            },
            {
                title: "Book Appointments",
                href: "/dashboard/book-appointments",
                icon: "ClipboardList",
            },
        ],
    },
    {
        title: "Medical Records",
        items: [
            {
                title: "My Prescriptions",
                href: "/dashboard/prescriptions",
                icon: "FileText",
            },
            {
                title: "Health Records",
                href: "/dashboard/health-records",
                icon: "Activity",
            }
        ],
    },
];

export const getDashboardNavItemsByRole = (role: UserRole): INavSections[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "SUPER_ADMIN":
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
            break;

        case "DOCTOR":
            return [...commonNavItems, ...doctorNavItems];
            break;

        case "PATIENT":
            return [...commonNavItems, ...patientNavItems];
            break;
    }
}