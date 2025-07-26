
'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Bot, User, X, Loader2, Waves, Play, Pause, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/hooks/use-language';
import { chatWithAgent } from '@/ai/flows/conversational-agent';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


type Message = {
    role: 'user' | 'model';
    content: string;
    audioUrl?: string;
    isPlaying?: boolean;
};

// Speech Recognition hook
const useSpeechRecognition = (
    onResult: (text: string) => void,
    onError: (error: string) => void
    ) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Speech recognition not supported in this browser.");
            onError("not-supported");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            onError(event.error);
            setIsListening(false);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

    }, [onResult, onError]);
    
    const startListening = (lang: string) => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = lang === 'हिन्दी' ? 'hi-IN' : 'en-US';
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return { isListening, startListening, stopListening };
};


export default function AgentChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            const history = messages.map(msg => ({
                role: msg.role,
                content: [{ text: msg.content }],
            }));
            
            const result = await chatWithAgent({ message: text, language, history });
            const agentResponseText = result.response;
            
            const audioResult = await textToSpeech({ text: agentResponseText, language });

            const agentMessage: Message = { 
                role: 'model', 
                content: agentResponseText,
                audioUrl: audioResult.audioUrl,
                isPlaying: false
            };
            setMessages(prev => [...prev, agentMessage]);

        } catch (error) {
            console.error("Failed to get agent response:", error);
            const errorMessage: Message = { role: 'model', content: t('agentError') };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleRecognitionError = (error: string) => {
        let title = "Voice Recognition Error";
        let description = "An unknown error occurred. Please try again.";

        if (error === 'network') {
            title = "Network Error";
            description = "Could not connect to the speech service. Check your internet and ensure you're on a secure (HTTPS) connection.";
        } else if (error === 'not-allowed' || error === 'service-not-allowed') {
            title = "Permission Denied";
            description = "Microphone access was denied. Please allow microphone access in your browser settings.";
        } else if (error === 'no-speech') {
            title = "No Speech Detected";
            description = "I didn't hear anything. Please try again.";
        } else if (error === 'not-supported') {
            title = "Browser Not Supported";
            description = "Your browser does not support voice recognition. Please try a different browser like Chrome or Firefox.";
        }

        toast({
            variant: "destructive",
            title,
            description,
        });
    }

    const { isListening, startListening } = useSpeechRecognition(
        (transcript) => { handleSend(transcript); },
        (error) => { handleRecognitionError(error); }
    );

    const handleMicClick = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            handleRecognitionError('not-supported');
            return;
        }
        if (!isListening) {
            startListening(language);
        }
    }

    const togglePlay = (index: number) => {
        setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            const msg = newMessages[index];

            if (msg.isPlaying) {
                audioRef.current?.pause();
                msg.isPlaying = false;
            } else {
                // Pause any other playing audio
                newMessages.forEach((m, i) => {
                    if (i !== index) m.isPlaying = false;
                });
                if(audioRef.current) {
                    audioRef.current.src = msg.audioUrl!;
                    audioRef.current.play();
                }
                msg.isPlaying = true;
            }
            return newMessages;
        });
    };

    const onAudioEnded = () => {
        setMessages(prev => prev.map(m => ({ ...m, isPlaying: false })))
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // Reset state when closing
            setMessages([]);
            audioRef.current?.pause();
        }
        setIsOpen(open);
    }
    
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition && isOpen) {
             handleRecognitionError('not-supported');
        }
    }, [isOpen]);

    return (
        <>
            {/* The trigger is now in bottom-nav.tsx */}
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-[425px] md:max-w-lg flex flex-col h-[80vh]">
                    <DialogHeader>
                        <DialogTitle className='flex items-center gap-2'>
                           <Waves className='h-6 w-6'/> {t('agentTitle')}
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="flex-1 p-4 -mx-6">
                        <div className="space-y-4 pr-6">
                            {messages.map((message, index) => (
                                <div key={index} className={cn(
                                    "flex items-start gap-3",
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                )}>
                                    {message.role === 'model' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                                    <div className={cn(
                                        "p-3 rounded-lg max-w-[80%]",
                                        message.role === 'user' ? 'bg-primary/20' : 'bg-secondary'
                                    )}>
                                        <p className="text-sm">{message.content}</p>
                                        {message.audioUrl && (
                                            <Button variant="ghost" size="sm" className='mt-2 w-full justify-start' onClick={() => togglePlay(index)}>
                                                {message.isPlaying ? <Pause className='mr-2 h-4 w-4' /> : <Play className='mr-2 h-4 w-4' />}
                                                {message.isPlaying ? t('stop') : t('listen')}
                                            </Button>
                                        )}
                                    </div>
                                    {message.role === 'user' && <User className="h-6 w-6 text-primary flex-shrink-0" />}
                                </div>
                            ))}
                             {loading && !isListening && (
                                <div className="flex items-start gap-3 justify-start">
                                    <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                                    <div className="p-3 rounded-lg bg-secondary">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="mt-auto pt-4 flex flex-col items-center justify-center gap-4">
                        <Button 
                            size="icon" 
                            className={cn(
                                "h-20 w-20 rounded-full shadow-lg",
                                isListening ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                            )}
                            onClick={handleMicClick}
                            disabled={loading}
                            aria-label={isListening ? t('stopListening') : t('startListening')}
                        >
                            {isListening ? <Circle className="h-8 w-8 fill-white" /> : <Mic className="h-8 w-8" />}
                        </Button>
                        <p className='text-xs text-muted-foreground'>
                            {isListening ? t('listening') : t('tapToSpeak')}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
            <audio ref={audioRef} onEnded={onAudioEnded} className='hidden'/>
             {/* This is the dummy button to open the dialog, controlled from bottom nav */}
            <button id="agent-chat-trigger" onClick={() => handleOpenChange(true)} className="hidden"></button>
        </>
    );

    

