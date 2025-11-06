import useAuth from "../context/AuthContext";
export default function Home() {
  const { CurrentUser } = useAuth();
  if (CurrentUser) {
    return (
      <>
        <div className="flex items-center justify-center h-screen text-xl text-gray-700">
          <h1 className="text-2xl font-bold">
            Welcome, {CurrentUser.Username} 👋
          </h1>
          <p className="mt-4 text-gray-700">
            This is your Home page content...
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen text-xl text-gray-700">
        Please log in to view this page.
      </div>
    </>
  );
}
