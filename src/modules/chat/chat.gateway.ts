import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    // 클라이언트 접속 시
    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        client.emit('welcome', '서버에 연결되었어! 🎉');
    }

    // 클라이언트 연결 해제 시
    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    // 클라이언트가 'msgToServer' 이벤트 보내면 실행
    @SubscribeMessage('msgToServer')
    handleMessage(@MessageBody() payload: { sender: string; message: string }) {
        // 받은 메시지 그대로 모두에게 브로드캐스트
        this.server.emit('msgToClient', payload);
    }
}
