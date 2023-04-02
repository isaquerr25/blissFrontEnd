function NoInternet() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold border-b-4 border-teal-500 pb-2 mt-[3rem]">
        No internet connection
      </h1>
      <p>Please check your connection and try again later.</p>
    </div>
  );
}

export default NoInternet;
