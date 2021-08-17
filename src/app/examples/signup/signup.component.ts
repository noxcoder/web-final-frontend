import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'services/user/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    loginForm: FormGroup;
    isLoading: Boolean = false;

    constructor(private _userService: UserService, private _fb: FormBuilder, private _router: Router) { }

    ngOnInit() {
        this.setLoginForm();
    }

    setLoginForm() {
        this.loginForm = this._fb.group({
            email: ["", Validators.email],
            password: ["", Validators.required]
        });
    }

    login(form) {
        this.isLoading = true;
        const data = new FormData();
        data.append("email", form.value.email);
        data.append("password", form.value.password);

        this._userService.login(data).subscribe((res: any) => {
            this._router.navigate(["/command-center-hq1908"]);
        }, (error: Error) => {
            Swal.fire({
                icon: "error",
                text: `${error.message}`
            });
            this.isLoading = false;
        });
    }
}
