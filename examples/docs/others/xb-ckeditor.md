# xb-ckeditor
----


<div>
  <xb-ckeditor
      v-model="content"
      :config="config"
      @blur="onBlur($event)"
      @focus="onFocus($event)"
      @contentDom="onContentDom($event)"
      @dialogDefinition="onDialogDefinition($event)"
      @fileUploadRequest="onFileUploadRequest($event)"
      @fileUploadResponse="onFileUploadResponse($event)" >
      </xb-ckeditor>
</div>



<script>
export default {
  data() {
    return {
      content: '123',
      config: {
        height: 500,
        basePath: "http://127.0.0.1:8086/static/ckeditor/",
      }
    };
  },
  methods: {
    onBlur(evt) {
      console.log(evt);
    },
    onFocus(evt) {
      console.log(evt);
    },
    onContentDom(evt) {
      console.log(evt);
    },
    onDialogDefinition(evt) {
      console.log(evt);
    },
    onFileUploadRequest(evt) {
      console.log(evt);
    },
    onFileUploadResponse(evt) {
      console.log(evt);
    }
  }
};
</script>


