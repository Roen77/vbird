<template>
  <div style="margin-bottom:20px">
    <v-card>
      <post-images :images="post.Images || []"></post-images>
      <v-card-title>
        <h3>
          <nuxt-link :to="`/user/${post.id}`">
            {{ post.User.nickname }}
          </nuxt-link>
        </h3>
      </v-card-title>
      <v-card-text>
        <div>
          <nuxt-link :to="`/post/${post.id}`">
            {{ post.content }}
          </nuxt-link>
        </div>
      </v-card-text>
      <v-card-text>
        <v-card-actions>
          <v-btn text color="orange" @click="onRetweet">
            <v-icon>mdi-twitter-retweet</v-icon>
          </v-btn>
          <v-btn text color="orange" @click="onClickHeart">
            <v-icon>{{ heartIcon }}</v-icon>
          </v-btn>
          <v-btn text color="orange" @click="onToggleComment">
            <v-icon>mdi-comment-outline</v-icon>
          </v-btn>
          <v-menu offset-y open-on-hover>
            <template #activator="{on}">
              <v-btn text color="orange" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <div style="background:#fff">
              <v-btn dark color="red" @click="onRemovePost">
                삭제
              </v-btn>
              <v-btn dark color="green" @click="onEditPost">
                수정
              </v-btn>
            </div>
          </v-menu>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <template v-if="commentOpened">
      <comment-form :post-id="post.id"></comment-form>
      <!-- 댓글입력창 -->
      <v-list>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="teal">
            <span>{{ c.User.nickname[0] }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ c.User.nickname }}</v-list-item-title>
            <v-list-item-subtitle>{{ c.content }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- 댓글리스트 -->
    </template>
  </div>
</template>

<script>
import CommentForm from './CommentForm.vue'
import PostImages from './PostImages.vue'
export default {
  components: { CommentForm, PostImages },
    props:{
        post:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            commentOpened: false
        }
    },
    computed:{
      me() {
        return this.$store.state.users.me;
      },
      liked() {
        const me = this.$store.state.users.me;
        return !!(this.post.Likers || []).find(v => v.id === (me && me.id));
      },
      heartIcon() {
        return this.liked ? 'mdi-heart' : 'mdi-heart-outline';
      },
    },
    methods: {
        onRemovePost() {
            this.$store.dispatch('posts/remove',{
                postId:this.post.id,
            })
        },
        onToggleComment(){
          if(!this.commentOpened){
            this.$store.dispatch('posts/loadCommnets',{
              postId:this.post.id,
            })
          }
            this.commentOpened=!this.commentOpened
        },
        onEditPost(){
            console.log('edit')
        },
      onRetweet() {
        if (!this.me) {
          return alert('로그인이 필요합니다.');
        }
        this.$store.dispatch('posts/retweet', {
          postId: this.post.id,
        });
      },
      onClickHeart() {
        if (!this.me) {
          return alert('로그인이 필요합니다.');
        }
        if (this.liked) {
          return this.$store.dispatch('posts/unlikePost', {
            postId: this.post.id,
          });
        }
        return this.$store.dispatch('posts/likePost', {
          postId: this.post.id,
        });
      },
    },

}
</script>

<style scoped>

</style>