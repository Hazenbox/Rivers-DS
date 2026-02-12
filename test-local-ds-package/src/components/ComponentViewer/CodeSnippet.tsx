import { useState } from 'react';
import './CodeSnippet.css';

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

  // Simple syntax highlighting for JSX/TSX
  const highlightCode = (code: string) => {
    return code
      // Keywords
      .replace(/\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|new|this|true|false|null|undefined|async|await)\b/g, '<span class="code-keyword">$1</span>')
      // Strings
      .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="code-string">$1$2$3</span>')
      // JSX tags
      .replace(/(&lt;\/?)(\w+)/g, '$1<span class="code-tag">$2</span>')
      .replace(/<([A-Z]\w*)/g, '<<span class="code-component">$1</span>')
      // Props/attributes
      .replace(/(\s)(\w+)=/g, '$1<span class="code-prop">$2</span>=')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
      // Comments
      .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>')
      // Brackets
      .replace(/([{}[\]()])/g, '<span class="code-bracket">$1</span>');
  };

  // Escape HTML entities and apply highlighting
  const escapedCode = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const highlightedCode = highlightCode(escapedCode);

  return (
    <div className="code-snippet">
      <div className="code-snippet-header">
        <span className="code-snippet-lang">{language}</span>
        <button 
          className="code-snippet-copy"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              copied
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 10V3C2 2.44772 2.44772 2 3 2H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              copy
            </>
          )}
        </button>
      </div>
      <pre className="code-snippet-pre">
        <code 
          className="code-snippet-code"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}

export default CodeSnippet;
