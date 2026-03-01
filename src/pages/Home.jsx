import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col pt-24">
      <Navbar />
      {/* Home Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to AI Interview
          </h1>
          <p className="mt-4 text-gray-600">
            Prepare for your next technical interview.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
