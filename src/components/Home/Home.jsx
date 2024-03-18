import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import mapImage from './images/map.png';

export default function Home({ onSearch }) {

  return (
    <div className='container text-center mt-5'>
      <div className="row">
        <div className='col-lg-5 mx-auto'>
          <img src={mapImage} alt="map img" className="img-fluid" />
        </div>
        <div className="col-lg-12">
          <h1>تتبع شحنتك</h1>
          <p>جميع تحديثات الشحنة ستكون متاحة من خلال هذا الرابط.</p>
        </div>
        <div className='col-lg-5 mx-auto'>
          <SearchInput onSearch={onSearch} />
        </div>
      </div>
    </div>
  )
}
