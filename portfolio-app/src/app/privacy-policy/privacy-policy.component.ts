import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  constructor(private router: Router){}

  closeOverlay(e:MouseEvent){if(e.target===e.currentTarget)this.goRightOrBottom()}
  closeOnX(e:MouseEvent){e.preventDefault();this.goRightOrBottom()}

  private goRightOrBottom(){
   this.router.navigate(['/']).then(()=>{setTimeout(()=>{
    const c=document.querySelector('.container')as HTMLElement|null;if(!c)return
    c.style.setProperty('scroll-behavior','auto','important');c.style.visibility='hidden'
    if(window.innerWidth>=800){
     c.scrollLeft=c.scrollWidth-c.clientWidth
    }else{
     window.scrollTo({top:document.body.scrollHeight,behavior:'auto'})
    }
    c.offsetWidth
    c.style.visibility=''
    c.style.removeProperty('scroll-behavior')
   })})
  }
}
