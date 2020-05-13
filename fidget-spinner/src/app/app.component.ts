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

  start_Spin(event: any) {
      if(!this.center) {
          this.spinner_holder = document.querySelector(".spinner_holder");
          let spinner_holder_rect = this.spinner_holder.getBoundingClientRect();
          this.center = [150 + spinner_holder_rect.left, 150 + spinner_holder_rect.top]

          this.spinner_img = document.querySelector(".spinner_image");
      }

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
          this.last_pos = nextPos;
          this.last_ang = nextAng;
      }
  }

  end_Spin(event: any) {
      if(this.spinning===true){
          this.spinning = false;
      }
  }
}
