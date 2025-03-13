
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface HeaderProps {
  openSettings: () => void;
}

const Header = ({ openSettings }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center p-6 border-b border-border/30 bg-background/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center animate-pulse">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-medium tracking-tight">Multi-Model RAG Chatbot</h1>
          <p className="text-sm text-muted-foreground">
            Ask questions about your documents with AI assistance
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="text-sm shadow-sm hover:shadow-md transition-all"
          onClick={() => window.open("#about", "_self")}
        >
          About
        </Button>
        <Button 
          variant="outline" 
          className="text-sm shadow-sm hover:shadow-md transition-all"
          onClick={openSettings}
        >
          Settings
        </Button>
      </div>
    </header>
  );
};

export default Header;
