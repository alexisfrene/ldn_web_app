//import { useRouteError } from 'react-router-dom';
//TODO: Ver como implementar esto
const ErrorPage: React.FC = () => {
  //const error = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{/* <i>{error?.statusText || error.message}</i> */}</p>
    </div>
  );
};

export default ErrorPage;
