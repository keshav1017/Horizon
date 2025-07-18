import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const PaymentTransfer = async () => {

  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  return (
    <section className='payment-transfer'>
      <HeaderBox title='Payment Transfer' subtext='Please provide any specific details of notes related to the payment transfer' />

      <section className='size-full' style={{ paddingTop: '20px' }}>
        <PaymentTransferForm accounts={accounts?.data}/>
      </section>
    </section>
  )
}

export default PaymentTransfer