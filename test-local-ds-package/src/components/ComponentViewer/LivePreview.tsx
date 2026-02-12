import { ReactNode, ComponentType } from 'react';
import { 
  Button, 
  Badge, 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter,
  Checkbox, 
  Text,
  SearchField,
  Input,
  TextArea,
  Avatar,
  Chip,
  Divider,
  Switch,
  Radio,
  RadioGroup,
  Icon,
  Display,
  Headline,
  Title,
  Label,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Toast,
  Stepper,
  SegmentedControl,
  SegmentedControlItem,
  Image,
  Logo,
  JioLogo,
  AccountsRail,
  BottomNavigation,
  BottomNavigationItem,
  CarouselIndicator,
  HeaderNavigation,
  HeaderNavigationItem,
  HeaderNavigationList,
  WebHeaderNavigation,
  StructuredList
} from '@marcelinodzn/ds-react';

interface LivePreviewProps {
  componentName: string;
  props: Record<string, unknown>;
  children?: ReactNode;
}

// Map component names to actual component imports
const componentMap: Record<string, ComponentType<any>> = {
  // Form Components
  Button,
  Input,
  SearchField,
  TextArea,
  Checkbox,
  Switch,
  Radio,
  RadioGroup,
  Stepper,
  SegmentedControl,
  SegmentedControlItem,
  
  // Layout Components
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  StructuredList,
  
  // Navigation Components
  Tab,
  TabList,
  TabPanel,
  Tabs,
  HeaderNavigation,
  HeaderNavigationItem,
  HeaderNavigationList,
  WebHeaderNavigation,
  BottomNavigation,
  BottomNavigationItem,
  
  // Data Display Components
  Badge,
  Chip,
  Avatar,
  ListItem,
  CarouselIndicator,
  Icon,
  Image,
  Logo,
  JioLogo,
  
  // Typography Components
  Text,
  Display,
  Headline,
  Title,
  Label,
  
  // Feedback Components
  Toast,
  
  // Other Components
  AccountsRail,
};

function LivePreview({ componentName, props, children }: LivePreviewProps) {
  const Component = componentMap[componentName];

  if (!Component) {
    return (
      <div style={{ 
        padding: '24px', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffc107', 
        borderRadius: '8px',
        color: '#856404'
      }}>
        <Text>Component "{componentName}" not found in component map</Text>
      </div>
    );
  }

  try {
    // Handle special cases for components that need specific structures
    if (componentName === 'RadioGroup') {
      return (
        <Component {...props}>
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </Component>
      );
    }

    if (componentName === 'Tabs') {
      return (
        <Component {...props}>
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel id="tab1">Content 1</TabPanel>
          <TabPanel id="tab2">Content 2</TabPanel>
          <TabPanel id="tab3">Content 3</TabPanel>
        </Component>
      );
    }

    if (componentName === 'Card') {
      return (
        <Component {...props}>
          <CardBody>
            {children || <Text>Card Content</Text>}
          </CardBody>
        </Component>
      );
    }

    if (componentName === 'AccountsRail') {
      const mockAccounts = [
        { id: '1', type: 'financial' as const, balance: '₹2,450', balanceLabel: 'Total Balance' },
        { id: '2', type: 'data' as const, balance: '45GB', balanceLabel: 'Data Available' }
      ];
      return <Component accounts={mockAccounts} {...props} />;
    }

    // For components with label prop (Checkbox, Switch, Radio)
    if (componentName === 'Checkbox' || componentName === 'Switch') {
      return <Component label={children || componentName} {...props} />;
    }

    if (componentName === 'Radio') {
      return <Component value="value" {...props}>{children || componentName}</Component>;
    }

    // For components that require specific props
    if (componentName === 'Image') {
      return <Component src="https://via.placeholder.com/150" alt="Preview" {...props} />;
    }

    if (componentName === 'Icon') {
      return <Component name="Heart" {...props} />;
    }

    // Default rendering for most components
    if (children || props.children) {
      return <Component {...props}>{children || props.children}</Component>;
    }

    // Components without children
    return <Component {...props} />;
  } catch (error) {
    return (
      <div style={{ 
        padding: '24px', 
        backgroundColor: '#f8d7da', 
        border: '1px solid #f5c6cb', 
        borderRadius: '8px',
        color: '#721c24'
      }}>
        <Text>Error rendering {componentName}: {error instanceof Error ? error.message : 'Unknown error'}</Text>
      </div>
    );
  }
}

export default LivePreview;
