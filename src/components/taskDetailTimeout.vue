<template>
  <div class="task-container">
    <ul class="task-list">
      <li v-for="item in tableData" :key="item.id" class="task-item">
        <h2 class="task-title">{{ item.title }}</h2>
        <div class="task-details">
          <p><strong>描述：</strong>{{ item.description }}</p>
          <hr class="divider" />
          <p><strong>截止时间：</strong>{{ formatDateTime(item.dueTime) }}</p>
          <hr class="divider" />
          <p><strong>任务状态：</strong><span :class="getStateClass(item.state)">{{ item.state }}</span></p>
          <hr class="divider" />
          <p><strong>校区：</strong>{{ item.campus }}</p>
          <hr class="divider" />
          <p><strong>任务开始地点：</strong>{{ item.startAddress }}</p>
          <hr class="divider" />
          <p><strong>任务结束地点：</strong>{{ item.endAddress }}</p>
          <hr class="divider" />
        </div>
        <div>
          <p><strong>发布者：</strong>{{ item.publisherUsername }} <span class="user-id">(ID: {{ item.publisherId
              }})</span></p>
          <hr class="divider" />
          <p><strong>性别：</strong>{{ item.publisherSex }}</p>
          <hr class="divider" />
          <p><strong>电话：</strong>{{ item.publisherPhone }}</p>
          <hr class="divider" />
          <p><strong>等级：</strong>{{ item.publisherLevel }}</p>

        </div>
        <hr class="divider" />
        <div>
          <p><strong>接单人：</strong>{{ item.takerUsername }} <span class="user-id">(ID: {{
            item.takerId }})</span></p>
          <hr class="divider" />
          <p><strong>性别：</strong>{{ item.takerSex }}</p>
          <hr class="divider" />
          <p><strong>电话：</strong>{{ item.takerPhone }}</p>
          <hr class="divider" />
          <p><strong>等级：</strong>{{ item.takerLevel }}</p>
        </div>
        <div class="task-meta">
          <p><strong>发布时间：</strong>{{ formatDateTime(item.publishTime) }}</p>
          <hr class="divider" />
          <p><strong>接取时间：</strong>{{ formatDateTime(item.taketime) }}</p>
          <hr class="divider" />
          <p><strong>报酬：</strong><span class="reward">{{ item.reward }}</span></p>
          <hr class="divider" />
        </div>
        <div class="comments-section">
          <h3>评论区</h3>
          <div class="comments-list">
            <div v-for="comment in comments" :key="comment.id"
              :class="['comment-item', { reply: comment.parentId !== 0 }]">
              


              <div class="comment-content">
                <!-- 显示头像，并支持点击上传新头像 -->
                <div class="avatar-container">
                  <el-avatar :size="60" :src="getAvatarUrl(comment.avatarPath)">
                    <img src= />
                  </el-avatar>
                </div>
                <div class="comment-content-1">
                <p>
                  <strong>{{ comment.publisherUsername }}
                    {{ comment.parentId !== 0 ? `回复${comment.receiverUsername}` :
                      `:` }}
                  </strong>
                  {{ comment.content }}
                </p>
              </div>
              </div>
                <div class="comment-footer">
                  <span class="timestamp">{{ formatDateTime(comment.publishTime) }}</span>
                  <button @click="replyToComment(comment.id)" class="reply-btn">回复</button>
                  <button @click="deleteComment(comment.id)" class="delete-btn">Delete</button>
                </div>
              
            </div>
          </div>
          <div class="comment-form">
            <textarea v-model="newComment" placeholder="添加你的评论..."></textarea>
            <button @click="postComment">提交评论</button>
          </div>
        </div>
        <div v-if="showDialog" class="reply-dialog">
          <div class="dialog-content">
            <h4>回复评论</h4>
            <textarea v-model="replyContent" placeholder="输入回复内容..."></textarea>
            <div class="dialog-actions">
              <button @click="submitReply">提交</button>
              <button @click="hideReplyDialog">取消</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.comment-content {
  display: flex;

  margin-left: 10px;
  margin-left: 0%;
}

.avatar-container {
  width: 8%;
  margin-left: 10px;
  margin-left: 0%;
  position: relative;
}

.comment-content-1{
  width: 92%;
}

.task-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.task-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

.task-details p {
  margin: 8px 0;
  font-size: 16px;
  color: #555;
}

.divider {
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
}

.state-pending {
  color: #e67e22;
}

.state-completed {
  color: #27ae60;
}

.state-cancelled {
  color: #c0392b;
}

.info-group {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.info-group p {
  margin: 6px 0;
}

.user-id {
  color: #7f8c8d;
  font-size: 14px;
}

.task-meta {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #d0d0d0;
}

.task-meta p {
  font-size: 14px;
  color: #7f8c8d;
}

.reward {
  font-size: 18px;
  color: #e74c3c;
  font-weight: bold;
}

.delete-button {
  color: #c0392b;
  font-size: 14px;
}

.popover-buttons {
  text-align: right;
  margin-top: 10px;
}

.popover-buttons .el-button {
  margin-left: 10px;
}

.button {
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
}

.button:active {
  background-color: #1f618d;
}

.comments-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.comments-section h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.comments-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.comment-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-form {
  display: flex;
  flex-direction: column;
}

.comment-form textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
}

