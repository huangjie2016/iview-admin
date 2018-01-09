<style scoped>
  .tags-outer-scroll-con{
    background: #f0f0f0;
    width:100%;
    height:56px;
    line-height:40px;
    font-size:14px;
    padding: 6px 0 0 15px;
  }
  .tags-inner-scroll-body{
    float:left;
  }
  .close-all-tag-con{
    float:right;
    background:#fff;
    width:116px;
    height:56px;
    line-height:50px;
    text-align:center;
    position:relative;
    top:-6px;
  }

</style>
<template>
  <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
    <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
      <transition-group name="taglist-moving-animation">
        <Tag
          type="dot"
          v-for="(item, index) in pageTagsList"
          ref="tagsPageOpened"
          :key="item.name"
          :name="item.name"
          @on-close="closePage(index)"
          @click.native="linkTo(item)"
          :closable="item.name==='Home'?false:true"
          :color="item.children?(item.children[0].name===currentPageName?'blue':'default'):(item.name===currentPageName?'blue':'default')"
        >{{ item.title }}</Tag>
      </transition-group>
    </div>
    <div class="close-all-tag-con">
      <Dropdown transfer @on-click="handleTagsOption">
        <Button size="small" type="primary">
          标签选项
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">关闭所有</DropdownItem>
          <DropdownItem name="clearOthers">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'borderRouter',
    data () {
      return {
        currentPageName: this.$route.name,
        tagBodyLeft: 0,
        refsTag: [],
        tagsCount: 1
      };
    },
    computed: {
      pageTagsList:{
        get:function (){
          return this.$store.state.pageOpenedList;
        },
        set:function (newValue) {
          this.$store.state.pageOpenedList = newValue;
        }
      },
      tagsList () {
        return this.$store.state.pageOpenedList;
      }
    },
    methods: {
      closePage (index) {
        console.log(index);
        this.$store.commit('removePageOpenedList', index);
      },
      linkTo (item) {
          this.$router.push({path: item.path});
      },
      handlescroll (e) {
        var type = e.type;
        let delta = 0;
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
          delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
        }
        let left = 0;
        if (delta > 0) {
          left = Math.min(0, this.tagBodyLeft + delta);
        } else {
          if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
            if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
              left = this.tagBodyLeft;
            } else {
              left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
            }
          } else {
            this.tagBodyLeft = 0;
          }
        }
        this.tagBodyLeft = left;
      },
      handleTagsOption (type) {
        if (type === 'clearAll') {
          this.$store.commit('clearAllTags');
          this.$router.push({
            name: 'home_index'
          });
        } else {
          this.$store.commit('clearOtherTags', this);
        }
        this.tagBodyLeft = 0;
      },
      moveToView (tag) {
        if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
          this.tagBodyLeft = -tag.offsetLeft + 10;
        } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
          // 标签在可视区域
        } else {
          // 标签在可视区域右侧
          this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
        }
      }
    },
    mounted () {
      this.refsTag = this.$refs.tagsPageOpened;
      setTimeout(() => {
        this.refsTag.forEach((item, index) => {
          if (this.$route.name === item.name) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      }, 1); // 这里不设定时器就会有偏移bug
      this.tagsCount = this.tagsList.length;
    },
    watch: {
      '$route' (to) {
        this.currentPageName = to.name;
        this.$nextTick(() => {
          this.refsTag.forEach((item, index) => {
            if (to.name === item.name) {
              let tag = this.refsTag[index].$el;
              this.moveToView(tag);
            }
          });
        });
        this.tagsCount = this.tagsList.length;
      }
    }
  };
</script>
