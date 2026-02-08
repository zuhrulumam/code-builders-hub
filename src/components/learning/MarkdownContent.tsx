import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h2: ({ children, ...props }) => (
            <h2 
              className="text-2xl font-bold mt-10 mb-4 text-foreground scroll-mt-24" 
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 
              className="text-xl font-semibold mt-8 mb-3 text-foreground scroll-mt-24" 
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 
              className="text-lg font-semibold mt-6 mb-2 text-foreground scroll-mt-24" 
              {...props}
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-base leading-relaxed text-muted-foreground mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-muted-foreground">{children}</li>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-primary hover:text-primary/80 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary bg-primary/5 pl-5 pr-4 py-4 my-4 rounded-r-lg italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;
            
            if (isInline) {
              return (
                <code 
                  className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            
            return (
              <CodeBlock language={match[1]}>
                {String(children).replace(/\n$/, "")}
              </CodeBlock>
            );
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-border rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-muted-foreground border-b border-border">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-muted/50 transition-colors">{children}</tr>
          ),
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt} 
              className="rounded-lg max-w-full mx-auto my-4"
            />
          ),
          hr: () => <hr className="my-8 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

interface CodeBlockProps {
  language: string;
  children: string;
  filename?: string;
}

export const CodeBlock = ({ language, children, filename }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(220,13%,18%)] border-b border-border/20">
        <span className="text-xs font-mono text-[hsl(220,10%,60%)]">
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[hsl(220,10%,60%)] hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      
      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "14px",
        }}
        lineNumberStyle={{
          minWidth: "2.5em",
          paddingRight: "1em",
          color: "hsl(220, 10%, 40%)",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default MarkdownContent;
