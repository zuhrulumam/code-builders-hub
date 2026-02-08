import { CodeSnippet } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./MarkdownContent";

interface CodeSnippetsProps {
  snippets: CodeSnippet[];
}

const CodeSnippets = ({ snippets }: CodeSnippetsProps) => {
  if (!snippets || snippets.length === 0) {
    return null;
  }

  if (snippets.length === 1) {
    const snippet = snippets[0];
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">📁 Source Code</h3>
        <CodeBlock 
          language={snippet.language} 
          filename={snippet.filename}
        >
          {snippet.code}
        </CodeBlock>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">📁 Source Code</h3>
      <Tabs defaultValue={snippets[0].filename} className="w-full">
        <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
          {snippets.map((snippet) => (
            <TabsTrigger 
              key={snippet.filename} 
              value={snippet.filename}
              className="data-[state=active]:bg-white data-[state=active]:text-primary text-sm font-mono"
            >
              {snippet.filename}
            </TabsTrigger>
          ))}
        </TabsList>
        {snippets.map((snippet) => (
          <TabsContent key={snippet.filename} value={snippet.filename} className="mt-4">
            <CodeBlock 
              language={snippet.language} 
              filename={snippet.filename}
            >
              {snippet.code}
            </CodeBlock>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeSnippets;
