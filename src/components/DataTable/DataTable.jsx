// import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function DataTable({ data }) {
  let notYetCounter = 0;
  return (
    <>
      <h1 className='h5'>تفاصيل الشحنة</h1>
      <table className="table table-bordered mx-auto" >
        <thead className='table-light'>
          <tr>
            <th>الفرع</th>
            <th>التاريخ</th>
            <th>الوقت</th>
            <th>تفاصيل</th>
          </tr>
        </thead>
        <tbody>
          {data.TransitEvents.map((event, index) => (
            <tr key={index}>
              <td>
                {(() => {
                  switch (event.hub) {
                    case "Cairo Sorting Facility":
                      return "مستودع القاهرة";
                    case "Haram Hub":
                      return "مستودع الهرم";
                    case "FM & Reverse Hub":
                      return "مستودع الاسترجاع";
                    default:
                      return <FontAwesomeIcon className='text-center' icon={faTimes} />;
                  }
                })()}
              </td>
              <td>{new Date(event.timestamp).toLocaleDateString('ar-EG')}</td>
              <td>{new Date(event.timestamp).toLocaleTimeString('ar-EG')}</td>
              <td>
                {(() => {
                  switch (event.state) {
                    case "TICKET_CREATED":
                      return "تم إنشاء الأوردر. لما يكون التاجر جاهز, سنقوم باستلام الشحنة";
                    case "IN_TRANSIT":
                      return "يتم إرجاع الأوردر الي الراسل";
                    case "WAITING_FOR_CUSTOMER_ACTION":
                      if (event.exceptionCode === "1") {
                        return "تم تأجيل التسليم بسبب عدم تواجدك في العنوان";
                      } else if (event.exceptionCode === "3") {
                        return 'تم تأجيل التسليم بناءاً علي رغبتك ';
                      } else if (event.exceptionCode === "7") {
                        return 'تم تأجيل تسليم الأوردر لاننا لم نتمكن من التواصل معك عن طريق الهاتف';
                      } else {
                        return event.reason;
                      }
                    case "PACKAGE_RECEIVED":
                      if (event.hub === "FM & Reverse Hub" || notYetCounter >= 3) {
                        return "تم إلغاء الأوردر وسوف يتم إرجاعه الي الراسل";
                      } else {
                        return "تم استلام الأوردر في مستودع بوسطة و يتم تجهيزه.";
                      }
                    case "OUT_FOR_DELIVERY":
                      notYetCounter++;
                      if (notYetCounter < 3) {
                        return "جاري تسليم الاوردر";
                      } else if (notYetCounter === 3) {
                        return "سيتم إرجاع الأوردر الي التاجر بعد 3 محاولات تسليم غير ناجحه";
                      } else {
                        return "جاري إرجاع الأوردر الي الراسل";
                      }
                    case "DELIVERED":
                      return "تم التسليم";
                    case "DELIVERED_TO_SENDER":
                      return "تم إرجاع الأوردر الي الراسل";
                    case "NOT_YET_SHIPPED":
                      if (notYetCounter <= 3) {
                        return "خرج للشحن";
                      } else {
                        return "يتم تجهيز الأوردر لإرجاعة الي الراسل";
                      }
                    case "RECEIVED_DELIVERY_LOCATION":
                      return "استلام عنوان التسليم";
                    case "CANCELLED":
                      return "التاجر حذف الأوردر, اتصل بالتاجر لمزيد من المعلومات";
                    default:
                      return "";
                  }
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DataTable;
