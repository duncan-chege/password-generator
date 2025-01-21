import { useState } from "react";

const PasswordGenerator = () => {
  const [value, setValue] = useState<number>(4); // Length of password
  const [password, setPassword] = useState<string>(""); // Generated password
  const [strength, setStrength] = useState<string>(""); // Password strength label
  const [highlightedBars, setHighlightedBars] = useState<number>(0);

  const [checked, setChecked] = useState<{ [key: string]: boolean }>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value)); // Update password length based on the slider
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setChecked((prevState) => ({
      ...prevState,
      [name]: checked, //Update the checkbox based on its name
    }));
  };

  const updatePasswordStrength = (length: number) => {
    if (length >= 4 && length <= 6) {
      setStrength("TOO WEAK");
      setHighlightedBars(1);
    } else if (length >= 7 && length <= 9) {
      setStrength("WEAK");
      setHighlightedBars(2);
    } else if (length >= 10 && length <= 13) {
      setStrength("MEDIUM");
      setHighlightedBars(3);
    } else if (length >= 14 && length <= 16) {
      setStrength("STRONG");
      setHighlightedBars(4);
    }
  };

  const generatePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let newPassword = "";

    for (let i = 0; i < value; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
    updatePasswordStrength(value); // Update strength after password is generated
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generatePassword();
  };

  return (
    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 w-5/6">
      <h1 className="text-xl text-grey font-bold text-center pb-8">
        Password Generator
      </h1>

      <form className="" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            name="password"
            className="bg-dark-grey text-almost-white py-2 px-4 outline-none w-full"
            value={password}
            placeholder="P4$5W0rD!"
            readOnly // Prevents manual input
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

        <div className="bg-dark-grey my-4 px-4 pb-4">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-base text-almost-white font-bold text-start">
              Character Length
            </h2>
            <p className="text-3xl text-neon-green">{value}</p>
          </div>
          <input
            type="range"
            className="w-full h-2 appearance-none"
            min="4"
            max="16"
            value={value}
            onChange={handleSliderChange}
            style={{
              background: `linear-gradient(to right, #A4FFAF ${
                ((value - 4) / (16 - 4)) * 100
              }%, #18171F ${((value - 4) / (16 - 4)) * 100}%)`,
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
              <p className="text-almost-white mr-4 text-xl font-bold">
                {strength}
              </p>
              <div className="flex">
                {[...Array(4)].map((_, i) => {
                  // Determine the color for the bar based on the strength level
                  let barColor = "border-2 border-almost-white"; // Default unhighlighted style
                  if (highlightedBars > 0) {
                    if (highlightedBars === 1)
                      barColor = i === 0 ? "bg-red" : barColor; // Only the first bar is red
                    if (highlightedBars === 2)
                      barColor = i < 2 ? "bg-orange" : barColor; // First two bars are orange
                    if (highlightedBars === 3)
                      barColor = i < 3 ? "bg-yellow" : barColor; // First three bars are yellow
                    if (highlightedBars === 4) barColor = "bg-neon-green"; // All bars are green
                  }

                  return (
                    <span
                      key={i}
                      className={`w-3 h-8 mr-2 block ${barColor}`}></span>
                  );
                })}
              </div>
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
