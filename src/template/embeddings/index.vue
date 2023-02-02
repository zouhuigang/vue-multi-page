<template>
  <div id="app">
    <Card class="main">
      <p slot="title">
        embeddings
      </p>
      <Row class="search">
        <Col span="16">
          搜索关键词： <Input v-model="keywords" placeholder="输入分类、问题、背景知识等关键词" clearable style="width: 200px"/>
          <!--          <Col span="8">-->
          <!--            <DatePicker :value="date"  @on-change="handleChange" format="yyyy-MM-dd" type="date" placeholder="查询日期" style="width: 200px"></DatePicker>-->
          <!--          </Col>-->
          <Button type="primary" icon="ios-search" @click="jumpSearch">搜索</Button>

          <Button type="success" @click="ok">添加问题</Button>
        </Col>
        <Col span="8">
          <Page :current="page" :page-size="size" :total="total" show-total @on-change="jumpPage"></Page>
        </Col>
      </Row>

      <Table :loading="loading" :columns="columns1" :data="data1"></Table>

      <Modal
          v-model="showModalEdit"
          title="添加问题"
          footer-hide
          @on-ok="ok"
          @on-cancel="cancel">
        <Form :model="formItem" ref="formItem" :label-width="80" :rules="ruleValidate">
          <FormItem label="分类" prop="document_name">
            <Input v-model="formItem.document_name" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入分类名称"></Input>
          </FormItem>
          <FormItem label="问题" prop="content">
            <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入问题"></Input>
          </FormItem>
          <FormItem label="背景知识" prop="template">
            <Input v-model="formItem.template" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入背景知识"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formItem')">提交</Button>
          </FormItem>
        </Form>
      </Modal>

      <Modal
          v-model="showModalEdit2"
          :title="modalTitle"
          footer-hide
          @on-ok="ok"
          @on-cancel="cancel">
        <Form :model="formItem2" ref="formItem2" :label-width="80" :rules="ruleValidate">
          <FormItem label="id" prop="id">
            <Input v-model="formItem2.id" disabled readonly></Input>
          </FormItem>
          <FormItem label="分类" prop="document_name">
            <Input v-model="formItem2.document_name" :disabled="deletedModel" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入分类名称"></Input>
          </FormItem>
          <FormItem label="问题" prop="content">
            <Input v-model="formItem2.content" type="textarea" :disabled="deletedModel" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入问题"></Input>
          </FormItem>
          <FormItem label="背景知识" prop="template">
            <Input v-model="formItem2.template" type="textarea" :disabled="deletedModel" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入背景知识"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit2('formItem2')">提交</Button>
          </FormItem>
        </Form>
      </Modal>

      <Modal
          v-model="showModalEdit3"
          :title="modalTitle"
          footer-hide
          @on-ok="ok"
          @on-cancel="cancel">
        <Form :model="formItem3" ref="formItem2" :label-width="80" >
          <FormItem label="id" prop="id">
            <Input v-model="formItem3.id" disabled readonly></Input>
          </FormItem>
          <FormItem label="分类" prop="document_name">
            <Input v-model="formItem3.document_name" :disabled="deletedModel" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入分类名称"></Input>
          </FormItem>
          <FormItem label="问题" prop="content">
            <Input v-model="formItem3.content" type="textarea" :disabled="deletedModel" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入问题"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit3('formItem3')">确认删除</Button>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>


<script>
import api from '@/libs/api.js';

