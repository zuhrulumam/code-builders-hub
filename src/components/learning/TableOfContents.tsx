import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [readingProgress, setReadingProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Parse headings from markdown content
  const headings: Heading[] = [];
  const lines = content.split("\n");
  
  for (const line of lines) {
    const h2Match = line.match(/^## (.+)$/);
    const h3Match = line.match(/^### (.+)$/);
    
    if (h2Match) {
      const text = h2Match[1].replace(/[^\w\s-]/g, "").trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      headings.push({ id, text: h2Match[1], level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].replace(/[^\w\s-]/g, "").trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      headings.push({ id, text: h3Match[1], level: 3 });
    }
  }

  // Intersection Observer for active heading
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    });

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [content]);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-24">
        {/* Header */}
        <h4 className="text-sm font-semibold text-foreground mb-4">On This Page</h4>
        
        {/* Reading Progress */}
        <div className="mb-4">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-150"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground mt-1 block">
            {Math.round(readingProgress)}% dibaca
          </span>
        </div>

        {/* Headings List */}
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "block w-full text-left text-sm py-1.5 transition-colors",
                heading.level === 3 && "pl-4",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default TableOfContents;
