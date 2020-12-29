import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AkitaNgFormsManager} from '@datorama/akita-ng-forms-manager';
import {Payment} from '../../state/payment/payment.model';

export interface FormsState {
  payment: Payment;
}

@Component({
  selector: 'app-dirty-check',
  templateUrl: './dirty-check.component.html',
  styleUrls: ['./dirty-check.component.css']
})
export class DirtyCheckComponent implements OnInit, OnDestroy {

  paymentForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly formsManager: AkitaNgFormsManager<FormsState>
  ) {
  }

  get contact() {
    return this.paymentForm.get('contact');
  }

  get contactEmail() {
    return this.paymentForm.get('contact').get('email');
  }

  get contactName() {
    return this.paymentForm.get('contact').get('name');
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      contact: this.fb.group({
        title: [''],
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['']
      }),
      creditCard: this.fb.group({
        cardType: [''],
        cardNumber: [''],
        expirationDate: ['']
      })
    });
    this.formsManager.upsert('payment', this.paymentForm, {persistForm: true});
  }

  ngOnDestroy(): void {
    this.formsManager.unsubscribe('payment');
  }

  onSubmit(): void {
    this.paymentForm.reset();
  }

  onResetClick(): void {
  }
}
