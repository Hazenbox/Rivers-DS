import { useState } from 'react';
import { Card, CardBody, Button, Text } from '@marcelinodzn/ds-react';

interface CodeSnippetProps {
  code: string;
  language?: string;
  onCopy?: () => void;
}

function CodeSnippet({ code, language = 'tsx', onCopy }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  return (
    <Card>
      <CardBody>
        <div style={{ padding: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e2e4e8' }}>
            <Text>{language}</Text>
            <Button size="S" onPress={handleCopy}>
              {copied ? 'copied!' : 'copy'}
            </Button>
          </div>
          <pre style={{ margin: 0, padding: '16px', backgroundColor: '#ffffff', overflowX: 'auto', fontSize: '13px', lineHeight: 1.6, fontFamily: 'monospace' }}>
            <code>{code}</code>
          </pre>
        </div>
      </CardBody>
    </Card>
  );
}

export default CodeSnippet;
