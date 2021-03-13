<template>
  <div style="margin-bottom:20px">
    <v-card>
      <v-img />
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
          <v-btn text color="orange">
            <v-icon>mdi-twitter-retweet</v-icon>
          </v-btn>
          <v-btn text color="orange">
            <v-icon>mdi-heart-outline</v-icon>
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
export default {
  components: { CommentForm },
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
        }
    },

}
</script>

<style scoped>

</style>