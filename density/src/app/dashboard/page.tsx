import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Stack } from "@/components/layout/stack";
import { Inline } from "@/components/layout/inline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Filter } from "lucide-react";

const users = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "Editor", "Viewer"][i % 3],
  status: ["Active", "Pending", "Inactive"][i % 3],
  lastActive: "2026-02-27",
}));

export default function DashboardPage() {
  return (
    <Stack gap="section" className="p-[var(--section-gap)]">
      <Inline align="between">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ lineHeight: "var(--line-height-heading)" }}
          >
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your users and permissions
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </Inline>

      <div className="grid gap-[var(--stack-gap)] md:grid-cols-4">
        {[
          { label: "Total Users", value: "2,847" },
          { label: "Active", value: "2,103" },
          { label: "Pending", value: "421" },
          { label: "Inactive", value: "323" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Inline gap="md">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </Inline>

      <Card>
        <CardContent className="pt-[var(--inset-lg)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "Active"
                          ? "default"
                          : user.status === "Pending"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Stack>
  );
}
