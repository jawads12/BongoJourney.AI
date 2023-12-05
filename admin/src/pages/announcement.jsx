import { Helmet } from 'react-helmet-async';

import { AnnouncementView } from 'src/sections/announcement/view';

// ----------------------------------------------------------------------

export default function AnnouncementPage() {
  return (
    <>
      <Helmet>
        <title> Blog | BongoJourney.AI </title>
      </Helmet>

      <AnnouncementView />
    </>
  );
}
