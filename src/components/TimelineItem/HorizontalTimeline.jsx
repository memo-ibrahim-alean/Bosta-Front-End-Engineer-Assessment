import React from 'react';
import './HorizontalTimeline.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';


const HorizontalTimeline = ({ data }) => {
  var promisedDate = new Date(data.PromisedDate);
  var options = { day: 'numeric', month: 'long', year: 'numeric' };
  var promiseFormattedDate = promisedDate.toLocaleDateString('ar-EG', options);


  const timestamp = data.CurrentStatus.timestamp;
  const date = new Date(timestamp);
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';
  const formattedDate = `${day} ${date.getDate()}-${month}-${year} at ${hours}:${minutes} ${ampm}`;

  return (
    <div className="container">
      <article className="card">
        <div className="card-body">
          <h6>رقم الشحنه {data.TrackingNumber}</h6>
          <article className="card">
            <div className="card-body row">
              <div className="col"> <strong>الحاله</strong> <br />
                {/* {data.CurrentStatus.state} */}
                {data.CurrentStatus.state === 'DELIVERED_TO_SENDER' ? 'تم إرجاع الأوردر الي الراسل' :
                  data.CurrentStatus.state === 'CANCELLED' ? 'التاجر حذف الأوردر, اتصل بالتاجر لمزيد من المعلومات' :
                    data.CurrentStatus.state === 'OUT_FOR_DELIVERY' ? 'الشحنه خرجت للتسليم' :
                      data.CurrentStatus.state === 'DELIVERED' ? 'تم التسليم' : ''}
              </div>
              <div className="col"> <strong>اخر تحديث</strong> <br />{formattedDate}</div>
              <div className="col"> <strong>اسم التاجر</strong> <br /> {data.provider} </div>
              <div className="col"> <strong>موعد التسليم خلال</strong> <br /> {data.PromisedDate ? promiseFormattedDate : formattedDate} </div>
            </div>
          </article>
          <div className="track">
            <div className={`step ${data.TransitEvents.some(event => event.state === 'TICKET_CREATED') ? 'active' : ''}`}>
              { }
              <span className="icon"> <FontAwesomeIcon icon={faCheck} /></span>
              <span className="text">تم انشاء الشحنة</span>
            </div>
            <div className={`step ${data.TransitEvents.some(event => event.state === 'PACKAGE_RECEIVED') ? 'active' : ''}`}>
              <span className="icon"> <FontAwesomeIcon icon={faCheck} /></span>
              <span className="text">تم استلام الشحنه من التاجر</span>
            </div>
            <div className={`step ${data.TransitEvents.some(event => event.state === 'OUT_FOR_DELIVERY') ? 'active' : ''}`}>
              <span className="icon"> <FontAwesomeIcon icon={faTruckFast} /></span>
              <span className="text">الشحنه خرجت للتسليم</span>
            </div>
            <div className={`step ${data.TransitEvents.some(event => event.state === 'DELIVERED') ? 'active' : ''}`}>
              <span className="icon truck"><FontAwesomeIcon icon={faCheck} />
              </span>
              <span className="text">تم التسليم</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default HorizontalTimeline;
