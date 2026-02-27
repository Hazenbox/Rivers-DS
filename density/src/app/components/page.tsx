"use client";

import * as React from "react";
import { Stack } from "@/components/layout/stack";
import { Inline } from "@/components/layout/inline";
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
  Bold,
  Italic,
  Terminal,
  Underline,
  ChevronsUpDown,
} from "lucide-react";

function ComponentCell({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-[200px] p-[var(--inset-md)]">
      <div className="text-xs font-medium text-muted-foreground mb-[var(--inset-sm)] uppercase tracking-wide">
        {name}
      </div>
      <div className="min-h-[80px] flex items-center">{children}</div>
    </div>
  );
}

function ComponentRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap border-b border-border">
      {children}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-muted/50 border-b border-border p-[var(--inset-sm)]">
      <h2 className="text-sm font-semibold uppercase tracking-wider">{title}</h2>
    </div>
  );
}

export default function ComponentsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [progress] = React.useState(45);
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="p-[var(--section-gap)]">
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
            All shadcn/ui components with row-based layout. Toggle density to test.
          </p>
        </div>

        <div className="border-t border-border">
          {/* BUTTONS & ACTIONS */}
          <SectionHeader title="Buttons & Actions" />
          <ComponentRow>
            <ComponentCell name="Button">
              <Inline gap="xs" wrap>
                <Button size="sm">Default</Button>
                <Button size="sm" variant="secondary">Secondary</Button>
                <Button size="sm" variant="outline">Outline</Button>
              </Inline>
            </ComponentCell>
            <ComponentCell name="Button Sizes">
              <Inline gap="xs" wrap>
                <Button size="sm">Sm</Button>
                <Button size="default">Md</Button>
                <Button size="lg">Lg</Button>
              </Inline>
            </ComponentCell>
            <ComponentCell name="Toggle">
              <Inline gap="xs">
                <Toggle size="sm" aria-label="Bold">
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" aria-label="Italic" variant="outline">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" aria-label="Underline" defaultPressed>
                  <Underline className="h-4 w-4" />
                </Toggle>
              </Inline>
            </ComponentCell>
            <ComponentCell name="Toggle Group">
              <ToggleGroup type="multiple" size="sm">
                <ToggleGroupItem value="bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
              </ToggleGroup>
            </ComponentCell>
          </ComponentRow>

          {/* FORM CONTROLS */}
          <SectionHeader title="Form Controls" />
          <ComponentRow>
            <ComponentCell name="Input">
              <Input placeholder="Type here..." className="w-full max-w-[200px]" />
            </ComponentCell>
            <ComponentCell name="Textarea">
              <Textarea placeholder="Message..." className="w-full max-w-[200px] min-h-[60px]" />
            </ComponentCell>
            <ComponentCell name="Select">
              <Select>
                <SelectTrigger className="w-full max-w-[200px]">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </ComponentCell>
            <ComponentCell name="Checkbox">
              <Stack gap="xs">
                <Inline gap="xs">
                  <Checkbox id="c1" />
                  <Label htmlFor="c1" className="text-sm">Option A</Label>
                </Inline>
                <Inline gap="xs">
                  <Checkbox id="c2" defaultChecked />
                  <Label htmlFor="c2" className="text-sm">Option B</Label>
                </Inline>
              </Stack>
            </ComponentCell>
          </ComponentRow>
          <ComponentRow>
            <ComponentCell name="Radio Group">
              <RadioGroup defaultValue="1">
                <Inline gap="xs">
                  <RadioGroupItem value="1" id="r1" />
                  <Label htmlFor="r1" className="text-sm">A</Label>
                </Inline>
                <Inline gap="xs">
                  <RadioGroupItem value="2" id="r2" />
                  <Label htmlFor="r2" className="text-sm">B</Label>
                </Inline>
              </RadioGroup>
            </ComponentCell>
            <ComponentCell name="Switch">
              <Stack gap="xs">
                <Inline gap="xs">
                  <Switch id="s1" />
                  <Label htmlFor="s1" className="text-sm">Off</Label>
                </Inline>
                <Inline gap="xs">
                  <Switch id="s2" defaultChecked />
                  <Label htmlFor="s2" className="text-sm">On</Label>
                </Inline>
              </Stack>
            </ComponentCell>
            <ComponentCell name="Slider">
              <div className="w-full max-w-[200px]">
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} />
                <div className="text-xs text-muted-foreground mt-1">{sliderValue}%</div>
              </div>
            </ComponentCell>
            <ComponentCell name="Input OTP">
              <InputOTP maxLength={4}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </ComponentCell>
          </ComponentRow>
          <ComponentRow>
            <ComponentCell name="Calendar">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded border scale-[0.85] origin-top-left"
              />
            </ComponentCell>
          </ComponentRow>

          {/* DATA DISPLAY */}
          <SectionHeader title="Data Display" />
          <ComponentRow>
            <ComponentCell name="Badge">
              <Inline gap="xs" wrap>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </Inline>
            </ComponentCell>
            <ComponentCell name="Avatar">
              <Inline gap="xs">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </Inline>
            </ComponentCell>
            <ComponentCell name="Skeleton">
              <Stack gap="xs" className="w-full max-w-[200px]">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </Stack>
            </ComponentCell>
            <ComponentCell name="Progress">
              <div className="w-full max-w-[200px]">
                <Progress value={progress} />
                <div className="text-xs text-muted-foreground mt-1">{progress}%</div>
              </div>
            </ComponentCell>
          </ComponentRow>
          <ComponentRow>
            <ComponentCell name="Spinner">
              <Inline gap="sm">
                <Spinner className="h-4 w-4" />
                <Spinner className="h-6 w-6" />
                <Spinner className="h-8 w-8" />
              </Inline>
            </ComponentCell>
            <ComponentCell name="Accordion">
              <Accordion type="single" collapsible className="w-full max-w-[200px]">
                <AccordionItem value="1" className="border-b-0">
                  <AccordionTrigger className="text-sm py-1">Expand</AccordionTrigger>
                  <AccordionContent className="text-xs">Content here</AccordionContent>
                </AccordionItem>
              </Accordion>
            </ComponentCell>
            <ComponentCell name="Tabs">
              <Tabs defaultValue="1" className="w-full max-w-[200px]">
                <TabsList className="h-8">
                  <TabsTrigger value="1" className="text-xs">Tab 1</TabsTrigger>
                  <TabsTrigger value="2" className="text-xs">Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value="1" className="text-xs mt-1">Content 1</TabsContent>
                <TabsContent value="2" className="text-xs mt-1">Content 2</TabsContent>
              </Tabs>
            </ComponentCell>
            <ComponentCell name="Table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-8 text-xs">Name</TableHead>
                    <TableHead className="h-8 text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="py-1 text-xs">John</TableCell>
                    <TableCell className="py-1 text-xs">Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ComponentCell>
          </ComponentRow>
          <ComponentRow>
            <ComponentCell name="Card">
              <Card className="w-full max-w-[200px]">
                <CardHeader className="p-2">
                  <CardTitle className="text-xs">Title</CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <p className="text-xs text-muted-foreground">Content</p>
                </CardContent>
              </Card>
            </ComponentCell>
            <ComponentCell name="Separator">
              <Stack gap="xs" className="w-full max-w-[200px]">
                <div className="text-xs">Above</div>
                <Separator />
                <div className="text-xs">Below</div>
              </Stack>
            </ComponentCell>
            <ComponentCell name="Aspect Ratio">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded w-24">
                <div className="flex items-center justify-center h-full text-xs">16:9</div>
              </AspectRatio>
            </ComponentCell>
          </ComponentRow>

          {/* FEEDBACK */}
          <SectionHeader title="Feedback" />
          <ComponentRow>
            <ComponentCell name="Alert">
              <Alert className="w-full max-w-[250px]">
                <Terminal className="h-3 w-3" />
                <AlertTitle className="text-xs">Alert</AlertTitle>
                <AlertDescription className="text-xs">Message here</AlertDescription>
              </Alert>
            </ComponentCell>
            <ComponentCell name="Alert Dialog">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline">Open</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm?</AlertDialogTitle>
                    <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>OK</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ComponentCell>
            <ComponentCell name="Dialog">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">Open</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog</DialogTitle>
                    <DialogDescription>Description here</DialogDescription>
                  </DialogHeader>
                  <Input placeholder="Input..." />
                </DialogContent>
              </Dialog>
            </ComponentCell>
            <ComponentCell name="Drawer">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button size="sm" variant="outline">Open</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer</DrawerTitle>
                    <DrawerDescription>Content here</DrawerDescription>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            </ComponentCell>
          </ComponentRow>
          <ComponentRow>
            <ComponentCell name="Sheet">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm" variant="outline">Open</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet</SheetTitle>
                    <SheetDescription>Content here</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </ComponentCell>
            <ComponentCell name="Tooltip">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline">Hover</Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip text</TooltipContent>
              </Tooltip>
            </ComponentCell>
            <ComponentCell name="Hover Card">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button size="sm" variant="link">@user</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60">
                  <div className="text-sm font-semibold">User Name</div>
                  <div className="text-xs text-muted-foreground">Description</div>
                </HoverCardContent>
              </HoverCard>
            </ComponentCell>
            <ComponentCell name="Popover">
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline">Open</Button>
                </PopoverTrigger>
                <PopoverContent className="w-60">
                  <div className="text-sm font-medium">Settings</div>
                  <Input placeholder="Value" className="mt-2" />
                </PopoverContent>
              </Popover>
            </ComponentCell>
          </ComponentRow>

          {/* NAVIGATION */}
          <SectionHeader title="Navigation" />
          <ComponentRow>
            <ComponentCell name="Breadcrumb">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-xs">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-xs">Page</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </ComponentCell>
            <ComponentCell name="Pagination">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" className="h-8 text-xs" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="h-8 w-8 text-xs">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive className="h-8 w-8 text-xs">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" className="h-8 text-xs" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </ComponentCell>
            <ComponentCell name="Menubar">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="text-xs">File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem className="text-xs">New</MenubarItem>
                    <MenubarItem className="text-xs">Open</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-xs">Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem className="text-xs">Undo</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </ComponentCell>
            <ComponentCell name="Dropdown Menu">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="text-xs">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ComponentCell>
          </ComponentRow>
          <ComponentRow>
            <ComponentCell name="Command">
              <Command className="border rounded w-full max-w-[200px]">
                <CommandInput placeholder="Search..." className="h-8 text-xs" />
                <CommandList>
                  <CommandEmpty className="text-xs py-2">No results</CommandEmpty>
                  <CommandGroup>
                    <CommandItem className="text-xs">Item 1</CommandItem>
                    <CommandItem className="text-xs">Item 2</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </ComponentCell>
            <ComponentCell name="Context Menu">
              <ContextMenu>
                <ContextMenuTrigger className="flex h-16 w-full max-w-[150px] items-center justify-center rounded border border-dashed text-xs">
                  Right click
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem className="text-xs">Action 1</ContextMenuItem>
                  <ContextMenuItem className="text-xs">Action 2</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </ComponentCell>
          </ComponentRow>

          {/* LAYOUT */}
          <SectionHeader title="Layout" />
          <ComponentRow>
            <ComponentCell name="Scroll Area">
              <ScrollArea className="h-20 w-full max-w-[200px] rounded border p-2">
                <Stack gap="xs">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="text-xs">Item {i}</div>
                  ))}
                </Stack>
              </ScrollArea>
            </ComponentCell>
            <ComponentCell name="Collapsible">
              <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen} className="w-full max-w-[200px]">
                <Inline align="between">
                  <span className="text-xs">Toggle</span>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ChevronsUpDown className="h-3 w-3" />
                    </Button>
                  </CollapsibleTrigger>
                </Inline>
                <CollapsibleContent className="mt-1">
                  <div className="rounded border p-2 text-xs">Hidden content</div>
                </CollapsibleContent>
              </Collapsible>
            </ComponentCell>
            <ComponentCell name="Resizable">
              <ResizablePanelGroup className="border rounded h-20 w-full max-w-[200px]">
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center text-xs">A</div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center text-xs">B</div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ComponentCell>
            <ComponentCell name="Carousel">
              <Carousel className="w-full max-w-[160px] mx-auto">
                <CarouselContent>
                  {[1, 2, 3].map((n) => (
                    <CarouselItem key={n}>
                      <div className="flex aspect-square items-center justify-center rounded border text-lg font-semibold">
                        {n}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="h-6 w-6" />
                <CarouselNext className="h-6 w-6" />
              </Carousel>
            </ComponentCell>
          </ComponentRow>
        </div>
      </div>
    </TooltipProvider>
  );
}
