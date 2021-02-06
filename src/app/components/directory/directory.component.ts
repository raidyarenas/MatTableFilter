import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Directory} from '../../interfaces';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  form: FormGroup;
  directory: Directory;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<DirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.directory = data.directory;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      code: [this.directory?.code, [Validators.required]],
      name: [this.directory?.name, [Validators.required]],
      address: [this.directory?.address, [Validators.required]],
      town: [this.directory?.town, [Validators.required]],
      postal_code: [this.directory?.postal_code, [Validators.required]],
      city: [this.directory?.city, [Validators.required]],
      phone: [this.directory?.phone, [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: [this.directory?.email, [Validators.required, Validators.email]]
    });
  }

  save(): void {
    this.directory = {...this.directory, ...this.form.value};
    this.dialog.close(this.directory);
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
