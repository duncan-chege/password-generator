import { useState } from "react";

const PasswordGenerator = () => {
  const [value, setValue] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

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
          <img
            src="../assets/copy-icon.svg"
            alt=""
            className="absolute bottom-3 right-4 w-4"
          />
        </div>

        <div className="bg-grey/50 mt-4 px-4">
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
                checked={checked}
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
                checked={checked}
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
                checked={checked}
                onChange={handleCheckboxChange}
                className="accent-neon-green h-4 w-4"
              />
              <span className="pl-4 text-almost-white">
                Include Numbers
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                className="accent-neon-green h-4 w-4"
              />
              <span className="pl-4 text-almost-white">
                Include Symbols
              </span>
            </label>
          </div>

        </div>
      </form>
    </div>
  );
};

export default PasswordGenerator;
