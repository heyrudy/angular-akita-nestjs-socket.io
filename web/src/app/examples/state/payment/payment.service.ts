import { Injectable } from '@angular/core'
import { NgEntityService } from '@datorama/akita-ng-entity-service'
import { PaymentState, PaymentStore } from './payment.store'

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends NgEntityService<PaymentState> {

  constructor(
    protected store: PaymentStore,
  ) {
    super(store)
  }
}
