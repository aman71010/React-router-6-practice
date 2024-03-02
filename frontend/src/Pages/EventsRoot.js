import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import EventsNavigation from '../components/EventsNavigation';

function EventsLayout() {
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  return (
    <>
      <EventsNavigation />
      { submitting && <p style={{textAlign: 'center'}}>Submitting event...</p> }
      <Outlet />
    </>
  )
}

export default EventsLayout;