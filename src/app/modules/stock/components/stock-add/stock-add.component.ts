import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.scss'],
})
export class StockAddComponent implements OnInit {
  stockForm: FormGroup;
  partName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.partName = atob(this.activatedRoute.snapshot.params.partName);
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm(): void {
    this.stockForm = this.formBuilder.group({
      quantity: [null, [Validators.required, Validators.min(1)]],
      dateIn: [null, [Validators.required]],
      dateOut: [null, [Validators.required]],
      location: [null, [Validators.required]],
    });
  }
}
