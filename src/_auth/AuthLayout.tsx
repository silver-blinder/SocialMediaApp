import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthed = false;

  return (
    <>
      {isAuthed ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 flex-col items-center my-auto py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className=" hidden xl:block w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
