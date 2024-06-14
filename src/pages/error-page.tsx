import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page" className="text-center mt-36">
        <h1 className="text-2xl font-bold">Oops!</h1>
        <p className="mt-12 text-lg">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="mt-8 text-gray-400">
          <i>{error.statusText || error.status}</i>
        </p>
      </div>
    );
  }
  return <h1>Sorry, an unexpected error has occurred.</h1>;
}
