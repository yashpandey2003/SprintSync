import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChatByProject, fetchChatMessages, sendMessage, receiveMessage } from '@/Redux/Chat/Action.js'
import { useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { useRef } from 'react'

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { auth, chat } = useSelector(store => store);
    const { id } = useParams();
    const scrollRef = useRef(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat.messages]);

    useEffect(() => {
        dispatch(fetchChatByProject(id))
    }, [dispatch, id])

    // WebSocket Connection
    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8081/ws',
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe(`/project/${id}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    dispatch(receiveMessage(receivedMessage));
                });
            },
            onStompError: (error) => {
                console.error("STOMP error", error);
            }
        });

        client.activate();

        return () => {
            if (client) {
                client.deactivate();
                console.log('Disconnected from WebSocket');
            }
        };
    }, [id, dispatch]);

    useEffect(() => {
        if (chat.chat?.id) {
            dispatch(fetchChatMessages(chat.chat.id));
        }
    }, [chat.chat?.id, dispatch]);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        dispatch(sendMessage({
            senderId: auth.user?.id,
            projectId: id,
            content: message
        }));
        setMessage("");
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <div className='sticky top-20'>
            <div className='glass-card rounded-xl overflow-hidden hover:transform-none'>
                {/* Header */}
                <div className='px-4 py-3 border-b border-white/5'>
                    <h2 className='text-sm font-semibold'>Project Chat</h2>
                    <p className='text-xs text-muted-foreground mt-0.5'>
                        {chat.messages?.length || 0} messages
                    </p>
                </div>

                {/* Messages */}
                <ScrollArea className='h-[30rem] w-full p-4'>
                    <div className='flex flex-col gap-3'>
                        {chat.messages?.length > 0 ? (
                            chat.messages.map((item, index) => {
                                const isOwnMessage = item.sender?.id === auth.user?.id;
                                return (
                                    <div 
                                        className={`flex gap-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`} 
                                        key={item.id || index}
                                    >
                                        {!isOwnMessage && (
                                            <Avatar className="h-7 w-7 shrink-0">
                                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                    {item.sender?.fullName?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={`max-w-[75%] ${isOwnMessage 
                                            ? 'bg-primary/20 rounded-2xl rounded-tr-sm border border-primary/20 shadow-[0_0_15px_-5px_hsla(250,95%,64%,0.2)]' 
                                            : 'bg-white/5 rounded-2xl rounded-tl-sm border border-white/5'
                                        } px-4 py-2.5`}>
                                            <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isOwnMessage ? 'text-primary' : 'text-muted-foreground/70'}`}>
                                                {item.sender?.fullName}
                                            </p>
                                            <p className='text-sm leading-relaxed'>{item.content}</p>
                                        </div>
                                        {isOwnMessage && (
                                            <Avatar className="h-7 w-7 shrink-0 border border-primary/30">
                                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                    {item.sender?.fullName?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className='flex flex-col items-center justify-center h-[200px] text-muted-foreground/30'>
                                <div className='p-4 rounded-full bg-white/5 mb-3'>
                                    <PaperPlaneIcon className='h-6 w-6' />
                                </div>
                                <p className='text-xs'>No messages yet. Start the conversation!</p>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                {/* Input */}
                <div className='p-4 border-t border-white/5 bg-white/2 pb-6'>
                    <div className='relative group'>
                        <div className='absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-indigo-500/50 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-300' />
                        <div className='relative flex items-center bg-background rounded-lg'>
                            <Input 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..." 
                                className='py-6 px-4 bg-transparent border-white/5 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg pr-12' 
                            />
                            <Button 
                                onClick={handleSendMessage} 
                                className='absolute right-2 h-8 w-8 rounded-md bg-primary hover:bg-primary/90 transition-all' 
                                size="icon" 
                                disabled={!message.trim()}
                            >
                                <PaperPlaneIcon className='h-4 w-4' />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox
