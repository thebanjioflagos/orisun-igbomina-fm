"use client";

import dynamic from 'next/dynamic';

const AdBookingForm = dynamic(() => import('./AdBookingForm'), {
  ssr: false,
});

export default function AdBookingFormDynamic() {
  return <AdBookingForm />;
}
