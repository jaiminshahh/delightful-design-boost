
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, X, Info, HelpCircle, Lock, Zap, Database, FileSearch, ArrowRight, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [useMultipleModels, setUseMultipleModels] = useState(true);
  const [showSourceDocs, setShowSourceDocs] = useState(true);
  const [enableQueryRewriting, setEnableQueryRewriting] = useState(true);
  const [showRewrittenQueries, setShowRewrittenQueries] = useState(true);
  const [temperature, setTemperature] = useState(0.7);
  const [numDocs, setNumDocs] = useState(5);
  const [expandContext, setExpandContext] = useState(true);
  const [maxTokens, setMaxTokens] = useState(8);

  return (
    <div 
      className={`fixed inset-y-0 left-0 w-96 settings-panel transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b border-border/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-lg font-medium">Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-background/20">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <Tabs defaultValue="model">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="model">Model</TabsTrigger>
              <TabsTrigger value="query">Query</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="model" className="space-y-6">
              {/* Model Selection */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-primary" />
                  <h3 className="text-sm font-medium">Model Settings</h3>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="primaryModel" className="text-sm">Select Primary Model</label>
                  <Select defaultValue="llama3.1:latest">
                    <SelectTrigger id="primaryModel" className="w-full">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llama3.1:latest">llama3.1:latest</SelectItem>
                      <SelectItem value="llama3:8b">llama3:8b</SelectItem>
                      <SelectItem value="llama3:70b">llama3:70b</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm">Use Multiple Models</span>
                    <InfoTooltip content="Process queries through multiple models for better results" />
                  </div>
                  <Switch 
                    checked={useMultipleModels} 
                    onCheckedChange={setUseMultipleModels} 
                  />
                </div>
                
                {useMultipleModels && (
                  <div className="space-y-2 pl-6 border-l-2 border-secondary">
                    <label htmlFor="secondaryModel" className="text-sm">Secondary Model</label>
                    <Select defaultValue="gpt-4o-mini">
                      <SelectTrigger id="secondaryModel" className="w-full">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                        <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="apiKey" className="text-sm">API Key</label>
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
                          className="pr-10"
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                )}
                
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
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="query" className="space-y-6">
              {/* Query Settings */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileSearch className="w-4 h-4 mr-2 text-primary" />
                  <h3 className="text-sm font-medium">Query Settings</h3>
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
                
                {enableQueryRewriting && (
                  <div className="space-y-2 pl-6 border-l-2 border-secondary">
                    <label htmlFor="queryModel" className="text-sm">Query Rewriting Model</label>
                    <Select defaultValue="llama3:8b">
                      <SelectTrigger id="queryModel" className="w-full">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llama3:8b">llama3:8b</SelectItem>
                        <SelectItem value="llama3.1:latest">llama3.1:latest</SelectItem>
                      </SelectContent>
                    </Select>
                    
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
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm">Expand Context</span>
                      <InfoTooltip content="Enrich queries with additional context for more relevant results" />
                    </div>
                    <Switch 
                      checked={expandContext}
                      onCheckedChange={setExpandContext}
                    />
                  </div>
                  
                  {expandContext && (
                    <div className="space-y-3 pl-6 border-l-2 border-secondary">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Context Tokens</span>
                        <span className="text-sm font-medium">{maxTokens}K</span>
                      </div>
                      <Slider
                        defaultValue={[8]}
                        max={32}
                        min={1}
                        step={1}
                        value={[maxTokens]}
                        onValueChange={(vals) => setMaxTokens(vals[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1K</span>
                        <span>32K</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sources" className="space-y-6">
              {/* Source Settings */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Database className="w-4 h-4 mr-2 text-primary" />
                  <h3 className="text-sm font-medium">Source Documents</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm">Number of documents</span>
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
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Fewer, more relevant</span>
                    <span>More, broader</span>
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
                
                <div className="p-3 bg-secondary/30 rounded-lg text-sm">
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Info className="w-4 h-4 mr-2" />
                    <span>Document Sources</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2 rounded border border-border/30 text-xs">
                      <p className="font-medium">Research Documents</p>
                      <p className="text-muted-foreground">23 files</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-border/30 text-xs">
                      <p className="font-medium">Technical Papers</p>
                      <p className="text-muted-foreground">47 files</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-border/30 text-xs">
                      <p className="font-medium">Experiment Results</p>
                      <p className="text-muted-foreground">15 files</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-border/30 text-xs">
                      <p className="font-medium">External Articles</p>
                      <p className="text-muted-foreground">8 files</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="p-4 border-t border-border/50 bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={onClose}
            >
              Close
            </Button>
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => {
                // Clear chat implementation would go here
                alert("Chat history cleared");
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
