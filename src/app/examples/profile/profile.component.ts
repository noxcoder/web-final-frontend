import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'services/user/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    user: any;
    commandForm: FormGroup;
    commandResult: any;

    constructor(private _userService: UserService, private _fb: FormBuilder) { 
        this.user = this._userService.currentUserValue;
        if (!this.user) {
            window.location.href = "/";
        }
    }

    ngOnInit() {
        this.setCommandForm();
    }

    setCommandForm() {
        this.commandForm = this._fb.group({
            command: ["", Validators.required]
        });
    }

    sendCommand(form) {
        const data = new FormData();
        data.append("command", form.value.command);

        this._userService.commandCenter(data).subscribe((res: any) => {
            this.commandResult = res;
            window.alert(res);
        }, (error: any) => {
            if(error.error.text) {
                this.commandResult = error.error.text;
            } else {
                Swal.fire({
                    icon: "error",
                    text: `${error.message}`
                });
            }
        });
    }

}
