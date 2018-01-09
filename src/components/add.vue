<template>
  <!--<Button type="primary" @click="modal1 = true">Display dialog box</Button>-->
  <Modal
    v-model="modal1"
    title="新增用户数据"
    @on-ok="ok"
    @on-cancel="ok">
    <Form :model="formItem" :label-width="80" :rules="ruleValidate">
      <FormItem label="name" prop="name">
        <Input v-model="formItem.name"  placeholder="请输入姓名" />
      </FormItem>
      <FormItem label="age" prop="age">
        <Input v-model="formItem.age" placeholder="请输入年龄"/>
      </FormItem>
      <FormItem label="address" prop="address">
        <Input v-model="formItem.address" placeholder="请输入地址" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSubmit(formItem)">Submit</Button>
        <Button type="ghost" style="margin-left: 8px">Cancel</Button>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          name: '',
          age: '',
          address: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          age: [
            { required: true, message: 'The age cannot be empty', trigger: 'blur' }
          ],
          address: [
            { required: true, message: 'The address cannot be empty', trigger: 'blur' }
          ],
        }
      }
    },
    computed: {
      modal1: {
        get:function (){
          return this.$store.state.addDialog
        },
        set:function (newValue) {
          this.$store.state.addDialog = newValue;
        }
      }
    },
    methods: {
      onSubmit(obj) {
        console.log(obj);
        this.ok();
        this.formItem = {
          name : '',
          age : '',
          address : ''
        }
      },
      ok() {
        this.$store.commit('showAddDialog', false);
      }
    }
  }
</script>
