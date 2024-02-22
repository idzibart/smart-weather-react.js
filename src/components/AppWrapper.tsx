const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-auto text-gray-900 mt-6 grid max-w-md justify-stretch rounded-xl bg-sky-200 p-4 font-medium shadow-lg">
      {children}
    </div>
  );
};

export default AppWrapper;
