<template>
  <div>
    <h3>Import XLSX</h3>
<input type="file" @change="convert" id="your-files" multiple>
    <button @click="upload">
      UPLOAD
    </button>
  </div>
</template>

<script>
const axios = require("axios").default;


export default {
  components: {

  },
  data() {
    return {
      file: null,
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    convert(file){
      
       const CSVToJSON = csv => {
        const lines = csv.split('\n');
        const keys = lines[0].split(',');
        return lines.slice(1).map(line => {
            return line.split(',').reduce((acc, cur, i) => {
                const toAdd = {};
                toAdd[keys[i]] = cur;
                return { ...acc, ...toAdd };
            }, {});
        });
       
    };
       console.log(CSVToJSON(event.target.files));
    },
    upload() {
      axios
        .post("http://localhost:3000/search/pullzpid", {
          ...this.file,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>