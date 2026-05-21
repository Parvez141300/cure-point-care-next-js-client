"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUserInfo } from "@/types/user.types";
import { Key, LogOut, User } from "lucide-react";
import Link from "next/link";
import React from "react";

interface UserDropDownProps {
  userInfo: IUserInfo;
}
const UserDropDown = ({ userInfo }: UserDropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"} className="rounded-full">
          <span className="font-semibold text-sm text-primary">
            {userInfo.name.charAt(0).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Role: {userInfo.role.replace("_", " ")}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <Link href={"/my-profile"}>My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Key className="mr-2 h-4 w-4" />
          <Link href={"/change-password"}>Change Password</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer text-red-500">
          <Link href={"/logout"} className="flex items-center gap-2">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
