<template>
  <div >
    <v-btn color="#E0E0E0" @click="isCreateModal=true">Add Product</v-btn>
    <table class="table mt-4 table-hover">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Product</th>
          <th scope="col">Stock</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in products" :key="index">
          <th scope="row">{{index+1}}</th>
          <td>{{product.name}}</td>
          <td>{{product.stock}}</td>
          <td>{{product.price}}</td>
          <td>
            <v-btn color="#E0E0E0" @click="displayImage(product.image)">View Image</v-btn>
          </td>
          <td>
            <v-btn color="#E0E0E0" @click="showModalEdit(product)">Edit</v-btn> ||
            <v-btn color="#E0E0E0" @click="removeProduct(product._id)">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal untuk Edit product -->
    <b-modal id="modal-create" v-model="isEditModal">
      <b-form @submit.prevent="editProduct" id="userLoginForm">
        <b-form-group label="name">
          <b-form-input type="text" v-model="formEdit.name" placeholder="name" required></b-form-input>
        </b-form-group>
        <b-form-group label="description">
          <b-form-input type="text" v-model="formEdit.description" required></b-form-input>
        </b-form-group>
        <b-form-group label="stock">
          <b-form-input type="number" v-model="formEdit.stock"></b-form-input>
        </b-form-group>
        <b-form-group label="price">
          <b-form-input type="number" v-model="formEdit.price"></b-form-input>
        </b-form-group>
        <b-form-group label="Upload image">
            <b-form-file v-model="formEdit.image" plain></b-form-file>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" data-dismiss="modal" type="submit" form="userLoginForm">Confirm</b-button>
      </div>
    </b-modal>

    <!-- Modal untuk create product -->

    <b-modal id="modal-create" v-model="isCreateModal">
      <b-form @submit.prevent="addProduct" id="userLoginForm">
        <b-form-group label="name">
          <b-form-input type="text" v-model="formCreate.name" placeholder="name" required></b-form-input>
        </b-form-group>
        <b-form-group label="description">
          <b-form-input type="text" v-model="formCreate.description" required></b-form-input>
        </b-form-group>
        <b-form-group label="stock">
          <b-form-input type="number" v-model="formCreate.stock"></b-form-input>
        </b-form-group>
        <b-form-group label="price">
          <b-form-input type="number" v-model="formCreate.price"></b-form-input>
        </b-form-group>
        <b-form-group label="Upload image">
          <b-form-file v-model="formCreate.image" plain></b-form-file>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" data-dismiss="modal" type="submit" form="userLoginForm">Confirm</b-button>
      </div>
    </b-modal>

    <!-- Modal Untuk Nampilin Image -->
    <b-modal id="modal-image" ok-only size="md" v-model="isImageModal">
      <div style="display:flex;justify-content:center;">
        <img :src="image" style="width:300px;height:300px" />
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formCreate: {
        name: "",
        description: "",
        stock: 0,
        price: 0,
        image: ""
      },
      formEdit: {
        id: "",
        name: "",
        description: "",
        stock: 0,
        price: 0,
        iamge: ""
      },
      isImageModal: false,
      isCreateModal: false,
      isEditModal: false,
      image: ""
    };
  },
  methods: {
    displayImage(url) {
      this.image = url;
      this.isImageModal = true;
    },
    removeProduct(id) {

      this.$swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(result=>{
          if(result.value){
            this.$swal.showLoading()
            this.$store.dispatch("removeProduct", id)
            .then(success=>{
              this.$swal.close()
              this.$swal.fire({
                type : "success",
                title : "successfully remove product"
              })
            })
            .catch(err=>{
              this.$swal.close()
              let message = err.response.data && err.response.data.message || "failed to remove product"
              this.$swal.fire({
                type : "error",
                title : "failed to remove product",
                text : message
              })
            })
          }
        })
        .catch(err=>{
          console.log(err)
        })

    },
    previewFile(event) {
      this.formCreate.image = event.target.files[0];
    },
    showModalEdit(product) {
      this.formEdit.id = product._id;
      this.formEdit.name = product.name;
      this.formEdit.description = product.description;
      this.formEdit.stock = product.stock;
      this.formEdit.price = product.price;
      this.formEdit.image = product.image;
      this.isEditModal = true;
    },
    editProduct() {
      console.log(this.formEdit);
      let id = this.formEdit.id
    //   let bodyFormData = new FormData();
      let bodyFormData = new FormData()      
      bodyFormData.append("name", this.formEdit.name);
      bodyFormData.append("description", this.formEdit.description);
      bodyFormData.append("image", this.formEdit.image);
      bodyFormData.append("stock", this.formEdit.stock);
      bodyFormData.append("price", this.formEdit.price);
      this.$swal.showLoading()
      this.$store.dispatch("editProduct", {data:bodyFormData, id})
      .then(data=>{
          console.log(data)
          this.isEditModal=false
          this.$swal.close()
          this.$swal.fire({
            type : "success",
            title : "successfully to edit product"
          })
      })
      .catch(err=>{
        this.$swal.close()
        let message = err.response.data && err.response.data.message || "failed to edit product"
          // console.log(err)
        this.$swal.fire({
          type : "error",
          title : "failed to edit product",
          text : message
        })
      })

    },
    addProduct() {
      // console.log(this.formCreate.image)
      let bodyFormData = new FormData();
      bodyFormData.append("name", this.formCreate.name);
      bodyFormData.append("description", this.formCreate.description);
      bodyFormData.append("image", this.formCreate.image);
      bodyFormData.append("stock", this.formCreate.stock);
      bodyFormData.append("price", this.formCreate.price);
      this.$swal.showLoading()
      this.$store.dispatch("addProduct", bodyFormData)
      .then(() => {
        this.formCreate.name = "";
        this.formCreate.description = "";
        this.formCreate.stock = 0;
        this.formCreate.price = 0;
        this.formCreate.image = "";
        this.isCreateModal = false;
        // console.log("setelah then");
        this.$swal.close()
        this.$swal.fire({
          type : "success",
          title : "successfully add product"
        })
      }).catch(err=>{
        this.$swal.close()
        let message = err.response.data && err.response.data.message || "failed to add product"
        this.$swal.fire({
          type : "error",
          title : "failed to add product",
          text : message
        })
      })
    }
  },
  computed: {
    products() {
      return this.$store.state.allProducts;
    }
  },
  created() {
    this.$store.dispatch("getAllProducts");
  }
};
</script>

<style>
</style>
