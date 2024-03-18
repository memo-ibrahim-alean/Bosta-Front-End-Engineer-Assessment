import React from 'react';
import questionImage from './images/qustion.png';

export default function DeliveryAddress() {
  return (
    <div>
      <h1 className='h5'>عنوان الاستلام</h1>
      <div>
        <div class="card">
          <div class="card-body">
            , امبابة شارع طلعت حرب مدينة العمال بجوار
            البرنس منزل ١٧ بلوك ٢٢,,, Cairo
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-5">
                <img src={questionImage} alt="" className="img-fluid" />
              </div>
              <div class="col-md-7">
                <p class="card-text font-weight-bold">هل يوجد مشكلة في شحنتك ؟!</p>
                <a href="#" class="btn btn-danger">ابلاغ عن مشكلة</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
