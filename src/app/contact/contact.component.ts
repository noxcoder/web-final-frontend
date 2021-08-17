import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ContactService } from 'services/contact/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  halfFlag: any = "abcctf{l3t_";
  contactForm: FormGroup;
  isLoading: Boolean = false;

  constructor(private _contactService: ContactService, private _fb: FormBuilder, private _cookieService: CookieService) {
    this._cookieService.set("sendTo", "web-admin");
   }

  ngOnInit(): void {
    this.setContactForm();
  }

  setContactForm() {
    this.contactForm = this._fb.group({
      email: ["", Validators.email],
      name: ["", Validators.required],
      body: ["", Validators.required]
    });
  }

  sendForm(form) {
    this.isLoading = true;
    const data = new FormData;
    data.append("email", form.value.email);
    data.append("name", form.value.name);
    data.append("body", form.value.body);

    this._contactService.send(data).subscribe((res: any) => {
      Swal.fire({
        icon: "success",
        text: `${res.msg}`,
        timer: 10000
      });
      this.isLoading = false;
    }, (error: Error) => {
      Swal.fire({
        icon: 'error',
        text: `${error.message}`
      });
      this.isLoading = false;
    });
  }

}
