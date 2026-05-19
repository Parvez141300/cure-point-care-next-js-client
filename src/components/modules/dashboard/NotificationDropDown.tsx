import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Calendar } from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";

interface notificationDropDownProps {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "schedule" | "general" | "user";
  timestamp: Date;
  read: boolean;
}

const MOCK_NOTIFICATIONS: notificationDropDownProps[] = [
  {
    id: "1",
    title: "New Appointment Scheduled",
    message: "You have a new appointment scheduled on 1/1/2023 at 10:00 AM",
    type: "appointment",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: "2",
    title: "Schedule Updated",
    message: "You have a new appointment scheduled on 1/1/2023 at 10:00 AM",
    type: "appointment",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: false,
  },
  {
    id: "3",
    title: "System Maintenance",
    message: "You have a new appointment scheduled on 1/1/2023 at 10:00 AM",
    type: "appointment",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    read: true,
  },
];

const getNotification = (type: notificationDropDownProps["type"]) => {
  switch (type) {
    case "appointment":
      return <Calendar size={16} className="text-blue-500" />;
    case "schedule":
      return <Calendar size={16} className="text-green-600" />;
    case "general":
      return <Calendar size={16} className="text-yellow-500" />;
    case "user":
      return <Calendar size={16} className="text-red-500" />;
    default:
      return <Bell size={16} className="text-gray-500" />;
  }
};

const NotificationDropDown = () => {
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"} className="relative">
          <Bell size={16} />
          <Badge
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex  items-center justify-center"
            variant={"destructive"}
          >
            <span className="text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </Badge>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <ScrollArea className="h-72">
            {MOCK_NOTIFICATIONS.length > 0 ? (
              MOCK_NOTIFICATIONS.map((notification, idx) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="cursor-pointer flex flex-col gap-2 p-3"
                >
                  <div>{getNotification(notification.type)}</div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <Badge className="ml-2" variant={"destructive"}>
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs">{notification.message}</p>
                    <p>
                      {formatDistanceToNow(notification.timestamp, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  {idx < MOCK_NOTIFICATIONS.length - 1 && (
                    <DropdownMenuSeparator />
                  )}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-6 text-sm text-center text-muted-foreground">
                No notifications
              </div>
            )}
          </ScrollArea>

          <DropdownMenuItem className="text-center cursor-pointer">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropDown;
