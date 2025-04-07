
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, Search, FileText, ArrowRight, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  sources?: SourceDocument[];
}

interface SourceDocument {
  id: string;
  title: string;
  content: string;
}

interface Step {
  id: string;
  status: "processing" | "completed";
  title: string;
  detail?: string;
}

const exampleSources: SourceDocument[] = [
  {
    id: "doc1",
    title: "LLM_Review_137_LLM_Review_137.pdf",
    content: "Content from large language model review document discussing performance metrics and benchmarks."
  },
  {
    id: "doc2",
    title: "2423_Electric_2423_Electric.md",
    content: "Research notes on electric propulsion systems for spacecraft and their efficiency comparisons."
  },
  {
    id: "doc3",
    title: "Z3524_Kawashita_Z3524_Kawashita.md",
    content: "Detailed analysis of fusion energy containment systems and magnetic field configurations."
  },
  {
    id: "doc4",
    title: "Z3518_Gomez_Z3518_Gomez.md",
    content: "Studies on plasma behavior in high-temperature fusion environments and stability considerations."
  }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSteps, setCurrentSteps] = useState<Step[]>([]);
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentSteps]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Create a new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    // Add message to state
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);
    
    // Show processing steps
    setCurrentSteps([
      { id: "1", status: "processing", title: "Processing query..." },
    ]);
    
    // Simulate step progression
    setTimeout(() => {
      setCurrentSteps([
        { id: "1", status: "completed", title: "Processing query", detail: "Query understood and processed" },
        { id: "2", status: "processing", title: "Searching for relevant information..." }
      ]);
      
      setTimeout(() => {
        setCurrentSteps([
          { id: "1", status: "completed", title: "Processing query", detail: "Query understood and processed" },
          { id: "2", status: "completed", title: "Searching for relevant information", detail: "Found 4 relevant documents" },
          { id: "3", status: "processing", title: "Sources being used..." }
        ]);
        
        setTimeout(() => {
          setCurrentSteps([
            { id: "1", status: "completed", title: "Processing query", detail: "Query understood and processed" },
            { id: "2", status: "completed", title: "Searching for relevant information", detail: "Found 4 relevant documents" },
            { id: "3", status: "completed", title: "Sources being used", detail: "4 sources selected for generating response" },
            { id: "4", status: "processing", title: "Generating answer based on sources..." }
          ]);
          
          setTimeout(() => {
            // Add bot reply
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: "The equation for the convergence ratio in Magnetized Linear Inertial Fusion (MagLIF) experiments is CR = R₀/R_min, where R₀ is the initial fuel radius and R_min is the minimum radius achieved during compression. This is a key parameter that influences the fusion yield, as higher convergence ratios generally lead to higher fuel densities and temperatures, which are necessary for fusion reactions. In typical MagLIF experiments, convergence ratios of 10-40 are targeted, with the specific value depending on the experimental configuration and desired plasma conditions.",
              sender: "bot",
              timestamp: new Date(),
              sources: exampleSources,
            };
            
            setMessages((prev) => [...prev, botMessage]);
            setIsProcessing(false);
            setCurrentSteps([]);
          }, 1800);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20 animate-fade-up">
            <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
              <Bot className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-medium mb-3">Ask about your documents</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              I'll understand context, utilize multiple models, and cite my sources!
            </p>
            <div className="max-w-md w-full bg-secondary/50 rounded-xl p-4 text-sm text-secondary-foreground">
              <p className="font-medium mb-2">Try asking:</p>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-white/50 hover:bg-white cursor-pointer transition-colors">
                  What is the equation for the convergence ratio in MagLIF experiments?
                </div>
                <div className="p-2 rounded-lg bg-white/50 hover:bg-white cursor-pointer transition-colors">
                  Explain the key differences between the Zambelli and Kawahari fusion approaches
                </div>
                <div className="p-2 rounded-lg bg-white/50 hover:bg-white cursor-pointer transition-colors">
                  What are the primary challenges in scaling Z3518 fusion systems?
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`flex gap-3 max-w-3xl ${
                    message.sender === "user" 
                      ? "flex-row-reverse" 
                      : "flex-row"
                  }`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user" 
                        ? "bg-primary/10" 
                        : "bg-primary/10"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div 
                      className={message.sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
                    {message.sources && (
                      <div className="mt-3">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="sources" className="border-none">
                            <AccordionTrigger className="py-2 text-sm text-muted-foreground hover:text-primary hover:no-underline">
                              <div className="flex items-center">
                                <FileText className="w-4 h-4 mr-2" />
                                <span>Source Documents ({message.sources.length})</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 mt-2">
                                {message.sources.map(source => (
                                  <div key={source.id} className="source-document">
                                    <p className="font-medium text-xs text-primary mb-1">{source.title}</p>
                                    <p className="text-foreground/80">{source.content}</p>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isProcessing && currentSteps.length > 0 && (
              <div className="animate-fade-up">
                {currentSteps.map(step => (
                  <div key={step.id} className="flex items-center py-2 pl-10">
                    {step.status === "processing" ? (
                      <Loader2 className="w-4 h-4 mr-2 text-primary animate-spin" />
                    ) : (
                      <div className="w-4 h-4 mr-2 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                    )}
                    <div className="text-sm">
                      <span className={step.status === "completed" ? "text-muted-foreground" : "text-foreground"}>
                        {step.title}
                      </span>
                      {step.detail && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({step.detail})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="relative glass-panel p-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask questions about your documents..."
              className="min-h-[60px] pr-12 resize-none text-base bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isProcessing}
            />
            <Button
              size="icon"
              className="absolute right-3 bottom-3 h-8 w-8 rounded-full"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
