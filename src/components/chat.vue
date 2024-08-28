<template>
    <div class="app">
      <div id="chat-room">
        <h1>私信</h1>
    
        <div id="chat">
          <div id="message">
            <div v-for="msg in messages" :key="msg.timestamp">
              {{ msg.timestamp }} - {{ msg.sender }}: {{ msg.content }}
            </div>
          </div>
          <div id="inputVal">
            <input v-model="inputMessage" type="text" placeholder="输入你的消息...">
            <input v-model="senderId" type="number" placeholder="输入你的聊天对象ID" />
            <!-- <input v-model="receiverId" type="number" placeholder="接收者ID" /> -->
            <button @click="sendMessage">发送</button>
            <button @click="getnotice">获得通知</button>
          </div>
        </div>
      </div>
      <div v-if="notifications.length" id="notification-panel">
        <h2>通知</h2>
        <ul>
          <li v-for="(notification, index) in notifications" :key="index">
            {{ notification }}
          </li>
        </ul>
      </div>
      <button class="delete-button" @click="handleDelete">删除</button>
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    export default {
      data() {
        return {
          websocket: null,
          senderId: '', // 发送者ID
          receiverId: '', // 接收者ID
          inputMessage: '', // 用户输入的消息
          messages: [] ,// 消息列表
          notifications: [],
        };
      },
      created() {
           this.getuser();
           this.getnotice();
            
            
      },
      methods: {
        connectWebSocket() {
          if ('WebSocket' in window) {
            console.log(this.senderId);
            console.log(this.receiverId);
            this.websocket = new WebSocket('ws://localhost:8088/websocket/'+this.receiverId);
            this.websocket.onopen = () => {
              console.log("WebSocket 连接成功");
              this.addMessage({ timestamp: new Date().toLocaleString(), sender: '系统', content: "连接成功" });
            };
            this.websocket.onclose = () => {
              console.log("WebSocket 连接关闭");
              this.addMessage({ timestamp: new Date().toLocaleString(), sender: '系统', content: "连接关闭" });
            };
            this.websocket.onmessage = (event) => {
              this.addMessage({ timestamp: new Date().toLocaleString(), sender: '对方', content: event.data });
            };
            this.websocket.onerror = (error) => {
              console.error("WebSocket 错误", error);
              this.addMessage({ timestamp: new Date().toLocaleString(), sender: '系统', content: "WebSocket 错误" });
            };
          } else {
            alert("浏览器不支持 WebSocket");
          }
        },
        handleDelete() {
        
          const jwt = localStorage.getItem('cqu-project-jwt');
              console.log('[perinf组件]' + '获取到的jwt为' + jwt);
              const config = { headers: { 'Authorization': jwt } };
              axios.get("/notification/delete",config)
              .then(() => {
             // 清空前端通知列表
            console.log('通知已删除');
            location.reload();
          })
          .catch((error) => {
            console.error("删除通知失败:", error);
          });
        },
  
        getuser() {
              const jwt = localStorage.getItem('cqu-project-jwt');
              console.log('[perinf组件]' + '获取到的jwt为' + jwt);
              const config = { headers: { 'Authorization': jwt } };
              
              axios.get("/user", config)
                  .then((res) => {
                    console.log(res);
                  
                    
                      this.User = res.data.data;
                      // console.log(this.User.id);
                      this.receiverId=this.User.id
                      
                  })
                  .catch((error) => {
                      console.error("请求失败:", error);
                  });
          },
          getnotice(){
            const jwt = localStorage.getItem('cqu-project-jwt');
              console.log('[perinf组件]' + '获取到的jwt为' + jwt);
              const config = { headers: { 'Authorization': jwt } };
              axios.get("/sendNotification", config)
              .then((res) => {
                    console.log(res.data);
                    
                      
                      
                  })
                  .catch((error) => {
                      console.error("请求失败:", error);
                  });
          },
        addMessage(message) {
          this.messages.push(message);
          this.$nextTick(() => {
            const messageContainer = document.getElementById('message');
            messageContainer.scrollTop = messageContainer.scrollHeight;
          });
        },
        sendMessage() {
          console.log(this.senderId);
          
          if (this.inputMessage.trim() && this.senderId && this.receiverId) {
            const message = `${this.inputMessage}|${this.senderId}`;
            if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
              this.websocket.send(message);
              this.addMessage({ timestamp: new Date().toLocaleString(), sender: '我', content: this.inputMessage });
              this.inputMessage = ''; // 清空输入框
            } else {
              alert("WebSocket 连接尚未建立或已关闭");
            }
          } else {
            alert("请输入消息和有效的发送人和接收者ID");
          }
        }
      },
      watch: {
        receiverId(newVal) {
          if (newVal) {
            this.connectWebSocket();
          }
        }
      }
    };
    </script>
    
    <style scoped>
    #chat-room {
      width: 50%;
      margin: 0 auto;
    }
    
    #chat {
      border: 1px solid #ccc;
      padding: 10px;
    }
    
    #message {
      height: 500px;
      border: 1px solid black;
      background-color: darkgray;
      overflow-y: auto;
      padding: 10px;
    }
    
    #inputVal {
      margin-top: 10px;
    }
    
    input {
      width: 30%;
      margin-right: 5px;
    }
    
    button {
      width: 20%;
    }
    </style>