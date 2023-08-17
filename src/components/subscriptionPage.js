import React from 'react';
import '../cssComponents/subscriptionPage.css';

function SubscriptionPage() {
  return (
    <div className='subscription-container'>
      <h2>Choose a Subscription Plan</h2>
      <div className='subscription-plans'>
        <div className='subscription-plan'>
          <h3>Weekly Plan</h3>
          <p>Access to unlimited music for 7 days</p>
          <p>Price: $5.99</p>
        </div>
        <div className='subscription-plan'>
          <h3>Monthly Plan</h3>
          <p>Access to unlimited music for 30 days</p>
          <p>Price: $15.99</p>
        </div>
        <div className='subscription-plan'>
          <h3>Yearly Plan</h3>
          <p>Access to unlimited music for 365 days</p>
          <p>Price: $99.99</p>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPage;
