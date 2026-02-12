export interface PropDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'enum' | 'function' | 'object' | 'ReactNode' | 'array';
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
    description: 'Primary interactive element for actions. Supports multiple sizes, appearances, and attention levels.',
    props: [
      { name: 'size', type: 'enum', options: ['XS', 'S', 'M', 'L', 'XL'], defaultValue: 'M', description: 'Button size variant' },
      { name: 'attention', type: 'enum', options: ['low', 'medium', 'high'], defaultValue: 'medium', description: 'Visual prominence level' },
      { name: 'appearance', type: 'enum', options: ['auto', 'primary', 'secondary', 'neutral', 'positive', 'warning', 'negative'], defaultValue: 'auto', description: 'Color theme variant' },
      { name: 'contained', type: 'boolean', defaultValue: true, description: 'Whether button has background fill' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the button' },
      { name: 'children', type: 'ReactNode', description: 'Button content' },
      { name: 'onPress', type: 'function', description: 'Press handler' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Button size="XS">XS</Button>\n<Button size="S">S</Button>\n<Button size="M">M</Button>\n<Button size="L">L</Button>\n<Button size="XL">XL</Button>' },
      { name: 'All Appearances', code: '<Button appearance="primary">primary</Button>\n<Button appearance="secondary">secondary</Button>\n<Button appearance="positive">positive</Button>\n<Button appearance="warning">warning</Button>\n<Button appearance="negative">negative</Button>' },
    ],
  },
  {
    name: 'Input',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Text input field with validation and various states.',
    props: [
      { name: 'label', type: 'string', description: 'Input label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'attention', type: 'enum', options: ['low', 'medium', 'high'], defaultValue: 'medium', description: 'Visual attention level' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the input' },
      { name: 'isRequired', type: 'boolean', defaultValue: false, description: 'Marks field as required' },
      { name: 'value', type: 'string', description: 'Controlled value' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
    ],
    examples: [
      { name: 'Basic', code: '<Input label="email" placeholder="enter your email" />' },
    ],
  },
  {
    name: 'SearchField',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Search input field with search icon and clear functionality.',
    props: [
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'value', type: 'string', description: 'Controlled value' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the field' },
    ],
    examples: [
      { name: 'Basic', code: '<SearchField label="search" placeholder="search..." />' },
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
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the textarea' },
      { name: 'value', type: 'string', description: 'Controlled value' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
    ],
    examples: [
      { name: 'Basic', code: '<TextArea label="description" placeholder="enter description..." />' },
    ],
  },
  {
    name: 'Checkbox',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Checkbox input for binary choices.',
    props: [
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Checkbox size' },
      { name: 'appearance', type: 'enum', options: ['auto', 'primary', 'positive', 'warning', 'negative'], defaultValue: 'auto', description: 'Color scheme' },
      { name: 'label', type: 'string', description: 'Checkbox label' },
      { name: 'isSelected', type: 'boolean', defaultValue: false, description: 'Checked state' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the checkbox' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Checkbox size="S" label="small" />\n<Checkbox size="M" label="medium" />\n<Checkbox size="L" label="large" />' },
      { name: 'All Appearances', code: '<Checkbox appearance="primary" label="primary" />\n<Checkbox appearance="positive" label="positive" />\n<Checkbox appearance="warning" label="warning" />\n<Checkbox appearance="negative" label="negative" />' },
    ],
  },
  {
    name: 'Switch',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Toggle switch for on/off states.',
    props: [
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Switch size' },
      { name: 'appearance', type: 'enum', options: ['auto', 'primary', 'positive', 'warning', 'negative'], defaultValue: 'auto', description: 'Color scheme' },
      { name: 'label', type: 'string', description: 'Switch label' },
      { name: 'isSelected', type: 'boolean', defaultValue: false, description: 'Toggle state' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the switch' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Switch size="S" label="small" />\n<Switch size="M" label="medium" />\n<Switch size="L" label="large" />' },
    ],
  },
  {
    name: 'Radio',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Radio button for single selection within a group.',
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
    description: 'Container for radio buttons.',
    props: [
      { name: 'label', type: 'string', description: 'Group label' },
      { name: 'value', type: 'string', description: 'Selected value' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Radio children' },
    ],
    examples: [
      { name: 'Basic', code: '<RadioGroup label="choose option">\n  <Radio value="1">option 1</Radio>\n  <Radio value="2">option 2</Radio>\n</RadioGroup>' },
    ],
  },
  {
    name: 'Stepper',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Number stepper with increment/decrement buttons.',
    props: [
      { name: 'value', type: 'number', description: 'Current value' },
      { name: 'minValue', type: 'number', description: 'Minimum value' },
      { name: 'maxValue', type: 'number', description: 'Maximum value' },
      { name: 'step', type: 'number', defaultValue: 1, description: 'Step increment' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the stepper' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
    ],
    examples: [
      { name: 'Basic', code: '<Stepper minValue={0} maxValue={10} />' },
    ],
  },
  {
    name: 'SegmentedControl',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Segmented control for mutually exclusive options.',
    props: [
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Control size' },
      { name: 'value', type: 'string', description: 'Selected value' },
      { name: 'onChange', type: 'function', description: 'Change handler' },
      { name: 'children', type: 'ReactNode', required: true, description: 'SegmentedControlItem children' },
    ],
    examples: [
      { name: 'Basic', code: '<SegmentedControl>\n  <SegmentedControlItem>day</SegmentedControlItem>\n  <SegmentedControlItem>week</SegmentedControlItem>\n  <SegmentedControlItem>month</SegmentedControlItem>\n</SegmentedControl>' },
    ],
  },
  {
    name: 'SegmentedControlItem',
    category: 'Form',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual item in segmented control.',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Item content' },
    ],
    examples: [
      { name: 'Basic', code: '<SegmentedControlItem>option</SegmentedControlItem>' },
    ],
  },

  // Navigation Components
  {
    name: 'Tabs',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Tab navigation component with panels.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'TabList and TabPanel children' },
    ],
    examples: [
      { name: 'Basic', code: '<Tabs>\n  <TabList>\n    <Tab id="tab1">tab 1</Tab>\n    <Tab id="tab2">tab 2</Tab>\n  </TabList>\n  <TabPanel id="tab1">content 1</TabPanel>\n  <TabPanel id="tab2">content 2</TabPanel>\n</Tabs>' },
    ],
  },
  {
    name: 'Tab',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual tab item.',
    props: [
      { name: 'id', type: 'string', required: true, description: 'Tab identifier' },
      { name: 'children', type: 'ReactNode', description: 'Tab label' },
    ],
    examples: [
      { name: 'Basic', code: '<Tab id="tab1">tab label</Tab>' },
    ],
  },
  {
    name: 'TabList',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Container for tab items.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Tab children' },
    ],
    examples: [
      { name: 'Basic', code: '<TabList>\n  <Tab id="tab1">tab 1</Tab>\n</TabList>' },
    ],
  },
  {
    name: 'TabPanel',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Content panel for a tab.',
    props: [
      { name: 'id', type: 'string', required: true, description: 'Panel identifier matching tab id' },
      { name: 'children', type: 'ReactNode', description: 'Panel content' },
    ],
    examples: [
      { name: 'Basic', code: '<TabPanel id="tab1">panel content</TabPanel>' },
    ],
  },
  {
    name: 'HeaderNavigation',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Header navigation component for top-level navigation.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'HeaderNavigationList children' },
    ],
    examples: [
      { name: 'Basic', code: '<HeaderNavigation>\n  <HeaderNavigationList>\n    <HeaderNavigationItem>home</HeaderNavigationItem>\n    <HeaderNavigationItem>products</HeaderNavigationItem>\n  </HeaderNavigationList>\n</HeaderNavigation>' },
    ],
  },
  {
    name: 'HeaderNavigationList',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'List container for header navigation items.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'HeaderNavigationItem children' },
    ],
    examples: [
      { name: 'Basic', code: '<HeaderNavigationList>\n  <HeaderNavigationItem>item</HeaderNavigationItem>\n</HeaderNavigationList>' },
    ],
  },
  {
    name: 'HeaderNavigationItem',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual item in header navigation.',
    props: [
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Item size' },
      { name: 'emphasis', type: 'enum', options: ['default', 'high'], defaultValue: 'default', description: 'Visual emphasis' },
      { name: 'children', type: 'ReactNode', description: 'Item content' },
    ],
    examples: [
      { name: 'Basic', code: '<HeaderNavigationItem>home</HeaderNavigationItem>' },
    ],
  },
  {
    name: 'WebHeaderNavigation',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Web-specific header navigation with enhanced features.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Navigation items' },
    ],
    examples: [
      { name: 'Basic', code: '<WebHeaderNavigation>\n  <HeaderNavigationItem>home</HeaderNavigationItem>\n</WebHeaderNavigation>' },
    ],
  },
  {
    name: 'BottomNavigation',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Bottom navigation bar for mobile interfaces.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'BottomNavigationItem children' },
    ],
    examples: [
      { name: 'Basic', code: '<BottomNavigation>\n  <BottomNavigationItem>home</BottomNavigationItem>\n  <BottomNavigationItem>search</BottomNavigationItem>\n</BottomNavigation>' },
    ],
  },
  {
    name: 'BottomNavigationItem',
    category: 'Navigation',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual item in bottom navigation.',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Item content' },
      { name: 'isSelected', type: 'boolean', defaultValue: false, description: 'Selected state' },
    ],
    examples: [
      { name: 'Basic', code: '<BottomNavigationItem>home</BottomNavigationItem>' },
    ],
  },

  // Layout Components
  {
    name: 'Card',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Container card with header, body, and footer sections.',
    props: [
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Card size' },
      { name: 'appearance', type: 'enum', options: ['neutral', 'primary', 'secondary', 'auto'], defaultValue: 'auto', description: 'Color scheme' },
      { name: 'elevation', type: 'enum', options: ['none', 'low', 'medium', 'high'], defaultValue: 'low', description: 'Shadow elevation' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Card content' },
    ],
    examples: [
      { name: 'With Body', code: '<Card>\n  <CardBody>Card content</CardBody>\n</Card>' },
      { name: 'Complete', code: '<Card>\n  <CardHeader>header</CardHeader>\n  <CardBody>body content</CardBody>\n  <CardFooter>footer</CardFooter>\n</Card>' },
    ],
  },
  {
    name: 'CardHeader',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Header section of a card.',
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
    description: 'Main content section of a card.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Body content' },
    ],
    examples: [
      { name: 'Basic', code: '<CardBody>main content</CardBody>' },
    ],
  },
  {
    name: 'CardFooter',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Footer section of a card.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Footer content' },
    ],
    examples: [
      { name: 'Basic', code: '<CardFooter>footer actions</CardFooter>' },
    ],
  },
  {
    name: 'Divider',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Visual divider between content sections.',
    props: [
      { name: 'orientation', type: 'enum', options: ['horizontal', 'vertical'], defaultValue: 'horizontal', description: 'Divider orientation' },
      { name: 'attention', type: 'enum', options: ['low', 'medium', 'high'], defaultValue: 'medium', description: 'Visual prominence' },
    ],
    examples: [
      { name: 'Horizontal', code: '<Divider />' },
      { name: 'Vertical', code: '<Divider orientation="vertical" />' },
    ],
  },
  {
    name: 'StructuredList',
    category: 'Layout',
    importPath: "@marcelinodzn/ds-react",
    description: 'Structured list layout component.',
    props: [
      { name: 'layout', type: 'enum', options: ['default', 'comfortable', 'compact'], defaultValue: 'default', description: 'List layout variant' },
      { name: 'children', type: 'ReactNode', required: true, description: 'List items' },
    ],
    examples: [
      { name: 'Basic', code: '<StructuredList>\n  <ListItem>item 1</ListItem>\n  <ListItem>item 2</ListItem>\n</StructuredList>' },
    ],
  },

  // Data Display Components
  {
    name: 'Badge',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Badge component for status, labels, and counts.',
    props: [
      { name: 'size', type: 'enum', options: ['XS', 'S', 'M', 'L', 'XL', '2XL'], defaultValue: 'M', description: 'Badge size' },
      { name: 'attention', type: 'enum', options: ['low', 'medium', 'high'], defaultValue: 'medium', description: 'Visual prominence' },
      { name: 'appearance', type: 'enum', options: ['auto', 'primary', 'secondary', 'sparkle', 'neutral', 'informative', 'positive', 'warning', 'negative'], defaultValue: 'auto', description: 'Color scheme' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Badge content' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Badge size="XS">XS</Badge>\n<Badge size="S">S</Badge>\n<Badge size="M">M</Badge>\n<Badge size="L">L</Badge>\n<Badge size="XL">XL</Badge>\n<Badge size="2XL">2XL</Badge>' },
      { name: 'All Appearances', code: '<Badge appearance="primary">primary</Badge>\n<Badge appearance="secondary">secondary</Badge>\n<Badge appearance="positive">positive</Badge>\n<Badge appearance="warning">warning</Badge>\n<Badge appearance="negative">negative</Badge>' },
    ],
  },
  {
    name: 'Chip',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Chip component for tags, filters, and selections.',
    props: [
      { name: 'size', type: 'enum', options: ['XS', 'S', 'M', 'L'], defaultValue: 'M', description: 'Chip size' },
      { name: 'attention', type: 'enum', options: ['low', 'medium', 'high'], defaultValue: 'medium', description: 'Visual prominence' },
      { name: 'appearance', type: 'enum', options: ['auto', 'primary', 'secondary', 'sparkle', 'neutral', 'informative', 'positive', 'warning', 'negative'], defaultValue: 'auto', description: 'Color scheme' },
      { name: 'isDisabled', type: 'boolean', defaultValue: false, description: 'Disables the chip' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Chip content' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Chip size="XS">XS</Chip>\n<Chip size="S">S</Chip>\n<Chip size="M">M</Chip>\n<Chip size="L">L</Chip>' },
    ],
  },
  {
    name: 'Avatar',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Avatar component for user profiles and images.',
    props: [
      { name: 'size', type: 'enum', options: ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', 'fill'], defaultValue: 'M', description: 'Avatar size' },
      { name: 'attention', type: 'enum', options: ['high', 'medium'], defaultValue: 'medium', description: 'Visual prominence' },
      { name: 'src', type: 'string', description: 'Image source URL' },
      { name: 'alt', type: 'string', description: 'Alternative text' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Avatar size="2XS" />\n<Avatar size="XS" />\n<Avatar size="S" />\n<Avatar size="M" />\n<Avatar size="L" />\n<Avatar size="XL" />\n<Avatar size="2XL" />\n<Avatar size="3XL" />\n<Avatar size="4XL" />' },
    ],
  },
  {
    name: 'ListItem',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Individual item in lists.',
    props: [
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Item size' },
      { name: 'appearance', type: 'enum', options: ['default', 'prominent'], defaultValue: 'default', description: 'Visual style' },
      { name: 'children', type: 'ReactNode', description: 'Item content' },
    ],
    examples: [
      { name: 'Basic', code: '<ListItem>list item</ListItem>' },
    ],
  },
  {
    name: 'CarouselIndicator',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Pagination indicator for carousels.',
    props: [
      { name: 'total', type: 'number', required: true, description: 'Total number of slides' },
      { name: 'activeIndex', type: 'number', defaultValue: 0, description: 'Currently active slide index' },
      { name: 'type', type: 'enum', options: ['dots', 'lines'], defaultValue: 'dots', description: 'Indicator style' },
    ],
    examples: [
      { name: 'Dots', code: '<CarouselIndicator total={5} activeIndex={2} type="dots" />' },
    ],
  },

  // Typography Components
  {
    name: 'Text',
    category: 'Typography',
    importPath: "@marcelinodzn/ds-react",
    description: 'Base text component with size and weight variants.',
    props: [
      { name: 'size', type: 'enum', options: ['XS', 'S', 'M', 'L', 'XL', '2XL'], defaultValue: 'M', description: 'Text size' },
      { name: 'weight', type: 'enum', options: ['regular', 'medium', 'semibold', 'bold'], defaultValue: 'regular', description: 'Font weight' },
      { name: 'align', type: 'enum', options: ['left', 'center', 'right'], defaultValue: 'left', description: 'Text alignment' },
      { name: 'children', type: 'ReactNode', description: 'Text content' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Text size="XS">XS text</Text>\n<Text size="S">S text</Text>\n<Text size="M">M text</Text>\n<Text size="L">L text</Text>\n<Text size="XL">XL text</Text>\n<Text size="2XL">2XL text</Text>' },
    ],
  },
  {
    name: 'Display',
    category: 'Typography',
    importPath: "@marcelinodzn/ds-react",
    description: 'Display text for large, prominent headings.',
    props: [
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Display size' },
      { name: 'align', type: 'enum', options: ['left', 'center', 'right'], defaultValue: 'left', description: 'Text alignment' },
      { name: 'children', type: 'ReactNode', description: 'Display content' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Display size="S">small display</Display>\n<Display size="M">medium display</Display>\n<Display size="L">large display</Display>' },
    ],
  },
  {
    name: 'Headline',
    category: 'Typography',
    importPath: "@marcelinodzn/ds-react",
    description: 'Headline text for section headings.',
    props: [
      { name: 'size', type: 'enum', options: ['XS', 'S', 'M', 'L', 'XL'], defaultValue: 'M', description: 'Headline size' },
      { name: 'weight', type: 'enum', options: ['regular', 'medium', 'semibold', 'bold'], defaultValue: 'bold', description: 'Font weight' },
      { name: 'align', type: 'enum', options: ['left', 'center', 'right'], defaultValue: 'left', description: 'Text alignment' },
      { name: 'children', type: 'ReactNode', description: 'Headline content' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Headline size="XS">XS headline</Headline>\n<Headline size="S">S headline</Headline>\n<Headline size="M">M headline</Headline>\n<Headline size="L">L headline</Headline>\n<Headline size="XL">XL headline</Headline>' },
    ],
  },
  {
    name: 'Title',
    category: 'Typography',
    importPath: "@marcelinodzn/ds-react",
    description: 'Title text for subsections.',
    props: [
      { name: 'size', type: 'enum', options: ['XS', 'S', 'M', 'L'], defaultValue: 'M', description: 'Title size' },
      { name: 'weight', type: 'enum', options: ['regular', 'medium', 'semibold', 'bold'], defaultValue: 'semibold', description: 'Font weight' },
      { name: 'align', type: 'enum', options: ['left', 'center', 'right'], defaultValue: 'left', description: 'Text alignment' },
      { name: 'children', type: 'ReactNode', description: 'Title content' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Title size="XS">XS title</Title>\n<Title size="S">S title</Title>\n<Title size="M">M title</Title>\n<Title size="L">L title</Title>' },
    ],
  },
  {
    name: 'Label',
    category: 'Typography',
    importPath: "@marcelinodzn/ds-react",
    description: 'Label text for form fields and UI elements.',
    props: [
      { name: 'size', type: 'enum', options: ['XS', 'S', 'M', 'L'], defaultValue: 'M', description: 'Label size' },
      { name: 'weight', type: 'enum', options: ['regular', 'medium', 'semibold', 'bold'], defaultValue: 'medium', description: 'Font weight' },
      { name: 'children', type: 'ReactNode', description: 'Label content' },
    ],
    examples: [
      { name: 'Basic', code: '<Label>field label</Label>' },
    ],
  },

  // Media Components
  {
    name: 'Icon',
    category: 'Media',
    importPath: "@marcelinodzn/ds-react",
    description: 'Icon component from the Jio icon library.',
    props: [
      { name: 'name', type: 'string', required: true, description: 'Icon name from icon library' },
      { name: 'size', type: 'enum', options: ['XS', 'S', 'M', 'L', 'XL'], defaultValue: 'M', description: 'Icon size' },
      { name: 'appearance', type: 'enum', options: ['auto', 'primary', 'secondary', 'neutral'], defaultValue: 'auto', description: 'Icon color scheme' },
      { name: 'attention', type: 'enum', options: ['low', 'medium', 'high'], defaultValue: 'medium', description: 'Visual prominence' },
    ],
    examples: [
      { name: 'Basic', code: '<Icon name="Heart" />' },
      { name: 'All Sizes', code: '<Icon name="Heart" size="XS" />\n<Icon name="Heart" size="S" />\n<Icon name="Heart" size="M" />\n<Icon name="Heart" size="L" />\n<Icon name="Heart" size="XL" />' },
    ],
  },
  {
    name: 'Image',
    category: 'Media',
    importPath: "@marcelinodzn/ds-react",
    description: 'Image component with loading states and aspect ratios.',
    props: [
      { name: 'src', type: 'string', required: true, description: 'Image source URL' },
      { name: 'alt', type: 'string', required: true, description: 'Alternative text' },
      { name: 'aspectRatio', type: 'enum', options: ['1/1', '16/9', '4/3', '3/2'], defaultValue: '16/9', description: 'Image aspect ratio' },
      { name: 'fit', type: 'enum', options: ['cover', 'contain', 'fill'], defaultValue: 'cover', description: 'Object fit' },
    ],
    examples: [
      { name: 'Basic', code: '<Image src="https://via.placeholder.com/300" alt="placeholder" />' },
    ],
  },
  {
    name: 'Logo',
    category: 'Media',
    importPath: "@marcelinodzn/ds-react",
    description: 'Logo component with size variants.',
    props: [
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Logo size' },
      { name: 'appearance', type: 'enum', options: ['default', 'monochrome'], defaultValue: 'default', description: 'Logo appearance' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Logo size="S" />\n<Logo size="M" />\n<Logo size="L" />' },
    ],
  },
  {
    name: 'JioLogo',
    category: 'Media',
    importPath: "@marcelinodzn/ds-react",
    description: 'Jio brand logo component.',
    props: [
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Logo size' },
    ],
    examples: [
      { name: 'All Sizes', code: '<JioLogo size="S" />\n<JioLogo size="M" />\n<JioLogo size="L" />' },
    ],
  },
  {
    name: 'Avatar',
    category: 'Data Display',
    importPath: "@marcelinodzn/ds-react",
    description: 'Avatar component for user profiles with extensive size options.',
    props: [
      { name: 'size', type: 'enum', options: ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', 'fill'], defaultValue: 'M', description: 'Avatar size' },
      { name: 'attention', type: 'enum', options: ['high', 'medium'], defaultValue: 'medium', description: 'Visual prominence' },
      { name: 'src', type: 'string', description: 'Image source URL' },
      { name: 'alt', type: 'string', description: 'Alternative text' },
    ],
    examples: [
      { name: 'All Sizes', code: '<Avatar size="2XS" />\n<Avatar size="XS" />\n<Avatar size="S" />\n<Avatar size="M" />\n<Avatar size="L" />\n<Avatar size="XL" />\n<Avatar size="2XL" />\n<Avatar size="3XL" />\n<Avatar size="4XL" />' },
    ],
  },

  // Feedback Components
  {
    name: 'Toast',
    category: 'Feedback',
    importPath: "@marcelinodzn/ds-react",
    description: 'Toast notification component.',
    props: [
      { name: 'appearance', type: 'enum', options: ['informative', 'positive', 'warning', 'negative'], defaultValue: 'informative', description: 'Toast type' },
      { name: 'size', type: 'enum', options: ['S', 'M', 'L'], defaultValue: 'M', description: 'Toast size' },
      { name: 'children', type: 'ReactNode', description: 'Toast message' },
    ],
    examples: [
      { name: 'Basic', code: '<Toast appearance="positive">success message</Toast>' },
    ],
  },

  // Utility Components
  {
    name: 'AccountsRail',
    category: 'Utility',
    importPath: "@marcelinodzn/ds-react",
    description: 'Account rail component for displaying account information.',
    props: [
      { name: 'accounts', type: 'array', required: true, description: 'Array of account data' },
      { name: 'activeIndex', type: 'number', defaultValue: 0, description: 'Currently active account index' },
      { name: 'onAccountChange', type: 'function', description: 'Account change callback' },
    ],
    examples: [
      { name: 'Basic', code: '<AccountsRail accounts={[{id: "1", type: "financial", balance: "₹2,450", balanceLabel: "Total Balance"}]} />' },
    ],
  },
];

export const getComponentByName = (name: string): ComponentMeta | undefined => {
  return components.find(c => c.name.toLowerCase() === name.toLowerCase());
};

export const getComponentsByCategory = (category: string): ComponentMeta[] => {
  return components.filter(c => c.category === category);
};
