<style scoped lang="scss" src="./updateDeveloper.scss"></style>
<template src="./updateDeveloper.html"></template>

<script lang="ts">
import { Developers } from "@/model/developers";
import { Component, Vue } from "vue-property-decorator";
import UserService from "../../../services/userService";

@Component
export default class UpdateDeveloper extends Vue {
  developers: Developers = new Developers();
  submitted = false;
  $validator: any;
  userid : any;

  created()
  {
    this.userid = localStorage.getItem("devId");
    console.log(this.userid);
    if(this.userid != null && this.userid != ''){
      this.getUserDataByid();
    }
  
  }

    onUpload(event) {
    for (const file of event.files) {
      let fileNameArray = file.name.split('.');
      if (file.size >= 1000000) {
        alert("File size exceeds")
      } else if (fileNameArray[fileNameArray.length - 1] != 'jpg' && fileNameArray[fileNameArray.length - 1] != 'jpeg' && fileNameArray[fileNameArray.length - 1] != 'png') {
        alert("Profile Pic only accepts jpg, jpeg and png file format");
      } else {
        this.developers.image_name = file.name;
        const reader = new FileReader();
        reader.onload = this.readProfilePic.bind(this);
        reader.readAsBinaryString(file);
      }
    }
  }
  readProfilePic(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.developers.profile_pic = btoa(binaryString);
}

 getUserDataByid(){
   console.log(this.userid);
      this.submitted = true;
      
      UserService.getUserById(this.userid).then(
        data => {
          if (data != undefined && data.data != undefined) {
            if (data.data.status == 200) {                  
                  this.developers = data.data.data.result;
                  console.log(this.developers);

            } else {
              alert("Data not found");
            }
          }
        }
      );
         
}
home() {
    this.$router.push("/developersList");
}

logout() {
    localStorage.clear();
    this.$router.push("/");
  }
updateUser(){
      this.submitted = true;
        this.$validator.validate().then(valid => {
          if (valid) {
            this.submitted = false;
      UserService.updateUser(this.developers).then(
        data => {
          if (data != undefined && data.data != undefined) {
            if (data.data.status == 200) {
              alert("Developer Updated Successfully");
            } else {
              alert("Developer not Updated")
            }
          }
        }
      );
         } });
}
}
</script>