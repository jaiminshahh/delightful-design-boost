
import { Button } from "@/components/ui/button";
import { MessageSquare, Info, Settings as SettingsIcon } from "lucide-react";

interface HeaderProps {
  openSettings: () => void;
  isSettingsOpen: boolean;
  closeSettings: () => void;
}

const Header = ({ openSettings, isSettingsOpen, closeSettings }: HeaderProps) => {
  const handleSettingsClick = () => {
    if (isSettingsOpen) {
      closeSettings();
    } else {
      openSettings();
    }
  };

  const handleAboutClick = () => {
    closeSettings();
    window.open("#about", "_self");
  };

  return (
    <header className="flex justify-between items-center p-4 md:p-6 bg-white/90 backdrop-blur-md border-b border-border/30 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-medium tracking-tight">Enhanced RAG Chatbot</h1>
          <p className="text-sm text-muted-foreground">
            Ask questions about your documents with AI assistance
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="text-sm shadow-sm hover:shadow-md transition-all hidden md:flex"
          onClick={handleAboutClick}
        >
          <Info className="w-4 h-4 mr-2" />
          About
        </Button>
        <Button 
          variant={isSettingsOpen ? "secondary" : "outline"}
          size="sm"
          className="text-sm shadow-sm hover:shadow-md transition-all"
          onClick={handleSettingsClick}
        >
          <SettingsIcon className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </header>
  );
};

export default Header;
