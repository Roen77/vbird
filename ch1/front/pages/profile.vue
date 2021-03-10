<template>
  <div>
    <v-container>
      <v-card style="margin-bottom:20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChaneNickname">
            <v-text-field v-model="nickname" label="닉네임" required :rules="nicknameRules" />
            <v-btn color="blue" type="submit">
              수정
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
      <!-- card -->
      <v-card style="margin-bottom:20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :users="followingLlist" :remove="removeFollowing" />
        </v-container>
      </v-card>
      <v-card style="margin=bottom:20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from '../components/FollowList.vue'
export default {
  components: { FollowList },
  middleware:'authenticated',
  data() {
      return {
          valid: false,
          nickname:'',
          nicknameRules:[v=>!!v || "닉네임을 입력하세요"]
      }
  },
      computed:{
        followingLlist(){
            return this.$store.state.users.followingList
        },
        followerList(){
            return this.$store.state.users.followerList
        },
    },
  methods: {
      onChaneNickname() {
          this.$store.dispatch("users/changeNickname",{
              nickname:this.nickname,

          })
      },
      removeFollowing(id){
          this.$store.dispatch('users/removeFollowing',{id})
      },
      removeFollower(id){
            this.$store.dispatch('users/removeFollower',{id})
      }
  }
    // layout:'admin',
    // nuxt가 추가한것
    // head(){
    //     return{
    //         title:'프로필'
    //     }
    // }

}
</script>

<style>

</style>