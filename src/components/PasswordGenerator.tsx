import { useState } from "react";

const PasswordGenerator = () => {
  const [value, setValue] = useState<number>(0);
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setChecked((prevState) => ({
      ...prevState,
      [name]: checked, //Update the checkbox based on its name
    }));
  };

  return (
    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 w-5/6">
      <h1 className="text-xl text-grey font-bold text-center pb-8">
        Password Generator
      </h1>

      <form className="">
        <div className="relative">
          <input
            type="text"
            name="password"
            className="bg-grey/50 text-almost-white p-2 outline-none w-full"
          />
          <div className="group">
            <img
              src="../assets/green-copy-icon.svg"
              alt="Green copy icon"
              className="absolute bottom-3 right-4 w-4 cursor-pointer opacity-100 group-hover:opacity-0"
            />
            <img
              src="../assets/white-copy-icon.svg"
              alt="White copy icon"
              className="absolute bottom-3 right-4 w-4 cursor-pointer opacity-0 group-hover:opacity-100"
            />
          </div>
        </div>

        <div className="bg-grey/50 my-4 px-4 pb-4">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-base text-almost-white font-bold text-start">
              Character Length
            </h2>
            <p className="text-3xl text-neon-green">{value}</p>
          </div>
          <input
            type="range"
            className="w-full h-2 appearance-none"
            min="0"
            max="10"
            value={value}
            onChange={handleSliderChange}
            style={{
              background: `linear-gradient(to right, #A4FFAF ${
                (value / 10) * 100
              }%, #24232C ${(value / 10) * 100}%)`,
            }}
          />

          <div className="mt-8 mb-4">
            <label>
              <input
                type="checkbox"
                name="checkbox1"
                checked={checked.checkbox1}
                onChange={handleCheckboxChange}
                className="accent-neon-green h-4 w-4"
              />
              <span className="pl-4 text-almost-white">
                Include Uppercase Letters
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                name="checkbox2"
                checked={checked.checkbox2}
                onChange={handleCheckboxChange}
                className="accent-neon-green h-4 w-4"
              />
              <span className="pl-4 text-almost-white">
                Include Lowercase Letters
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                name="checkbox3"
                checked={checked.checkbox3}
                onChange={handleCheckboxChange}
                className="accent-neon-green h-4 w-4"
              />
              <span className="pl-4 text-almost-white">Include Numbers</span>
            </label>
          </div>

          <div className="mb-8">
            <label>
              <input
                type="checkbox"
                name="checkbox4"
                checked={checked.checkbox4}
                onChange={handleCheckboxChange}
                className="accent-neon-green h-4 w-4"
              />
              <span className="pl-4 text-almost-white">Include Symbols</span>
            </label>
          </div>

          <div className="mb-4 p-4 bg-very-dark-grey flex items-center justify-between">
            <p className="text-grey">STRENGTH</p>
            <div className="flex items-center">
              <p className="text-almost-white mr-4 text-xl font-bold">MEDIUM</p>
              <span className="w-3 h-8 mr-2 block bg-yellow"></span>
              <span className="w-3 h-8 mr-2 block border-2 border-almost-white"></span>
              <span className="w-3 h-8 mr-2 block border-2 border-almost-white"></span>
              <span className="w-3 h-8 mr-2 block border-2 border-almost-white"></span>
            </div>
          </div>

          <button
            type="submit"
            className="relative text-base group bg-neon-green font-bold w-full py-4 px-8 flex justify-center items-center cursor-pointer border-2 border-neon-green hover:text-neon-green hover:bg-very-dark-grey">
            GENERATE
            <span>
              <img
                className="absolute left-2/3 transform -translate-x-2/3 bottom-[1.4rem] opacity-100 group-hover:opacity-0"
                src="../assets/black-arrow.svg"
                alt=""
              />
              <img
                className="absolute left-2/3 transform -translate-x-2/3 bottom-[1.4rem] opacity-0 group-hover:opacity-100"
                src="../assets/green-arrow.svg"
                alt=""
              />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordGenerator;
