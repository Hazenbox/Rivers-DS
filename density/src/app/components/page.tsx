"use client";

import * as React from "react";
import { Stack } from "@/components/layout/stack";
import { Inline } from "@/components/layout/inline";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  AlertCircle,
  Bold,
  ChevronDown,
  Info,
  Italic,
  Terminal,
  Underline,
  ChevronsUpDown,
} from "lucide-react";

function ComponentCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function ComponentsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [progress, setProgress] = React.useState(45);
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <Stack gap="section" className="p-[var(--section-gap)]">
        <div>
          <Badge variant="secondary" className="mb-[var(--stack-gap)]">
            45 Components
          </Badge>
          <h1
            className="text-3xl font-bold"
            style={{ lineHeight: "var(--line-height-heading)" }}
          >
            Component Showcase
          </h1>
          <p
            className="text-muted-foreground mt-[var(--inset-xs)]"
            style={{ marginBottom: "var(--text-margin-after-p)" }}
          >
            All shadcn/ui components in one place. Toggle density to see how
            each component responds.
          </p>
        </div>

        {/* BUTTONS & ACTIONS */}
        <Section title="Buttons & Actions">
          <div className="grid gap-[var(--stack-gap)] md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Button">
              <Stack gap="sm">
                <Inline gap="sm" wrap>
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </Inline>
                <Inline gap="sm" wrap>
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </Inline>
              </Stack>
            </ComponentCard>

            <ComponentCard title="Toggle">
              <Inline gap="sm" wrap>
                <Toggle aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle italic" variant="outline">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle underline" defaultPressed>
                  <Underline className="h-4 w-4" />
                </Toggle>
              </Inline>
            </ComponentCard>

            <ComponentCard title="Toggle Group">
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline"
                  aria-label="Toggle underline"
                >
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </ComponentCard>
          </div>
        </Section>

        {/* FORM CONTROLS */}
        <Section title="Form Controls">
          <div className="grid gap-[var(--stack-gap)] md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Input">
              <Stack gap="sm">
                <Input placeholder="Default input" />
                <Input placeholder="Disabled" disabled />
              </Stack>
            </ComponentCard>

            <ComponentCard title="Textarea">
              <Textarea placeholder="Type your message here..." />
            </ComponentCard>

            <ComponentCard title="Select">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </ComponentCard>

            <ComponentCard title="Checkbox">
              <Stack gap="sm">
                <Inline gap="sm">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms</Label>
                </Inline>
                <Inline gap="sm">
                  <Checkbox id="newsletter" defaultChecked />
                  <Label htmlFor="newsletter">Subscribe</Label>
                </Inline>
              </Stack>
            </ComponentCard>

            <ComponentCard title="Radio Group">
              <RadioGroup defaultValue="option1">
                <Inline gap="sm">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1">Option 1</Label>
                </Inline>
                <Inline gap="sm">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2">Option 2</Label>
                </Inline>
              </RadioGroup>
            </ComponentCard>

            <ComponentCard title="Switch">
              <Stack gap="sm">
                <Inline gap="sm">
                  <Switch id="airplane" />
                  <Label htmlFor="airplane">Airplane Mode</Label>
                </Inline>
                <Inline gap="sm">
                  <Switch id="dark" defaultChecked />
                  <Label htmlFor="dark">Dark Mode</Label>
                </Inline>
              </Stack>
            </ComponentCard>

            <ComponentCard title="Slider">
              <Stack gap="sm">
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">
                  Value: {sliderValue}
                </span>
              </Stack>
            </ComponentCard>

            <ComponentCard title="Input OTP">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </ComponentCard>

            <ComponentCard title="Calendar">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </ComponentCard>
          </div>
        </Section>

        {/* DATA DISPLAY */}
        <Section title="Data Display">
          <div className="grid gap-[var(--stack-gap)] md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Badge">
              <Inline gap="sm" wrap>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </Inline>
            </ComponentCard>

            <ComponentCard title="Avatar">
              <Inline gap="sm">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </Inline>
            </ComponentCard>

            <ComponentCard title="Skeleton">
              <Stack gap="sm">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </Stack>
            </ComponentCard>

            <ComponentCard title="Progress">
              <Stack gap="sm">
                <Progress value={progress} />
                <Inline gap="sm">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10
                  </Button>
                  <span className="text-sm">{progress}%</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10
                  </Button>
                </Inline>
              </Stack>
            </ComponentCard>

            <ComponentCard title="Spinner">
              <Inline gap="md">
                <Spinner className="h-4 w-4" />
                <Spinner className="h-6 w-6" />
                <Spinner className="h-8 w-8" />
              </Inline>
            </ComponentCard>

            <ComponentCard title="Accordion">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ComponentCard>

            <ComponentCard title="Tabs">
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList>
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <p className="text-sm text-muted-foreground">
                    Account settings here.
                  </p>
                </TabsContent>
                <TabsContent value="tab2">
                  <p className="text-sm text-muted-foreground">
                    Password settings here.
                  </p>
                </TabsContent>
              </Tabs>
            </ComponentCard>

            <ComponentCard title="Table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane</TableCell>
                    <TableCell>Pending</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ComponentCard>

            <ComponentCard title="Aspect Ratio">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  16:9
                </div>
              </AspectRatio>
            </ComponentCard>
          </div>
        </Section>

        {/* FEEDBACK */}
        <Section title="Feedback">
          <div className="grid gap-[var(--stack-gap)] md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Alert">
              <Stack gap="sm">
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    You can add components to your app.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Something went wrong.</AlertDescription>
                </Alert>
              </Stack>
            </ComponentCard>

            <ComponentCard title="Alert Dialog">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ComponentCard>

            <ComponentCard title="Dialog">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here.
                    </DialogDescription>
                  </DialogHeader>
                  <Stack gap="sm">
                    <Input placeholder="Name" />
                    <Input placeholder="Email" />
                  </Stack>
                </DialogContent>
              </Dialog>
            </ComponentCard>

            <ComponentCard title="Drawer">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Edit Profile</DrawerTitle>
                    <DrawerDescription>
                      Make changes to your profile.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <Input placeholder="Name" />
                  </div>
                </DrawerContent>
              </Drawer>
            </ComponentCard>

            <ComponentCard title="Sheet">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile.
                    </SheetDescription>
                  </SheetHeader>
                  <Stack gap="sm" className="mt-4">
                    <Input placeholder="Name" />
                    <Input placeholder="Email" />
                  </Stack>
                </SheetContent>
              </Sheet>
            </ComponentCard>

            <ComponentCard title="Tooltip">
              <Inline gap="sm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              </Inline>
            </ComponentCard>

            <ComponentCard title="Hover Card">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">@shadcn</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <Stack gap="sm">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">@shadcn</h4>
                      <p className="text-sm text-muted-foreground">
                        The creator of shadcn/ui.
                      </p>
                    </div>
                  </Stack>
                </HoverCardContent>
              </HoverCard>
            </ComponentCard>

            <ComponentCard title="Popover">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <Stack gap="sm">
                    <h4 className="font-medium">Dimensions</h4>
                    <div className="grid gap-2">
                      <Inline align="between">
                        <Label htmlFor="width">Width</Label>
                        <Input id="width" className="w-20" defaultValue="100" />
                      </Inline>
                      <Inline align="between">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          className="w-20"
                          defaultValue="200"
                        />
                      </Inline>
                    </div>
                  </Stack>
                </PopoverContent>
              </Popover>
            </ComponentCard>
          </div>
        </Section>

        {/* NAVIGATION */}
        <Section title="Navigation">
          <div className="grid gap-[var(--stack-gap)] md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Breadcrumb">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">
                      Components
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </ComponentCard>

            <ComponentCard title="Pagination">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </ComponentCard>

            <ComponentCard title="Menubar">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>New Tab</MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Undo</MenubarItem>
                    <MenubarItem>Redo</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </ComponentCard>

            <ComponentCard title="Command">
              <Command className="border rounded-lg">
                <CommandInput placeholder="Type a command..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </ComponentCard>

            <ComponentCard title="Context Menu">
              <ContextMenu>
                <ContextMenuTrigger className="flex h-[100px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                  Right click here
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Profile</ContextMenuItem>
                  <ContextMenuItem>Billing</ContextMenuItem>
                  <ContextMenuItem>Settings</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </ComponentCard>

            <ComponentCard title="Dropdown Menu">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ComponentCard>
          </div>
        </Section>

        {/* LAYOUT */}
        <Section title="Layout">
          <div className="grid gap-[var(--stack-gap)] md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Separator">
              <Stack gap="sm">
                <div className="text-sm">Section 1</div>
                <Separator />
                <div className="text-sm">Section 2</div>
                <Separator />
                <div className="text-sm">Section 3</div>
              </Stack>
            </ComponentCard>

            <ComponentCard title="Scroll Area">
              <ScrollArea className="h-[120px] w-full rounded-md border p-4">
                <Stack gap="xs">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="text-sm">
                      Item {i + 1}
                    </div>
                  ))}
                </Stack>
              </ScrollArea>
            </ComponentCard>

            <ComponentCard title="Collapsible">
              <Collapsible
                open={isCollapsibleOpen}
                onOpenChange={setIsCollapsibleOpen}
              >
                <Inline align="between">
                  <span className="text-sm font-medium">Toggle Content</span>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronsUpDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </Inline>
                <CollapsibleContent className="mt-2">
                  <Stack gap="xs">
                    <div className="rounded-md border px-4 py-2 text-sm">
                      Item 1
                    </div>
                    <div className="rounded-md border px-4 py-2 text-sm">
                      Item 2
                    </div>
                  </Stack>
                </CollapsibleContent>
              </Collapsible>
            </ComponentCard>

            <ComponentCard title="Resizable">
              <ResizablePanelGroup className="border rounded-lg min-h-[100px]">
                <ResizablePanel defaultSize={50} minSize={25}>
                  <div className="flex h-full items-center justify-center p-2">
                    <span className="text-sm">Panel 1</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={25}>
                  <div className="flex h-full items-center justify-center p-2">
                    <span className="text-sm">Panel 2</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ComponentCard>

            <ComponentCard title="Carousel">
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <CarouselItem key={num}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-2xl font-semibold">
                              {num}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </ComponentCard>

            <ComponentCard title="Card">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Nested Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Card content with density-aware spacing.
                  </p>
                </CardContent>
              </Card>
            </ComponentCard>
          </div>
        </Section>
      </Stack>
    </TooltipProvider>
  );
}
