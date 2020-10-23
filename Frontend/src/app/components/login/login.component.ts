import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model.model';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  needToRegister = false;

  constructor(private formBuilder: FormBuilder,
    private readonly userService: UserserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // convenience getter for easy access to form fields
  get formData() { return this.form.controls; }

  showRegisterForm() {
    this.needToRegister = true;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService.authenticateUser(this.formData.email.value, this.formData.password.value)
      .subscribe((user: UserModel) => {
        // get return url from query parameters or default to home page
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
        err => {
          console.error('Observer got an error: ' + err);
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  gmailSignin() {
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