export default {
  name: 'app',
  data() {
    return {
      loading: false,
      formItem: {
        document_name: '',
        content: '',
        template: '',
      },
      formItem2: {
        id:'',
        document_name: '',
        content: '',
        template: '',
      },
      formItem3: {
        id:'',
        document_name: '',
        content: '',
        template: '',
      },
      ruleValidate: {
        document_name: [
          {required: true, message: '分类不能为空', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '问题不能为空', trigger: 'blur'},
        ]
      },
      showModalEdit: false,
      showModalEdit2: false,
      deletedModel:false,
      modalTitle:"",
      page: 1,
      size: 20,
      total: 0,
      keywords: "",
      document_name: "",
      content: "",
      template: "",
      columns1: [
        {
          title: 'id',
          key: 'id'
        }, {
          title: '分类',
          key: 'document_name'
        },
        {
          title: '问题',
          key: 'content'
        },
        {
          title: '背景知识',
          key: 'template'
        },
        {
          title: '修改时间',
          key: 'updated_at',
          render: (h, params) => {
            let updated_at = params.row.updated_at;
            let date = new Date(updated_at * 1000);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            let h1 = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            let mcHtml = (
                Y + M + D + h1 + m + s
            );
            return (<div> {mcHtml} < /div>);
          }
        }, {
          title: '操作',
          key: 'opt',
          render: (h, params) => {
            let id = params.row.id;
            let datas = params.row;
            let mcHtml = (
                <i-button class="opt" type="success" nativeOnClick={this.edit.bind(this, id,datas)}> 编辑 < /i-button>
            );
            let mcHtml2 = (
                <i-button class="opt" type="error" nativeOnClick={this.delete.bind(this, id,datas)}> 删除 < /i-button>
            );

            return (<div> {mcHtml} {mcHtml2} < /div>);
          }
        }

      ],
      data1: []
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          return api.saveForm(this.formItem).then(res => {
            this.$Message.success('保存成功');
            this.$nextTick(function () {
              this.resetSearch();
            });
          });
        } else {
          this.$Message.error('请检查表单内容是否完整!');
        }
      })
    },
    handleSubmit2(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          return api.saveForm(this.formItem2).then(res => {
            this.$Message.success('保存成功');
            this.$nextTick(function () {
              this.resetSearch();
            });
          });
        } else {
          this.$Message.error('请检查表单内容是否完整!');
        }
      })
    },
    handleSubmit3(name) {
      return api.saveForm(this.formItem3).then(res => {
        this.$Message.success('删除成功');
        this.$nextTick(function () {
          this.resetSearch();
        });
      });
    },
    resetSearch() {
      this.showModalEdit = false;
      this.showModalEdit2 = false;
      this.showModalEdit3 = false;
      this.page = 1;
      this.keywords = "";
      this.data1 = [];
      this.search();
    },
    ok() {
      this.showModalEdit = true;
    },
    cancel() {
    },
    delete(id,row){
      this.showModalEdit = false;
      this.showModalEdit2 = false;
      this.showModalEdit3 = true;
      this.deletedModel = true;
      this.formItem3.id = id;
      this.formItem3.document_name = row.document_name;
      this.formItem3.content = row.content;
      this.formItem3.deleted = 1;
      this.modalTitle = "确认删除问题?"
    },
    edit(id,row) {
      this.showModalEdit2 = true;
      this.showModalEdit = false;
      this.showModalEdit3 = false;
      this.deletedModel = false;
      this.formItem2.id = id;
      this.formItem2.document_name = row.document_name;
      this.formItem2.content = row.content;
      this.formItem2.template = row.template;
      this.formItem2.deleted = 0;
      this.modalTitle = "修改问题"
    },
    jumpPage(nextPage) {
      this.page = nextPage;
      this.search();
    },
    jumpSearch() {
      this.page = 1;
      this.search();
    },
    search() {
      let _this = this;
      let form_data = {}
      form_data["page"] = parseInt(_this.page)
      form_data["size"] = parseInt(_this.size)
      form_data["keywords"] = _this.keywords
      this.loading = true;
      return api.getDataList(form_data).then(res => {
        this.loading = false;
        this.data1 = res.data
        this.total = res.count;
      });
    },
    jump() {
      window.location.href = "/user/story/submit"
    }
  },
  computed: {},
  created() {

  },
  mounted() {//验证本地存储的token是否合法
    this.search();
  }
}
</script>

<style scoped>
.main {
  margin: 15px auto;
  width: 96%;
}

.search {
  margin: 20px 0;
}

div >>> .opt {
  margin: 0 2px;
}
</style>

