import { useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "something went wrong";

  if(error.status === 500) {
    //message = JSON.parse(error.data).message;
    message = error.data.message;
  }

  if(error.status === 404) {
    title = "Not found!";
    message = "Could not load resource or page."
  }

  return (
    <div>
      <MainNavigation />
      <PageContent title={title}> 
        <p>{message}</p>
      </PageContent>
    </div>
  )
}

export default ErrorPage;