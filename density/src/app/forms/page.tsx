"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Stack } from "@/components/layout/stack";
import { Inline } from "@/components/layout/inline";
import { Separator } from "@/components/ui/separator";

function FormField({
  label,
  children,
  description,
}: {
  label: string;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="space-y-[var(--inset-xs)]">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export default function FormsPage() {
  return (
    <Stack gap="section" className="p-[var(--section-gap)] max-w-2xl mx-auto">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ lineHeight: "var(--line-height-heading)" }}
        >
          Account Settings
        </h1>
        <p
          className="text-muted-foreground"
          style={{ marginTop: "var(--inset-xs)" }}
        >
          Manage your account preferences and settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="md">
            <div className="grid gap-[var(--stack-gap)] md:grid-cols-2">
              <FormField label="First Name">
                <Input placeholder="John" />
              </FormField>
              <FormField label="Last Name">
                <Input placeholder="Doe" />
              </FormField>
            </div>

            <FormField
              label="Email"
              description="We'll never share your email."
            >
              <Input type="email" placeholder="john@example.com" />
            </FormField>

            <FormField label="Company">
              <Input placeholder="Acme Inc." />
            </FormField>

            <FormField label="Role">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="md">
            <Inline align="between">
              <div>
                <div className="font-medium text-sm">Email Notifications</div>
                <div className="text-xs text-muted-foreground">
                  Receive updates via email
                </div>
              </div>
              <Switch />
            </Inline>

            <Separator />

            <Inline align="between">
              <div>
                <div className="font-medium text-sm">Push Notifications</div>
                <div className="text-xs text-muted-foreground">
                  Receive push notifications
                </div>
              </div>
              <Switch defaultChecked />
            </Inline>

            <Separator />

            <div className="flex items-start gap-[var(--inline-gap)]">
              <Checkbox id="marketing" />
              <div className="space-y-1">
                <Label htmlFor="marketing" className="text-sm font-medium">
                  Marketing emails
                </Label>
                <p className="text-xs text-muted-foreground">
                  Receive emails about new products and features
                </p>
              </div>
            </div>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="md">
            <FormField
              label="Current Password"
              description="Enter your current password"
            >
              <Input type="password" placeholder="********" />
            </FormField>

            <FormField label="New Password">
              <Input type="password" placeholder="********" />
            </FormField>

            <FormField
              label="Confirm Password"
              description="Must match the new password"
            >
              <Input type="password" placeholder="********" />
            </FormField>
          </Stack>
        </CardContent>
      </Card>

      <Inline align="end" gap="sm">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </Inline>
    </Stack>
  );
}
