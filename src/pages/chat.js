import { useEffect } from "react";
import { ChatClient } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { Button } from "@chakra-ui/react";

let token = {
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNCIsIng1dCI6IlJDM0NPdTV6UENIWlVKaVBlclM0SUl4Szh3ZyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjRhNzgzNDhiLWI2NDktNGJlNS1iZWI4LTU3ZmYwNzM5YzdmNF8wMDAwMDAwZi04YTBkLTcyMTQtMTE2MC1jOTNhMGQwMDIyMWYiLCJzY3AiOjE3OTIsImNzaSI6IjE2NDQ2MDYyNDYiLCJleHAiOjE2NDQ2OTI2NDYsImFjc1Njb3BlIjoiY2hhdCIsInJlc291cmNlSWQiOiI0YTc4MzQ4Yi1iNjQ5LTRiZTUtYmViOC01N2ZmMDczOWM3ZjQiLCJpYXQiOjE2NDQ2MDYyNDZ9.Nylyy_jL3DsWOgHCkZBn36820Ez3CjVcaf3LuTSLkhfBfdx9WRJH-7Pl2CoNSHX9uug0iAPElWePtOl6YOkod2Q746RA0a5fIyiQBx3qN7TuzaFb1tO30BKeViYTPZJBrLaQTwsQy2cViU4oAEjnMV8t7Hz6PU3kdtoexL-EYk9Mm8ZMITxQisoLn6xpQWziuI35i3N__d4fs1bElHvhz8O1gF6s4QhaEA2xjRz6mF9tS-2rJojhJvsjwdu9fsK8PCnpSnJjYf9cefU2swcfwg7bY0ovqamBayUWlA9cc2wsD6RPlwHtRqT3HwQAqBFbWnteLNZHe0x0gQ0xz2i44Q",
    "expiresOn": "2022-02-12T19:04:06.445Z",
    "user": {
        "communicationUserId": "8:acs:4a78348b-b649-4be5-beb8-57ff0739c7f4_0000000f-8a0d-7214-1160-c93a0d00221f"
    }
}
let endpoint = 'https://assignment-santa-communication.communication.azure.com/';

let chatClient = new ChatClient(endpoint, new AzureCommunicationTokenCredential(token));
//let chatThreadClient = chatClient.getChatThreadClient("19:zgVFbIgY3clbwmfexCe9OkhdmhodmmZV75naZhyFmmE1@thread.v2");

// async function sendMessage() {
//     const sendMessageRequest =
//     {
//         content: 'Please take a look at the attachment'
//     };
//     let sendMessageOptions =
//     {
//         senderDisplayName: 'Jack',
//         type: 'text',
//         metadata: {
//             'hasAttachment': 'true',
//             'attachmentUrl': 'https://contoso.com/files/attachment.docx'
//         }
//     };
//     const sendChatMessageResult = await chatThreadClient.sendMessage(sendMessageRequest, sendMessageOptions);
//     const messageId = sendChatMessageResult.id;
//     console.log(`Message sent!, message id:${messageId}`);
// }


function Chat() {

    useEffect(async () => {
        const threads = chatClient.listChatThreads();
        //const messages = chatThreadClient.listMessages();

        await chatClient.startRealtimeNotifications();
        // subscribe to new notification
        console.log(chatClient);
        chatClient.on("chatThreadCreated", (e) => {
            console.log("Thread Created!");
            // your code here
        });

        // for await (const message of messages) {
        //     console.log(message);
        // }

        for await (const thread of threads) {
            console.log(thread);
        }
    })

    return (
        <>
            <Button onClick={() => { console.log('h') }}>Send</Button>
        </>
    );
}

export default Chat;