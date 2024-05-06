import { useRouteError } from "react-router-dom";
import Side from "./components/sidebar";

interface ErrorType {
  statusText?: string;
  message?: string;
  // Add other properties if needed
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorType;
  console.error(error);
  const errorMessage = error
    ? error.statusText || error.message || "Unknown error"
    : "Unknown error";
  return (
    <>
      <Side>
        {
          <div
            id="error-page"
            className="flex flex-col gap-2 justify-center items-center"
          >
            <h1 className="text-2xl">Oops!</h1>
            <p>Maaf, Ada Kendala Silahkan Refresh</p>
            <p>
              <i>{errorMessage}</i>
            </p>
          </div>
        }
      </Side>
    </>
  );
}
