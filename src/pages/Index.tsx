
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Settings, Menu } from "lucide-react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import SettingsPanel from "@/components/SettingsPanel";

const Index = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      {/* Overlay when settings panel is open on mobile */}
      {settingsOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setSettingsOpen(false)}
        />
      )}
      
      {/* Settings panel */}
      <SettingsPanel 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />
      
      {/* Mobile settings button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-20 right-4 z-30 rounded-full w-12 h-12 shadow-lg bg-background/80 backdrop-blur-sm border border-border/50"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="h-5 w-5" />
        </Button>
      )}
      
      <Header openSettings={() => setSettingsOpen(true)} />
      
      <main className="flex-1 overflow-hidden relative">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
