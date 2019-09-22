<template>
  <div class="mt-2 mb-4">
    <template>
      <v-card class="ml-2" max-width="844" width="900" height="220">
        <v-card-text>
          <div class="text-center">
            <v-rating v-model="review.rating"></v-rating>
          </div>
          <br>
          <p>{{review.content}}</p>
          <div class="text-center">
              {{review.UserId.username}}
          </div>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>
  </div>
</template>

<script>
export default {
    props : {
        review : Object
    },
    data(){
        return { 
            rating : 4
        }
    }
};
</script>

<style>
</style>
