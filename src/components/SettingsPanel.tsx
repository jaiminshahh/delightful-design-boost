
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, X, Info, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoTooltip = ({ content }: { content: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help ml-1" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [openAIFirstPass, setOpenAIFirstPass] = useState(true);
  const [showOpenAIAnalysis, setShowOpenAIAnalysis] = useState(true);
  const [showSourceDocs, setShowSourceDocs] = useState(true);
  const [enableQueryRewriting, setEnableQueryRewriting] = useState(true);
  const [showRewrittenQueries, setShowRewrittenQueries] = useState(true);
  const [temperature, setTemperature] = useState(0.7);
  const [numDocs, setNumDocs] = useState(5);

  return (
    <div 
      className={`fixed inset-y-0 left-0 w-96 settings-panel transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-border/50">
          <h2 className="text-lg font-medium">Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-background/20">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {/* OpenAI Model Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Select LLama Model
            </h3>
            <Select defaultValue="llama3.1:latest">
              <SelectTrigger className="w-full bg-background/50">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="llama3.1:latest">llama3.1:latest</SelectItem>
                <SelectItem value="llama3:8b">llama3:8b</SelectItem>
                <SelectItem value="llama3:70b">llama3:70b</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* OpenAI Integration */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              OpenAI Integration
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm">Enable OpenAI First Pass</span>
                <InfoTooltip content="Process queries through OpenAI before using the local model" />
              </div>
              <Switch 
                checked={openAIFirstPass} 
                onCheckedChange={setOpenAIFirstPass} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="apiKey" className="text-sm">OpenAI API Key</label>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="h-8 w-8"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <div className="relative">
                <Input 
                  id="apiKey"
                  type={showApiKey ? "text" : "password"} 
                  placeholder="sk-..." 
                  className="bg-background/50 pr-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="openaiModel" className="text-sm">OpenAI Model</label>
              <Select defaultValue="gpt-4o-mini">
                <SelectTrigger id="openaiModel" className="w-full bg-background/50">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                  <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm">Show OpenAI Analysis</span>
                <InfoTooltip content="Display analysis from OpenAI alongside results" />
              </div>
              <Switch 
                checked={showOpenAIAnalysis} 
                onCheckedChange={setShowOpenAIAnalysis} 
              />
            </div>
          </div>
          
          {/* Query Rewriting */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Query Settings
            </h3>
            
            <div className="space-y-2">
              <label htmlFor="queryModel" className="text-sm">Query Rewriting Model</label>
              <Select defaultValue="llama3.1:latest">
                <SelectTrigger id="queryModel" className="w-full bg-background/50">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llama3.1:latest">llama3.1:latest</SelectItem>
                  <SelectItem value="llama3:8b">llama3:8b</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm">Number of documents to retrieve</span>
                  <InfoTooltip content="Maximum number of documents to retrieve per query" />
                </div>
                <span className="text-sm font-medium">{numDocs}</span>
              </div>
              <Slider
                defaultValue={[5]}
                max={10}
                min={1}
                step={1}
                value={[numDocs]}
                onValueChange={(vals) => setNumDocs(vals[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm">Show Source Documents</span>
                <InfoTooltip content="Display the source documents used to generate responses" />
              </div>
              <Switch 
                checked={showSourceDocs}
                onCheckedChange={setShowSourceDocs}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm">Temperature</span>
                  <InfoTooltip content="Controls randomness in output. Lower values make output more focused and deterministic." />
                </div>
                <span className="text-sm font-medium">{temperature.toFixed(2)}</span>
              </div>
              <Slider
                defaultValue={[0.7]}
                max={1}
                min={0}
                step={0.01}
                value={[temperature]}
                onValueChange={(vals) => setTemperature(vals[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.0</span>
                <span>1.0</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm">Enable Query Rewriting</span>
                <InfoTooltip content="Rewrite queries to improve document retrieval performance" />
              </div>
              <Switch 
                checked={enableQueryRewriting}
                onCheckedChange={setEnableQueryRewriting}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm">Show Rewritten Queries</span>
                <InfoTooltip content="Display the rewritten queries in the chat interface" />
              </div>
              <Switch 
                checked={showRewrittenQueries}
                onCheckedChange={setShowRewrittenQueries}
              />
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-border/50">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              // Clear chat implementation would go here
              alert("Chat history cleared");
            }}
          >
            Clear Chat History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
