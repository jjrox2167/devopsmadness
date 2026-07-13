import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  AppleIcon,
  BotIcon,
  ComputerIcon,
  MonitorIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { userAgent } from "next/server";
import React from "react";

type SessionProps = {
  userAgent: string | null | undefined;
  IpAddress: string | null | undefined;
  Date: string | undefined;
  Location: string;
};

function getOSFromUserAgent(userAgent: string | null | undefined) {
  if (!userAgent) return { name: "Unknown Device", icon: ComputerIcon };

  const ua = userAgent.toLowerCase();

  if (ua.includes("windows")) {
    return { name: "Windows", icon: MonitorIcon };
  }
  if (ua.includes("macintosh") || ua.includes("mac os")) {
    return { name: "macOS", icon: AppleIcon };
  }
  if (ua.includes("linux") || ua.includes("x11")) {
    return { name: "Linux", icon: BotIcon }; // or ComputerIcon as fallback
  }
  if (ua.includes("android")) {
    return { name: "Android", icon: ComputerIcon };
  }
  if (ua.includes("iphone") || ua.includes("ipad")) {
    return { name: "iOS", icon: AppleIcon };
  }

  return { name: "Unknown Device", icon: ComputerIcon };
}

export default function SessionCard({
  userAgent,
  IpAddress,
  Date,
  Location,
}: SessionProps) {
  const { name: deviceName, icon: DeviceIcon } = getOSFromUserAgent(userAgent);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-xl font-bold">Recent Sessions & Activity</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Your most recent login sessions and account activity.
        </p>
        <Separator className="my-4" />
      </div>
      <Card className="flex flex-col">
        <CardHeader className="grid auto-rows-min items-start">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest account activity.</CardDescription>
          <CardAction className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
            <Button>View All</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed">
            <TableBody>
              {/* Header / Label Row */}
              <TableRow>
                <TableCell className="w-2/5 font-medium">
                  Device Type:
                </TableCell>
                <TableCell className="w-1/5">Login Date &amp; Time:</TableCell>
                <TableCell className="w-1/5">Location Used:</TableCell>
                <TableCell className="w-1/5 text-right">Action:</TableCell>
              </TableRow>

              {/* Data Row */}
              <TableRow>
                <TableCell className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
                    <DeviceIcon className="size-5" />
                  </div>
                  <div>
                    <div className="font-medium">{deviceName}</div>
                    <div className="text-sm text-muted-foreground">
                      {IpAddress}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-sm">{Date}</TableCell>

                <TableCell className="text-sm">{Location}</TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Revoke session</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="space-y-1">
        <h3 className="text-xl font-bold">Other Sessions & Activity</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Recent sign-ins and account activity.
        </p>
        <Separator className="my-4" />
      </div>
    </div>
  );
}
