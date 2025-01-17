const PasswordGenerator = () => {
  return (
    <div className="w-1/4">
      <h1 className="text-xl text-grey font-bold text-center pt-32 pb-8">
        Password Generator
      </h1>

      <form className="">
        <div className="relative">
          <input
            type="text"
            name="password"
            className="bg-grey/50 text-almost-white p-2 outline-none w-full"
          />
          <img src="../assets/copy-icon.svg" alt="" className="absolute bottom-3 right-4 w-4" />
        </div>
      </form>
    </div>
  );
};

export default PasswordGenerator;
