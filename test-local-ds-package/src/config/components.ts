export interface PropDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'enum' | 'function' | 'object' | 'ReactNode';
  required?: boolean;
  defaultValue?: string | number | boolean;
  options?: string[];
  description: string;
}

export interface Example {
  name: string;
  code: string;
  description?: string;
}

export interface ComponentMeta {
  name: string;
  category: 'Form' | 'Navigation' | 'Layout' | 'Media' | 'Feedback' | 'Typography' | 'Data Display' | 'Overlay' | 'Utility';
  importPath: string;
  description: string;
  props: PropDefinition[];
  examples: Example[];
}

export const componentCategories = [
  'Form',
  'Navigation',
  'Layout',
  'Media',
  'Feedback',
  'Typography',
  'Data Display',
  'Overlay',
  'Utility'
] as const;

export const components: ComponentMeta[] = [
  // Form Components
  {
    name: 'Button',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Primary interactive element for actions. Supports multiple variants, sizes, and states.',
    props: [
      { name: 'variant', type: 'enum', options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive'], defaultValue: 'primary', description: 'Visual style variant' },
      { name: 'size', type: 'enum', options: ['sm', 'md', 'lg'], defaultValue: 'md', description: 'Button size' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the button' },
      { name: 'isLoading', type: 'boolean', defaultValue: false, description: 'Shows loading state' },
      { name: 'leftIcon', type: 'ReactNode', description: 'Icon on the left side' },
      { name: 'rightIcon', type: 'ReactNode', description: 'Icon on the right side' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Button content' },
      { name: 'onPress', type: 'function', description: 'Click handler' },
    ],
    examples: [
      { name: 'Basic', code: '<Button>click me</Button>' },
      { name: 'Variants', code: '<Button variant="primary">primary</Button>\n<Button variant="secondary">secondary</Button>\n<Button variant="tertiary">tertiary</Button>\n<Button variant="ghost">ghost</Button>\n<Button variant="destructive">destructive</Button>' },
      { name: 'Sizes', code: '<Button size="sm">small</Button>\n<Button size="md">medium</Button>\n<Button size="lg">large</Button>' },
      { name: 'Loading', code: '<Button isLoading>loading...</Button>' },
    ],
  },
  {
    name: 'Input',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Text input field with label, description, and error states.',
    props: [
      { name: 'label', type: 'string', description: 'Input label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'description', type: 'string', description: 'Helper text below input' },
      { name: 'errorMessage', type: 'string', description: 'Error message to display' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the input' },
      { name: 'isRequired', type: 'boolean', defaultValue: false, description: 'Marks field as required' },
      { name: 'type', type: 'enum', options: ['text', 'email', 'password', 'number', 'tel', 'url'], defaultValue: 'text', description: 'Input type' },
      { name: 'value', type: 'string', description: 'Controlled value' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
    ],
    examples: [
      { name: 'Basic', code: '<Input label="email" placeholder="enter your email" />' },
      { name: 'With Description', code: '<Input label="username" description="must be unique" />' },
      { name: 'With Error', code: '<Input label="password" errorMessage="password is required" />' },
    ],
  },
  {
    name: 'TextField',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Enhanced text input with built-in validation and formatting options.',
    props: [
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'description', type: 'string', description: 'Helper text' },
      { name: 'errorMessage', type: 'string', description: 'Error message' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the field' },
      { name: 'isRequired', type: 'boolean', defaultValue: false, description: 'Required field' },
    ],
    examples: [
      { name: 'Basic', code: '<TextField label="name" placeholder="enter name" />' },
    ],
  },
  {
    name: 'TextArea',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Multi-line text input for longer content.',
    props: [
      { name: 'label', type: 'string', description: 'Textarea label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'description', type: 'string', description: 'Helper text' },
      { name: 'errorMessage', type: 'string', description: 'Error message' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the textarea' },
      { name: 'rows', type: 'number', defaultValue: 3, description: 'Number of visible rows' },
    ],
    examples: [
      { name: 'Basic', code: '<TextArea label="description" placeholder="enter description..." />' },
    ],
  },
  {
    name: 'Select',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Dropdown selection component with single or multiple selection.',
    props: [
      { name: 'label', type: 'string', description: 'Select label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'description', type: 'string', description: 'Helper text' },
      { name: 'errorMessage', type: 'string', description: 'Error message' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the select' },
      { name: 'children', type: 'ReactNode', required: true, description: 'SelectItem children' },
    ],
    examples: [
      { name: 'Basic', code: '<Select label="country">\n  <SelectItem key="us">united states</SelectItem>\n  <SelectItem key="uk">united kingdom</SelectItem>\n  <SelectItem key="ca">canada</SelectItem>\n</Select>' },
    ],
  },
  {
    name: 'SelectItem',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual option item for Select component.',
    props: [
      { name: 'key', type: 'string', required: true, description: 'Unique key for the item' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Item content' },
    ],
    examples: [
      { name: 'Basic', code: '<SelectItem key="option1">option 1</SelectItem>' },
    ],
  },
  {
    name: 'Checkbox',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Checkbox input for boolean or multiple selections.',
    props: [
      { name: 'isSelected', type: 'boolean', description: 'Controlled selected state' },
      { name: 'defaultSelected', type: 'boolean', defaultValue: false, description: 'Default selected state' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the checkbox' },
      { name: 'isIndeterminate', type: 'boolean', defaultValue: false, description: 'Indeterminate state' },
      { name: 'children', type: 'ReactNode', description: 'Checkbox label' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
    ],
    examples: [
      { name: 'Basic', code: '<Checkbox>accept terms and conditions</Checkbox>' },
      { name: 'Controlled', code: '<Checkbox isSelected={checked} onChange={setChecked}>newsletter</Checkbox>' },
    ],
  },
  {
    name: 'CheckboxGroup',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Group of checkboxes with shared state management.',
    props: [
      { name: 'label', type: 'string', description: 'Group label' },
      { name: 'description', type: 'string', description: 'Helper text' },
      { name: 'errorMessage', type: 'string', description: 'Error message' },
      { name: 'value', type: 'object', description: 'Controlled value array' },
      { name: 'defaultValue', type: 'object', description: 'Default value array' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Checkbox children' },
    ],
    examples: [
      { name: 'Basic', code: '<CheckboxGroup label="interests">\n  <Checkbox value="sports">sports</Checkbox>\n  <Checkbox value="music">music</Checkbox>\n  <Checkbox value="art">art</Checkbox>\n</CheckboxGroup>' },
    ],
  },
  {
    name: 'Radio',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Radio input for single selection from options.',
    props: [
      { name: 'value', type: 'string', required: true, description: 'Radio value' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the radio' },
      { name: 'children', type: 'ReactNode', description: 'Radio label' },
    ],
    examples: [
      { name: 'Basic', code: '<Radio value="option1">option 1</Radio>' },
    ],
  },
  {
    name: 'RadioGroup',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Group of radio buttons with single selection.',
    props: [
      { name: 'label', type: 'string', description: 'Group label' },
      { name: 'description', type: 'string', description: 'Helper text' },
      { name: 'errorMessage', type: 'string', description: 'Error message' },
      { name: 'value', type: 'string', description: 'Controlled value' },
      { name: 'defaultValue', type: 'string', description: 'Default value' },
      { name: 'orientation', type: 'enum', options: ['horizontal', 'vertical'], defaultValue: 'vertical', description: 'Layout orientation' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Radio children' },
    ],
    examples: [
      { name: 'Basic', code: '<RadioGroup label="size">\n  <Radio value="sm">small</Radio>\n  <Radio value="md">medium</Radio>\n  <Radio value="lg">large</Radio>\n</RadioGroup>' },
    ],
  },
  {
    name: 'Switch',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Toggle switch for on/off states.',
    props: [
      { name: 'isSelected', type: 'boolean', description: 'Controlled selected state' },
      { name: 'defaultSelected', type: 'boolean', defaultValue: false, description: 'Default selected state' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the switch' },
      { name: 'children', type: 'ReactNode', description: 'Switch label' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
    ],
    examples: [
      { name: 'Basic', code: '<Switch>enable notifications</Switch>' },
      { name: 'Controlled', code: '<Switch isSelected={enabled} onChange={setEnabled}>dark mode</Switch>' },
    ],
  },
  {
    name: 'Slider',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Range slider for selecting numeric values.',
    props: [
      { name: 'label', type: 'string', description: 'Slider label' },
      { name: 'minValue', type: 'number', defaultValue: 0, description: 'Minimum value' },
      { name: 'maxValue', type: 'number', defaultValue: 100, description: 'Maximum value' },
      { name: 'step', type: 'number', defaultValue: 1, description: 'Step increment' },
      { name: 'value', type: 'number', description: 'Controlled value' },
      { name: 'defaultValue', type: 'number', description: 'Default value' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the slider' },
    ],
    examples: [
      { name: 'Basic', code: '<Slider label="volume" defaultValue={50} />' },
      { name: 'Range', code: '<Slider label="price range" minValue={0} maxValue={1000} step={10} />' },
    ],
  },
  {
    name: 'NumberField',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Numeric input with increment/decrement controls.',
    props: [
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'minValue', type: 'number', description: 'Minimum value' },
      { name: 'maxValue', type: 'number', description: 'Maximum value' },
      { name: 'step', type: 'number', defaultValue: 1, description: 'Step increment' },
      { name: 'value', type: 'number', description: 'Controlled value' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the field' },
    ],
    examples: [
      { name: 'Basic', code: '<NumberField label="quantity" defaultValue={1} minValue={0} maxValue={10} />' },
    ],
  },
  {
    name: 'SearchField',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Search input with clear button and search icon.',
    props: [
      { name: 'label', type: 'string', description: 'Search label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'value', type: 'string', description: 'Controlled value' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the field' },
      { name: 'onSubmit', type: 'function', description: 'Submit handler' },
      { name: 'onClear', type: 'function', description: 'Clear handler' },
    ],
    examples: [
      { name: 'Basic', code: '<SearchField label="search" placeholder="search..." />' },
    ],
  },
  {
    name: 'DatePicker',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Date selection with calendar popup.',
    props: [
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'value', type: 'object', description: 'Controlled date value' },
      { name: 'minValue', type: 'object', description: 'Minimum selectable date' },
      { name: 'maxValue', type: 'object', description: 'Maximum selectable date' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the picker' },
      { name: 'granularity', type: 'enum', options: ['day', 'hour', 'minute', 'second'], defaultValue: 'day', description: 'Date precision' },
    ],
    examples: [
      { name: 'Basic', code: '<DatePicker label="date of birth" />' },
    ],
  },
  {
    name: 'DateRangePicker',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Date range selection with dual calendars.',
    props: [
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'value', type: 'object', description: 'Controlled date range value' },
      { name: 'minValue', type: 'object', description: 'Minimum selectable date' },
      { name: 'maxValue', type: 'object', description: 'Maximum selectable date' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the picker' },
    ],
    examples: [
      { name: 'Basic', code: '<DateRangePicker label="trip dates" />' },
    ],
  },
  {
    name: 'TimeField',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Time input with hours, minutes, and optional seconds.',
    props: [
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'value', type: 'object', description: 'Controlled time value' },
      { name: 'hourCycle', type: 'enum', options: ['12', '24'], description: 'Hour cycle format' },
      { name: 'granularity', type: 'enum', options: ['hour', 'minute', 'second'], defaultValue: 'minute', description: 'Time precision' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the field' },
    ],
    examples: [
      { name: 'Basic', code: '<TimeField label="meeting time" />' },
    ],
  },
  {
    name: 'Calendar',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Standalone calendar for date selection.',
    props: [
      { name: 'value', type: 'object', description: 'Controlled date value' },
      { name: 'minValue', type: 'object', description: 'Minimum selectable date' },
      { name: 'maxValue', type: 'object', description: 'Maximum selectable date' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the calendar' },
    ],
    examples: [
      { name: 'Basic', code: '<Calendar />' },
    ],
  },
  {
    name: 'RangeCalendar',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Calendar for selecting date ranges.',
    props: [
      { name: 'value', type: 'object', description: 'Controlled date range value' },
      { name: 'minValue', type: 'object', description: 'Minimum selectable date' },
      { name: 'maxValue', type: 'object', description: 'Maximum selectable date' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the calendar' },
    ],
    examples: [
      { name: 'Basic', code: '<RangeCalendar />' },
    ],
  },
  {
    name: 'Form',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Form container with validation and submission handling.',
    props: [
      { name: 'onSubmit', type: 'function', description: 'Form submit handler' },
      { name: 'validationErrors', type: 'object', description: 'Validation error messages' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Form content' },
    ],
    examples: [
      { name: 'Basic', code: '<Form onSubmit={handleSubmit}>\n  <TextField label="name" name="name" />\n  <Button type="submit">submit</Button>\n</Form>' },
    ],
  },
  {
    name: 'FileTrigger',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'File upload trigger with customizable button.',
    props: [
      { name: 'acceptedFileTypes', type: 'object', description: 'Accepted MIME types' },
      { name: 'allowsMultiple', type: 'boolean', defaultValue: false, description: 'Allow multiple files' },
      { name: 'onSelect', type: 'function', description: 'File selection handler' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Trigger content' },
    ],
    examples: [
      { name: 'Basic', code: '<FileTrigger onSelect={handleFiles}>\n  <Button>upload file</Button>\n</FileTrigger>' },
    ],
  },
  {
    name: 'DropZone',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Drag and drop file upload area.',
    props: [
      { name: 'onDrop', type: 'function', description: 'Drop handler' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Drop zone content' },
    ],
    examples: [
      { name: 'Basic', code: '<DropZone onDrop={handleDrop}>\n  <Text>drag files here</Text>\n</DropZone>' },
    ],
  },

  // Navigation Components
  {
    name: 'HeaderNavigation',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Top navigation header with logo, links, and actions.',
    props: [
      { name: 'logo', type: 'ReactNode', description: 'Logo element' },
      { name: 'children', type: 'ReactNode', description: 'Navigation items' },
      { name: 'actions', type: 'ReactNode', description: 'Right-side actions' },
    ],
    examples: [
      { name: 'Basic', code: '<HeaderNavigation logo={<Logo />}>\n  <NavItem href="/">home</NavItem>\n  <NavItem href="/about">about</NavItem>\n</HeaderNavigation>' },
    ],
  },
  {
    name: 'Tabs',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Tabbed navigation for switching between views.',
    props: [
      { name: 'selectedKey', type: 'string', description: 'Controlled selected tab' },
      { name: 'defaultSelectedKey', type: 'string', description: 'Default selected tab' },
      { name: 'orientation', type: 'enum', options: ['horizontal', 'vertical'], defaultValue: 'horizontal', description: 'Tab orientation' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Tab and TabPanel children' },
    ],
    examples: [
      { name: 'Basic', code: '<Tabs>\n  <TabList>\n    <Tab id="tab1">tab 1</Tab>\n    <Tab id="tab2">tab 2</Tab>\n  </TabList>\n  <TabPanel id="tab1">content 1</TabPanel>\n  <TabPanel id="tab2">content 2</TabPanel>\n</Tabs>' },
    ],
  },
  {
    name: 'TabList',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Container for Tab items.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Tab children' },
    ],
    examples: [
      { name: 'Basic', code: '<TabList>\n  <Tab id="tab1">tab 1</Tab>\n</TabList>' },
    ],
  },
  {
    name: 'Tab',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual tab button.',
    props: [
      { name: 'id', type: 'string', required: true, description: 'Tab identifier' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the tab' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Tab content' },
    ],
    examples: [
      { name: 'Basic', code: '<Tab id="overview">overview</Tab>' },
    ],
  },
  {
    name: 'TabPanel',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Content panel for a tab.',
    props: [
      { name: 'id', type: 'string', required: true, description: 'Panel identifier (matches Tab id)' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Panel content' },
    ],
    examples: [
      { name: 'Basic', code: '<TabPanel id="overview">overview content</TabPanel>' },
    ],
  },
  {
    name: 'Breadcrumbs',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Breadcrumb navigation for hierarchical pages.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Breadcrumb items' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables all items' },
    ],
    examples: [
      { name: 'Basic', code: '<Breadcrumbs>\n  <Breadcrumb href="/">home</Breadcrumb>\n  <Breadcrumb href="/products">products</Breadcrumb>\n  <Breadcrumb>details</Breadcrumb>\n</Breadcrumbs>' },
    ],
  },
  {
    name: 'Breadcrumb',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual breadcrumb item.',
    props: [
      { name: 'href', type: 'string', description: 'Link URL' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Item content' },
    ],
    examples: [
      { name: 'Basic', code: '<Breadcrumb href="/">home</Breadcrumb>' },
    ],
  },
  {
    name: 'Link',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Styled anchor link component.',
    props: [
      { name: 'href', type: 'string', description: 'Link URL' },
      { name: 'target', type: 'enum', options: ['_self', '_blank'], defaultValue: '_self', description: 'Link target' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the link' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Link content' },
    ],
    examples: [
      { name: 'Basic', code: '<Link href="/about">learn more</Link>' },
      { name: 'External', code: '<Link href="https://example.com" target="_blank">external link</Link>' },
    ],
  },
  {
    name: 'Menu',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Dropdown menu with action items.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'MenuItem children' },
      { name: 'onAction', type: 'function', description: 'Action handler' },
    ],
    examples: [
      { name: 'Basic', code: '<MenuTrigger>\n  <Button>options</Button>\n  <Menu>\n    <MenuItem id="edit">edit</MenuItem>\n    <MenuItem id="delete">delete</MenuItem>\n  </Menu>\n</MenuTrigger>' },
    ],
  },
  {
    name: 'MenuTrigger',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Trigger wrapper for Menu component.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Trigger and Menu' },
    ],
    examples: [
      { name: 'Basic', code: '<MenuTrigger>\n  <Button>menu</Button>\n  <Menu>...</Menu>\n</MenuTrigger>' },
    ],
  },
  {
    name: 'MenuItem',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual menu item.',
    props: [
      { name: 'id', type: 'string', required: true, description: 'Item identifier' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the item' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Item content' },
    ],
    examples: [
      { name: 'Basic', code: '<MenuItem id="save">save</MenuItem>' },
    ],
  },

  // Layout Components
  {
    name: 'Card',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Container card with optional header and footer.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Card content' },
    ],
    examples: [
      { name: 'Basic', code: '<Card>\n  <CardHeader>title</CardHeader>\n  <CardBody>content</CardBody>\n  <CardFooter>footer</CardFooter>\n</Card>' },
    ],
  },
  {
    name: 'CardHeader',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Header section of a Card.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Header content' },
    ],
    examples: [
      { name: 'Basic', code: '<CardHeader>card title</CardHeader>' },
    ],
  },
  {
    name: 'CardBody',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Body section of a Card.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Body content' },
    ],
    examples: [
      { name: 'Basic', code: '<CardBody>card content</CardBody>' },
    ],
  },
  {
    name: 'CardFooter',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Footer section of a Card.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Footer content' },
    ],
    examples: [
      { name: 'Basic', code: '<CardFooter><Button>action</Button></CardFooter>' },
    ],
  },
  {
    name: 'Separator',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Visual divider between content sections.',
    props: [
      { name: 'orientation', type: 'enum', options: ['horizontal', 'vertical'], defaultValue: 'horizontal', description: 'Divider orientation' },
    ],
    examples: [
      { name: 'Basic', code: '<Separator />' },
      { name: 'Vertical', code: '<Separator orientation="vertical" />' },
    ],
  },
  {
    name: 'GridList',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Grid layout for list items with selection support.',
    props: [
      { name: 'selectionMode', type: 'enum', options: ['none', 'single', 'multiple'], defaultValue: 'none', description: 'Selection mode' },
      { name: 'children', type: 'ReactNode', required: true, description: 'GridListItem children' },
    ],
    examples: [
      { name: 'Basic', code: '<GridList selectionMode="multiple">\n  <GridListItem>item 1</GridListItem>\n  <GridListItem>item 2</GridListItem>\n</GridList>' },
    ],
  },
  {
    name: 'GridListItem',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual item in a GridList.',
    props: [
      { name: 'id', type: 'string', description: 'Item identifier' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Item content' },
    ],
    examples: [
      { name: 'Basic', code: '<GridListItem id="item1">content</GridListItem>' },
    ],
  },
  {
    name: 'ListBox',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Selectable list with keyboard navigation.',
    props: [
      { name: 'selectionMode', type: 'enum', options: ['none', 'single', 'multiple'], defaultValue: 'single', description: 'Selection mode' },
      { name: 'children', type: 'ReactNode', required: true, description: 'ListBoxItem children' },
    ],
    examples: [
      { name: 'Basic', code: '<ListBox>\n  <ListBoxItem id="1">option 1</ListBoxItem>\n  <ListBoxItem id="2">option 2</ListBoxItem>\n</ListBox>' },
    ],
  },
  {
    name: 'ListBoxItem',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual item in a ListBox.',
    props: [
      { name: 'id', type: 'string', required: true, description: 'Item identifier' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Item content' },
    ],
    examples: [
      { name: 'Basic', code: '<ListBoxItem id="item1">item</ListBoxItem>' },
    ],
  },
  {
    name: 'Table',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Data table with sorting and selection.',
    props: [
      { name: 'selectionMode', type: 'enum', options: ['none', 'single', 'multiple'], defaultValue: 'none', description: 'Row selection mode' },
      { name: 'sortDescriptor', type: 'object', description: 'Sort configuration' },
      { name: 'onSortChange', type: 'function', description: 'Sort change handler' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Table children' },
    ],
    examples: [
      { name: 'Basic', code: '<Table>\n  <TableHeader>\n    <Column>name</Column>\n    <Column>email</Column>\n  </TableHeader>\n  <TableBody>\n    <Row><Cell>john</Cell><Cell>john@example.com</Cell></Row>\n  </TableBody>\n</Table>' },
    ],
  },
  {
    name: 'TableHeader',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Header section of a Table.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Column children' },
    ],
    examples: [
      { name: 'Basic', code: '<TableHeader><Column>name</Column></TableHeader>' },
    ],
  },
  {
    name: 'TableBody',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Body section of a Table.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Row children' },
    ],
    examples: [
      { name: 'Basic', code: '<TableBody><Row>...</Row></TableBody>' },
    ],
  },
  {
    name: 'Column',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Table column header.',
    props: [
      { name: 'id', type: 'string', description: 'Column identifier' },
      { name: 'allowsSorting', type: 'boolean', defaultValue: false, description: 'Enable sorting' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Column header content' },
    ],
    examples: [
      { name: 'Basic', code: '<Column allowsSorting>name</Column>' },
    ],
  },
  {
    name: 'Row',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Table row.',
    props: [
      { name: 'id', type: 'string', description: 'Row identifier' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Cell children' },
    ],
    examples: [
      { name: 'Basic', code: '<Row><Cell>data</Cell></Row>' },
    ],
  },
  {
    name: 'Cell',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Table cell.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Cell content' },
    ],
    examples: [
      { name: 'Basic', code: '<Cell>value</Cell>' },
    ],
  },
  {
    name: 'TagGroup',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Group of removable tags.',
    props: [
      { name: 'label', type: 'string', description: 'Group label' },
      { name: 'onRemove', type: 'function', description: 'Remove handler' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Tag children' },
    ],
    examples: [
      { name: 'Basic', code: '<TagGroup label="tags" onRemove={handleRemove}>\n  <TagList>\n    <Tag id="1">tag 1</Tag>\n    <Tag id="2">tag 2</Tag>\n  </TagList>\n</TagGroup>' },
    ],
  },
  {
    name: 'TagList',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Container for Tag items.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Tag children' },
    ],
    examples: [
      { name: 'Basic', code: '<TagList><Tag id="1">tag</Tag></TagList>' },
    ],
  },
  {
    name: 'Tag',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual tag item.',
    props: [
      { name: 'id', type: 'string', required: true, description: 'Tag identifier' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Tag content' },
    ],
    examples: [
      { name: 'Basic', code: '<Tag id="react">react</Tag>' },
    ],
  },
  {
    name: 'Badge',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Status badge or label.',
    props: [
      { name: 'variant', type: 'enum', options: ['default', 'success', 'warning', 'error', 'info'], defaultValue: 'default', description: 'Badge variant' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Badge content' },
    ],
    examples: [
      { name: 'Basic', code: '<Badge>new</Badge>' },
      { name: 'Variants', code: '<Badge variant="success">active</Badge>\n<Badge variant="warning">pending</Badge>\n<Badge variant="error">failed</Badge>' },
    ],
  },
  {
    name: 'ProgressBar',
    category: 'Feedback',
    importPath: "@marcelinodzn/ds-react",
    description: 'Linear progress indicator.',
    props: [
      { name: 'label', type: 'string', description: 'Progress label' },
      { name: 'value', type: 'number', description: 'Current progress (0-100)' },
      { name: 'minValue', type: 'number', defaultValue: 0, description: 'Minimum value' },
      { name: 'maxValue', type: 'number', defaultValue: 100, description: 'Maximum value' },
      { name: 'isIndeterminate', type: 'boolean', defaultValue: false, description: 'Show indeterminate state' },
    ],
    examples: [
      { name: 'Basic', code: '<ProgressBar label="loading" value={60} />' },
      { name: 'Indeterminate', code: '<ProgressBar label="processing" isIndeterminate />' },
    ],
  },
  {
    name: 'Meter',
    category: 'Feedback',
    importPath: "@marcelinodzn/ds-react",
    description: 'Meter indicator for displaying quantities.',
    props: [
      { name: 'label', type: 'string', description: 'Meter label' },
      { name: 'value', type: 'number', required: true, description: 'Current value' },
      { name: 'minValue', type: 'number', defaultValue: 0, description: 'Minimum value' },
      { name: 'maxValue', type: 'number', defaultValue: 100, description: 'Maximum value' },
    ],
    examples: [
      { name: 'Basic', code: '<Meter label="storage" value={75} />' },
    ],
  },

  // Overlay Components
  {
    name: 'Modal',
    category: 'Overlay',
    importPath: "@marcelinodzn/ds-react",
    description: 'Modal dialog overlay.',
    props: [
      { name: 'isOpen', type: 'boolean', description: 'Controlled open state' },
      { name: 'onOpenChange', type: 'function', description: 'Open state change handler' },
      { name: 'isDismissable', type: 'boolean', defaultValue: true, description: 'Allow dismiss on outside click' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Modal content' },
    ],
    examples: [
      { name: 'Basic', code: '<DialogTrigger>\n  <Button>open modal</Button>\n  <Modal>\n    <Dialog>\n      <Heading>modal title</Heading>\n      <Content>modal content</Content>\n    </Dialog>\n  </Modal>\n</DialogTrigger>' },
    ],
  },
  {
    name: 'Dialog',
    category: 'Overlay',
    importPath: "@marcelinodzn/ds-react",
    description: 'Dialog content container.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Dialog content' },
    ],
    examples: [
      { name: 'Basic', code: '<Dialog>\n  <Heading>title</Heading>\n  <Content>content</Content>\n</Dialog>' },
    ],
  },
  {
    name: 'DialogTrigger',
    category: 'Overlay',
    importPath: "@marcelinodzn/ds-react",
    description: 'Trigger wrapper for Dialog/Modal.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Trigger and Modal/Popover' },
    ],
    examples: [
      { name: 'Basic', code: '<DialogTrigger>\n  <Button>open</Button>\n  <Modal>...</Modal>\n</DialogTrigger>' },
    ],
  },
  {
    name: 'AlertDialog',
    category: 'Overlay',
    importPath: "@marcelinodzn/ds-react",
    description: 'Alert dialog for confirmations.',
    props: [
      { name: 'title', type: 'string', required: true, description: 'Alert title' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Alert content' },
      { name: 'variant', type: 'enum', options: ['default', 'destructive'], defaultValue: 'default', description: 'Alert variant' },
      { name: 'actionLabel', type: 'string', description: 'Primary action label' },
      { name: 'cancelLabel', type: 'string', description: 'Cancel label' },
    ],
    examples: [
      { name: 'Basic', code: '<DialogTrigger>\n  <Button>delete</Button>\n  <Modal>\n    <AlertDialog\n      title="confirm delete"\n      variant="destructive"\n      actionLabel="delete"\n      cancelLabel="cancel"\n    >\n      this action cannot be undone.\n    </AlertDialog>\n  </Modal>\n</DialogTrigger>' },
    ],
  },
  {
    name: 'Popover',
    category: 'Overlay',
    importPath: "@marcelinodzn/ds-react",
    description: 'Floating popover content.',
    props: [
      { name: 'placement', type: 'enum', options: ['top', 'bottom', 'left', 'right'], defaultValue: 'bottom', description: 'Popover placement' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Popover content' },
    ],
    examples: [
      { name: 'Basic', code: '<DialogTrigger>\n  <Button>info</Button>\n  <Popover>\n    <Dialog>popover content</Dialog>\n  </Popover>\n</DialogTrigger>' },
    ],
  },
  {
    name: 'Tooltip',
    category: 'Overlay',
    importPath: "@marcelinodzn/ds-react",
    description: 'Tooltip for additional information.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Tooltip content' },
    ],
    examples: [
      { name: 'Basic', code: '<TooltipTrigger>\n  <Button>hover me</Button>\n  <Tooltip>helpful information</Tooltip>\n</TooltipTrigger>' },
    ],
  },
  {
    name: 'TooltipTrigger',
    category: 'Overlay',
    importPath: "@marcelinodzn/ds-react",
    description: 'Trigger wrapper for Tooltip.',
    props: [
      { name: 'delay', type: 'number', defaultValue: 500, description: 'Show delay in ms' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Trigger and Tooltip' },
    ],
    examples: [
      { name: 'Basic', code: '<TooltipTrigger>\n  <Button>?</Button>\n  <Tooltip>help text</Tooltip>\n</TooltipTrigger>' },
    ],
  },

  // Typography
  {
    name: 'Text',
    category: 'Typography',
    importPath: "@marcelinodzn/ds-react",
    description: 'Text component with semantic variants.',
    props: [
      { name: 'slot', type: 'enum', options: ['description', 'label'], description: 'Text slot type' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Text content' },
    ],
    examples: [
      { name: 'Basic', code: '<Text>regular text</Text>' },
      { name: 'Description', code: '<Text slot="description">helper text</Text>' },
    ],
  },
  {
    name: 'Heading',
    category: 'Typography',
    importPath: "@marcelinodzn/ds-react",
    description: 'Heading component with level variants.',
    props: [
      { name: 'level', type: 'enum', options: ['1', '2', '3', '4', '5', '6'], defaultValue: '2', description: 'Heading level' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Heading content' },
    ],
    examples: [
      { name: 'Basic', code: '<Heading level={1}>page title</Heading>' },
    ],
  },
  {
    name: 'Label',
    category: 'Typography',
    importPath: "@marcelinodzn/ds-react",
    description: 'Form field label.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Label content' },
    ],
    examples: [
      { name: 'Basic', code: '<Label>field label</Label>' },
    ],
  },
  {
    name: 'Group',
    category: 'Utility',
    importPath: "@marcelinodzn/ds-react",
    description: 'Group related elements together.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Group content' },
    ],
    examples: [
      { name: 'Basic', code: '<Group>\n  <Button>one</Button>\n  <Button>two</Button>\n</Group>' },
    ],
  },
  {
    name: 'Toolbar',
    category: 'Utility',
    importPath: "@marcelinodzn/ds-react",
    description: 'Toolbar container for action buttons.',
    props: [
      { name: 'orientation', type: 'enum', options: ['horizontal', 'vertical'], defaultValue: 'horizontal', description: 'Toolbar orientation' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Toolbar content' },
    ],
    examples: [
      { name: 'Basic', code: '<Toolbar>\n  <Button>save</Button>\n  <Button>cancel</Button>\n</Toolbar>' },
    ],
  },
  {
    name: 'ToggleButton',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Toggle button with pressed state.',
    props: [
      { name: 'isSelected', type: 'boolean', description: 'Controlled selected state' },
      { name: 'defaultSelected', type: 'boolean', defaultValue: false, description: 'Default selected state' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the button' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Button content' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
    ],
    examples: [
      { name: 'Basic', code: '<ToggleButton>bold</ToggleButton>' },
    ],
  },
  {
    name: 'ComboBox',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Combobox with autocomplete functionality.',
    props: [
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'children', type: 'ReactNode', required: true, description: 'ListBoxItem children' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the combobox' },
    ],
    examples: [
      { name: 'Basic', code: '<ComboBox label="country">\n  <ListBoxItem id="us">united states</ListBoxItem>\n  <ListBoxItem id="uk">united kingdom</ListBoxItem>\n</ComboBox>' },
    ],
  },
];

export const getComponentByName = (name: string): ComponentMeta | undefined => {
  return components.find(c => c.name.toLowerCase() === name.toLowerCase());
};

export const getComponentsByCategory = (category: string): ComponentMeta[] => {
  return components.filter(c => c.category === category);
};
