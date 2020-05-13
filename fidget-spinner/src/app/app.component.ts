import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fidget-spinner';

  center = null;
  spinner_holder = null;
  spinner_img = null;
  spinning = false;
  last_pos = null;
  last_ang = null
  w_velocity = 0;
  curr_timestamp = null;
  spinning_int = null;

  start_Spin(event: any) {
      if(!this.center) {
          this.spinner_holder = document.querySelector(".spinner_holder");
          let spinner_holder_rect = this.spinner_holder.getBoundingClientRect();
          this.center = [150 + spinner_holder_rect.left, 150 + spinner_holder_rect.top]

          this.spinner_img = document.querySelector(".spinner_image");
      }

      if(this.spinning_int) {
          clearInterval(this.spinning_int)
          // console.log("SHOULD BE CLEARED!!!!")
          this.w_velocity = 0;
      }

      this.curr_timestamp = event.timeStamp;

      console.log(event)
      console.log(this.center)
      this.spinning = true;
      this.last_pos = {x:event.clientX-this.center[0], y:this.center[1]-event.clientY}
      if(this.spinner_img.style.transform) {
          let numberPattern = /\d+/g;
          let rotation_ang = this.spinner_img.style.transform.match(numberPattern)
          this.last_ang = Number(Object.keys(rotation_ang)[0])//Math.atan((this.last_pos.y)/(this.last_pos.x))*(180/(Math.PI))
      }
      else this.last_ang = 0;
      console.log(this.center, this.last_pos)
      // console.log(this.last_ang, this.last_pos)
      event.preventDefault();
  }

  spin(event: any) {
      console.log("spinning", this.spinning)
      if(this.spinning===true){
          let nextPos = {x:event.clientX-this.center[0], y:this.center[1]-event.clientY}
          // let change = (nextPos.y+this.last_pos.y)/(nextPos.x-this.last_pos.x)*(180/Math.PI);
          let nextAng = -Math.atan((nextPos.y)/(nextPos.x))*(180/Math.PI);
          this.spinner_img.style.transform = `rotate(${nextAng}deg)`;
          // console.log(this.last_ang)
          console.log(nextAng)
          // console.log(Math.atan((nextPos.y)/(nextPos.x)))
          this.w_velocity = (nextAng-this.last_ang)/(event.timeStamp-this.curr_timestamp);
          console.log(this.w_velocity)
          this.curr_timestamp = event.timeStamp;
          this.last_pos = nextPos;
          this.last_ang = nextAng;
      }
  }

  //included below as an arrow function, can put this in later
  freespin() {
      console.log(still_spinning)
      if(Math.abs(this.w_velocity)>0.01) {
          let nextAng = this.last_ang - this.w_velocity*(25)
          this.spinner_img.style.transform = `rotate(${nextAng}deg)`;
          this.last_ang = nextAng;
          console.log("Omega is ", this.w_velocity)
          this.w_velocity = this.w_velocity/1.01;
      }
      else {
          // console.log(this.w_velocity)
          clearInterval(this.spinning_int)
          this.w_velocity = 0
          // console.log(this.spinning_int)
          // console.log("done")
      }
  }

  end_Spin(event: any) {
      if(this.spinning===true){
          this.spinning = false;
          // console.log(Math.abs(this.w_velocity))
          let root = this;
          if(!Math.abs(this.w_velocity)<=0.01) {
              console.log(this.spinning_int)
              this.spinning_int = setInterval(() => {
                  console.log("still_spinning")
                  if(Math.abs(this.w_velocity)>0.01) {
                      let nextAng = this.last_ang + this.w_velocity*(25)
                      this.spinner_img.style.transform = `rotate(${nextAng}deg)`;
                      this.last_ang = nextAng;
                      console.log("Omega is ", this.w_velocity)
                      this.w_velocity = this.w_velocity/1.01;
                  }
                  else {
                      console.log(this.w_velocity)
                      clearInterval(this.spinning_int)
                      this.w_velocity = 0
                      // console.log(this.spinning_int)
                      // console.log("done")
                  }
              }, 25);
              // console.log(this.spinning_int)
              // console.log("free spinning")
          }
      }
  }
}