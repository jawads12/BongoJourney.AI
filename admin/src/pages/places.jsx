import { Helmet } from 'react-helmet-async';

import { PlacesView } from 'src/sections/places/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Places | Minimal UI </title>
      </Helmet>

      <PlacesView />
    </>
  );
}
