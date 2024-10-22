import CardInnerWrapper from '@/components/CardInnerWrapper'
import React from 'react'

import { getAuthUserId } from '@/app/actions/authActions';
import MessageBox from './MessageBox';
import ChatForm from './ChatForm';
import { getMessageThread } from '@/app/actions/messageActions';

export default async function ChatPage({params}: {params: {userId: string}}) {
    const userId = await getAuthUserId();
    const messages = await getMessageThread(params.userId);

    const body = (
        <div>
            {messages.length === 0 ? 'No messages to display' : (
                <div>
                    {messages.map(memberMessage => (
                        <MessageBox key={memberMessage.id} message={memberMessage} currentUserId={userId}  />
                    ))}
                </div>
            ) }
        </div>
    )

    return (
        <CardInnerWrapper 
            header='Chat'
            body={body}
            footer={<ChatForm />}
        />
    )
}