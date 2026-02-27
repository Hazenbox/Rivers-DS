"use client";

import * as React from "react";
import { Stack } from "@/components/layout/stack";
import { Inline } from "@/components/layout/inline";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  Italic,
  Terminal,
  Underline,
  ChevronsUpDown,
} from "lucide-react";

function ComponentRow({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-[var(--stack-gap)] border-b border-border last:border-b-0">
      <div className="flex flex-col md:flex-row md:items-center gap-[var(--stack-gap)]">
        <div className="w-full md:w-48 shrink-0">
          <span className="font-medium text-sm">{name}</span>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="pt-[var(--section-gap)] pb-[var(--stack-gap)] border-b-2 border-foreground/20">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}

export default function ComponentsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [progress, setProgress] = React.useState(45);
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="p-[var(--section-gap)] max-w-6xl mx-auto">
        <div className="mb-[var(--section-gap)]">
          <Badge variant="secondary" className="mb-[var(--stack-gap)]">
            45 Components
          </Badge>
          <h1
            className="text-3xl font-bold"
            style={{ lineHeight: "var(--line-height-heading)" }}
          >
            Component Showcase
          </h1>
          <p className="text-muted-foreground mt-[var(--inset-xs)]">
            All shadcn/ui components. Toggle density to see how each responds.
          </p>
        </div>

        {/* BUTTONS & ACTIONS */}
        <SectionHeader title="Buttons & Actions" />
        
        <ComponentRow name="Button">
          <Inline gap="sm" wrap>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </Inline>
        </ComponentRow>

        <ComponentRow name="Button Sizes">
          <Inline gap="sm" wrap>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </Inline>
        </ComponentRow>

        <ComponentRow name="Toggle">
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
        </ComponentRow>

        <ComponentRow name="Toggle Group">
          <ToggleGroup type="multiple">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </ComponentRow>

        {/* FORM CONTROLS */}
        <SectionHeader title="Form Controls" />

        <ComponentRow name="Input">
          <Stack gap="sm" className="max-w-sm">
            <Input placeholder="Default input" />
            <Input placeholder="Disabled" disabled />
          </Stack>
        </ComponentRow>

        <ComponentRow name="Textarea">
          <Textarea placeholder="Type your message here..." className="max-w-sm" />
        </ComponentRow>

        <ComponentRow name="Select">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </ComponentRow>

        <ComponentRow name="Checkbox">
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
        </ComponentRow>

        <ComponentRow name="Radio Group">
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
        </ComponentRow>

        <ComponentRow name="Switch">
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
        </ComponentRow>

        <ComponentRow name="Slider">
          <Stack gap="sm" className="max-w-sm">
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
        </ComponentRow>

        <ComponentRow name="Input OTP">
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
        </ComponentRow>

        <ComponentRow name="Calendar">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-fit"
          />
        </ComponentRow>

        {/* DATA DISPLAY */}
        <SectionHeader title="Data Display" />

        <ComponentRow name="Badge">
          <Inline gap="sm" wrap>
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </Inline>
        </ComponentRow>

        <ComponentRow name="Avatar">
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
        </ComponentRow>

        <ComponentRow name="Skeleton">
          <Stack gap="sm" className="max-w-sm">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </Stack>
        </ComponentRow>

        <ComponentRow name="Progress">
          <Stack gap="sm" className="max-w-sm">
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
        </ComponentRow>

        <ComponentRow name="Spinner">
          <Inline gap="md">
            <Spinner className="h-4 w-4" />
            <Spinner className="h-6 w-6" />
            <Spinner className="h-8 w-8" />
          </Inline>
        </ComponentRow>

        <ComponentRow name="Accordion">
          <Accordion type="single" collapsible className="w-full max-w-sm">
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
        </ComponentRow>

        <ComponentRow name="Tabs">
          <Tabs defaultValue="tab1" className="w-full max-w-sm">
            <TabsList>
              <TabsTrigger value="tab1">Account</TabsTrigger>
              <TabsTrigger value="tab2">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <p className="text-sm text-muted-foreground">Account settings here.</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p className="text-sm text-muted-foreground">Password settings here.</p>
            </TabsContent>
          </Tabs>
        </ComponentRow>

        <ComponentRow name="Table">
          <div className="max-w-md">
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
          </div>
        </ComponentRow>

        <ComponentRow name="Card">
          <Card className="max-w-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Card content with density-aware spacing.
              </p>
            </CardContent>
          </Card>
        </ComponentRow>

        <ComponentRow name="Aspect Ratio">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md max-w-[200px]">
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              16:9
            </div>
          </AspectRatio>
        </ComponentRow>

        {/* FEEDBACK */}
        <SectionHeader title="Feedback" />

        <ComponentRow name="Alert">
          <Stack gap="sm" className="max-w-md">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>You can add components.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>
          </Stack>
        </ComponentRow>

        <ComponentRow name="Alert Dialog">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Open Alert Dialog</Button>
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
        </ComponentRow>

        <ComponentRow name="Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile.</DialogDescription>
              </DialogHeader>
              <Stack gap="sm">
                <Input placeholder="Name" />
                <Input placeholder="Email" />
              </Stack>
            </DialogContent>
          </Dialog>
        </ComponentRow>

        <ComponentRow name="Drawer">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit Profile</DrawerTitle>
                <DrawerDescription>Make changes to your profile.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <Input placeholder="Name" />
              </div>
            </DrawerContent>
          </Drawer>
        </ComponentRow>

        <ComponentRow name="Sheet">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>Make changes to your profile.</SheetDescription>
              </SheetHeader>
              <Stack gap="sm" className="mt-4">
                <Input placeholder="Name" />
                <Input placeholder="Email" />
              </Stack>
            </SheetContent>
          </Sheet>
        </ComponentRow>

        <ComponentRow name="Tooltip">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </ComponentRow>

        <ComponentRow name="Hover Card">
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
        </ComponentRow>

        <ComponentRow name="Popover">
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
                    <Input id="height" className="w-20" defaultValue="200" />
                  </Inline>
                </div>
              </Stack>
            </PopoverContent>
          </Popover>
        </ComponentRow>

        {/* NAVIGATION */}
        <SectionHeader title="Navigation" />

        <ComponentRow name="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ComponentRow>

        <ComponentRow name="Pagination">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </ComponentRow>

        <ComponentRow name="Menubar">
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
        </ComponentRow>

        <ComponentRow name="Command">
          <Command className="border rounded-lg max-w-sm">
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
        </ComponentRow>

        <ComponentRow name="Context Menu">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[100px] w-[200px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Profile</ContextMenuItem>
              <ContextMenuItem>Billing</ContextMenuItem>
              <ContextMenuItem>Settings</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </ComponentRow>

        <ComponentRow name="Dropdown Menu">
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
        </ComponentRow>

        {/* LAYOUT */}
        <SectionHeader title="Layout" />

        <ComponentRow name="Separator">
          <Stack gap="sm" className="max-w-sm">
            <div className="text-sm">Section 1</div>
            <Separator />
            <div className="text-sm">Section 2</div>
            <Separator />
            <div className="text-sm">Section 3</div>
          </Stack>
        </ComponentRow>

        <ComponentRow name="Scroll Area">
          <ScrollArea className="h-[120px] w-[200px] rounded-md border p-4">
            <Stack gap="xs">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="text-sm">Item {i + 1}</div>
              ))}
            </Stack>
          </ScrollArea>
        </ComponentRow>

        <ComponentRow name="Collapsible">
          <Collapsible
            open={isCollapsibleOpen}
            onOpenChange={setIsCollapsibleOpen}
            className="max-w-sm"
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
                <div className="rounded-md border px-4 py-2 text-sm">Item 1</div>
                <div className="rounded-md border px-4 py-2 text-sm">Item 2</div>
              </Stack>
            </CollapsibleContent>
          </Collapsible>
        </ComponentRow>

        <ComponentRow name="Resizable">
          <ResizablePanelGroup className="border rounded-lg min-h-[100px] max-w-md">
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
        </ComponentRow>

        <ComponentRow name="Carousel">
          <Carousel className="w-full max-w-[250px]">
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <CarouselItem key={num}>
                  <div className="p-1">
                    <div className="flex aspect-square items-center justify-center rounded-md border">
                      <span className="text-2xl font-semibold">{num}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </ComponentRow>

      </div>
    </TooltipProvider>
  );
}