.comment-form button {
  align-self: flex-end;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.comment-form button:hover {
  background-color: #2980b9;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.timestamp {
  color: #888;
}

.delete-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  float: right;
}

.reply-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  float: left;
  margin-right: 10px;
  font-size: 14px;
  border-radius: 5px;
}

.reply-btn:hover {
  background-color: #2980b9;
}

.reply-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}

.dialog-content h4 {
  margin-top: 0;
}

.dialog-actions {
  margin-top: 20px;
  text-align: right;
}

.dialog-actions button {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.dialog-actions button:hover {
  background-color: #2980b9;
}

.comment-item.reply {
  background-color: #f5f5f5;
  /* 设置背景色为浅灰色 */
  border-left: 3px solid #3498db;
  /* 左边框颜色可选 */
  padding: 8px 12px;
  /* 缩小内边距 */
  font-size: 14px;
  /* 调整字体大小 */
  margin-left: 20px;
  /* 向右移动以突出显示 */
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      sites: [2, 3, 4],
      title: '',
      myId: "3",
      comments: [],
      page: '1',
      newComment: '',
      deleteid: {
        id: 0,
      },
      commentchild: {
        presentCommentId: 1,
        content: ""
      },

      showDialog: false,
      replyContent: '',
      replyToCommentId: null,
    };
  },
  mounted() {
    this.myId = this.$route.query.taskId;
    this.getInfo();
    this.getComments();

  },
  methods: {
    getAvatarUrl(avatarPath) {
      return `http://localhost:8088${avatarPath}`;
    },
    formatDateTime(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      const Y = date.getFullYear();
      const M = ('0' + (date.getMonth() + 1)).slice(-2);
      const D = ('0' + date.getDate()).slice(-2);
      const h = ('0' + date.getHours()).slice(-2);
      const m = ('0' + date.getMinutes()).slice(-2);
      const s = ('0' + date.getSeconds()).slice(-2);
      return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    },
    getStateClass(state) {
      return {
        'state-pending': state === 'Pending',
        'state-completed': state === 'Completed',
        'state-cancelled': state === 'Cancelled'
      };
    },
    getInfo() {
      setTimeout(
        () => {
          const jwt = localStorage.getItem('cqu-project-jwt')
          console.log('[TaskInformation组件]' + '获取到的jwt为' + jwt)
          const config = { headers: { 'Authorization': jwt } }

          axios.get('http://localhost:8088/task/' + this.myId, config)
            .then((response) => {
              console.log(response);
              this.title = response.data.title;
              this.tableData = response.data;
            })
            .catch((error) => {
              console.error("请求失败:", error);
            })

        }, 500);
    },
    getComments() {
      // 你可以替换成实际的 API 请求
      axios.get('http://localhost:8088/task/' + this.myId + '/comment/' + this.page)
        .then((response) => {
          this.comments = response.data.comments;
          console.log(response);

          console.log(this.comments);
        })
        .catch((error) => {
          console.error("获取评论失败:", error);
        });
    },
    deleteComment(id) {
      this.deleteid.id = id

      const jwt = localStorage.getItem('cqu-project-jwt')
      console.log('[myTask组件]' + '获取到的jwt为' + jwt)
      const config = { headers: { 'Authorization': jwt } }

      axios.post('http://localhost:8088/task/' + this.myId + '/comment/delete', this.deleteid, config)
        .then((res) => {
          console.log(res);
          alert(res.data);
          this.getComments();
        })
        .catch((error) => {
          console.error("请求失败:", error);
        })




    },
    replyToComment(val) {
      console.log(val);
      this.showDialog = true;
      this.showReplyDialog(val);
    },

    showReplyDialog(commentId) {
      console.log(commentId)
      this.commentchild.presentCommentId = commentId;
      this.replyContent = '';
      this.showDialog = true;
    },
    hideReplyDialog() {
      this.showDialog = false;
      this.replyToCommentId = null;
    },
    submitReply() {
      if (this.replyContent.trim() === '') {
        alert('回复内容不能为空');
        return;
      }

      console.log(this.newComment);
      const jwt = localStorage.getItem('cqu-project-jwt');
      const config = { headers: { 'Authorization': jwt } };
      this.commentchild.content = this.replyContent;



      axios.post('http://localhost:8088/task/' + this.myId + '/comment/createNested', this.commentchild, config)
        .then(() => {
          this.hideReplyDialog();
          this.getComments();
        })
        .catch((error) => {
          console.error("提交回复失败:", error);
        });
    },
    postComment() {
      if (this.newComment.trim() === '') {
        alert('评论不能为空');
        return;
      }
      console.log(this.newComment);
      const jwt = localStorage.getItem('cqu-project-jwt');
      const config = { headers: { 'Authorization': jwt } };
      const commentData = {
        content: this.newComment,
        // taskId: this.myId

      };

      axios.post('http://localhost:8088/task/' + this.myId + '/comment/create', commentData, config)
        .then(() => {
          this.newComment = ''; // 清空输入框
          this.getComments(); // 刷新评论列表


        })
        .catch((error) => {
          console.error("提交评论失败:", error);
        });
      this.getComments();
    }
  },

};
</script>
