"use client";

import {useEffect, useRef} from  'react';
import {useChat} from 'ai/react';

import Image from 'next/image';
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
/*
const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const chatContainer = useRef<HTMLDivElement>(null);

    const scroll = () =>{
        const {offsetHeight, scrollHeight, scrollTop} = chatContainer.current as HTMLDivElement
        if(scrollHeight>=scrollTop+offsetHeight){
            chatContainer.current?.scrollTo(0,scrollHeight+200);
        } 
    }

    useEffect(()=>{
        scroll();
    },[messages]);

    const renderResponse = () =>{
        return(
            <div className="response">
                {messages.map((m, index)=>(
                    <div key={m.id} className={`chat-line ${m.role === 'user' ? 'user-chat' : 'ai-chat'}`}>
                        <Image className="avatar" alt="avatar" src={m.role==='user' ? '/user-avatar.jpg' : '/lcb-avatar.jpg'}/>
                         <div style={{width: '100%', marginLeft: '16px'}}>
                            <p className="message">{m.content}</p>
                            {index <messages.length-1 && <div className="horizontal-line"/>}
                        </div>
                    </div>
                ))}
            </div>
        );
    }


  return (
    <div ref={chatContainer} className="chat">
        {renderResponse()}
        <form onSubmit= {handleSubmit} className="mainform">
            <input name="input-field" type="text" onChange={handleInputChange} value={input}/>
            <button type="submit" className="mainButton"/>
        </form>
    </div>
  )
}

export default Chat;*/