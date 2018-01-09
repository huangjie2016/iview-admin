<template>
  <div>
    <div>
      <add></add>
      <Input v-model="value" placeholder="请输入搜索内容..." style="width: 200px"></Input>
      <Button type="info">搜索</Button>
      <Button type="info">清空</Button>
      <Button type="info">高级搜索</Button>
      <br/><br/>
      <div style="text-align:right;">
        <Button type="info" @click="addDialog()">新增</Button>
        <Button type="warning">修改</Button>
        <Button type="error">删除</Button>
        <Dropdown style="margin-left: 20px">
          <Button type="success">
            批量操作
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem disabled>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown style="margin-left: 20px">
          <Button type="success">
            业务操作
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem disabled>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div style="margin-top:10px">
      <Table border ref="selection" :columns="columns4" :data="data1"></Table>
      <Button style="margin-top:10px;float:left;" @click="handleSelectAll(true)">全选</Button>
      <Button style="margin:10px 0 0 10px;float:left;" @click="handleSelectAll(false)">全不选</Button>
      <p style="clear:both;height:10px;"></p>
    </div>
    <Page :total="40" size="small" show-elevator show-sizer></Page>
  </div>

</template>
<script>
  import add from '@/components/add'
  export default {
    data () {
      return {
        value: '',
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          },
          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '图片')
              ]);
            }
          }
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          }
        ]
      }
    },
    components: {
      add
    },
    computed: {
    },
    methods: {
      addDialog() {
        this.$store.commit('showAddDialog', true);
      },
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },
    }
  }
</script>
