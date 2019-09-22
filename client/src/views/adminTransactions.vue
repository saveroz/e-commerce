<template>
  <div>
    <h3 class="text-center mt-4 mb-4">Transaction History</h3>

    <v-tabs background-color="#757575" fixed-tabs dark icons-and-text>
      <v-tabs-slider></v-tabs-slider>

      <v-tab @click="changeStatus('pending')" href="#tab-1">
        Pending
        <i class="material-icons">confirmation_number</i>
      </v-tab>

      <v-tab @click="changeStatus('delivered')" href="#tab-2">
        Delivered
        <i class="material-icons">directions_bike</i>
      </v-tab>

      <v-tab @click="changeStatus('received')" href="#tab-3">
        Received
        <i class="material-icons">home</i>
      </v-tab>
    </v-tabs>

    <table class="table">
      <thead>
        <th scope="col">#</th>
        <th scope="col">Product</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price</th>
        <th scope="col">Total Price</th>
        <th scope="col">Date</th>
        <th scope="col">status</th>
        <th scope="col">Buyer</th>
        <th v-if="status==='pending'" scope="col">option</th>
      </thead>
      <tbody>
        <tr v-for="(transaction,index) in transactions" :key="index">
          <td>{{index+1}}</td>
          <td>
            <li v-for="(cart,index) in transaction.CartId" :key="index">{{cart.ProductId.name}}</li>
          </td>
          <td>
            <li v-for="(cart,index) in transaction.CartId" :key="index">{{cart.amount}}</li>
          </td>
          <td>
            <li
              v-for="(cart,index) in transaction.CartId"
              :key="index"
            >{{changeToDollar(cart.ProductId.price)}}</li>
          </td>
          <td>{{changeToDollar(transaction.totalPrice)}}</td>
          <td>{{convertDate(transaction.createdAt)}}</td>
          <td>{{transaction.status}}</td>
          <td>{{transaction.UserId.username}}</td>
          <td>
            <v-btn
              color="#E0E0E0"
              v-if="status==='pending'"
              @click="updateTransaction('delivered',transaction._id)"
            >deliver
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import convertToDollar from "../helpers/convertDollar";
export default {
  data() {
    return {
      status: "pending"
    };
  },

  methods: {
    changeToDollar(Number) {
      return convertToDollar(Number);
    },
    convertDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    changeStatus(status) {
      // console.log("status==")
      this.status = status;
      // console.log(this.status)
      // console.log(status==this.status ,"change Status")
    },
    updateTransaction(status, id) {
      console.log(status);
      console.log(id);
      let payload = {
        data: { status },
        id
      };
      this.$store.dispatch("updateTransaction", payload);
    }
  },
  computed: {
    transactions() {
      //   console.log(this.status)
      console.log(this.status, "computed");
      return this.$store.state.allTransactions.filter(el => {
        console.log(el.status == this.status);
        return el.status == this.status;
      });
    }
  },

  created() {
    this.$store.dispatch("getAllTransactions");
  }
};
</script>

<style>
</style>
