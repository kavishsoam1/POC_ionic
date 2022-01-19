import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  editForm: FormGroup;
  id: any;

  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');


  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      user_name: [''],
      process: ['']
    })

    this.db.getUser(this.id).then(res => {
      this.editForm.setValue({
        user_name: res['user_name'],
        process: res['process']
      })
    })
  }

  saveForm(){
    this.db.updateUser(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.router.navigate(['/tabs']);
    })
  }
}
