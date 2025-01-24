import { useState } from "react";
import GreenCopyIcon from "../assets/green-copy-icon.svg";
import WhiteCopyIcon from "../assets/white-copy-icon.svg";
import GreenArrow from "../assets/green-arrow.svg";
import BlackArrow from "../assets/black-arrow.svg";

const PasswordGenerator = () => {
  const [value, setValue] = useState<number>(4); // Length of password
  const [password, setPassword] = useState<string>(""); // Generated password
  const [strength, setStrength] = useState<string>(""); // Password strength label
  const [highlightedBars, setHighlightedBars] = useState<number>(0);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [copyPassword, setCopyPassword] = useState<boolean>(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value)); // Update password length based on the slider
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
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()";

    let mandatoryCharacters = ""; //  A randomly generated character
    let allCharacters = ""; // The pool of characters used to randomly generate the password.

    // Include characters based on selected checkboxes
    if (includeUppercase) {
      mandatoryCharacters +=
        uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]; // A randomly generated uppercase letter
      allCharacters += uppercaseLetters; // Ensures the password can include additional uppercase letters beyond the one guaranteed in mandatoryCharacters
    }
    if (includeLowercase) {
      mandatoryCharacters +=
        lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]; // A randomly generated lowercase letter
      allCharacters += lowercaseLetters;
    }
    if (includeNumbers) {
      mandatoryCharacters +=
        numbers[Math.floor(Math.random() * numbers.length)]; // A randomly generated number letter
      allCharacters += numbers;
    }
    if (includeSymbols) {
      mandatoryCharacters +=
        symbols[Math.floor(Math.random() * symbols.length)]; // A randomly generated symbol
      allCharacters += symbols;
    }

    // Use a default character set if no checkboxes are selected
    if (allCharacters === "") {
      allCharacters = uppercaseLetters + lowercaseLetters + numbers + symbols;
    }

    // Generate remaining characters to meet the password length
    let remainingCharacters = "";
    const remainingLength = Math.max(0, value - mandatoryCharacters.length);
    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      remainingCharacters += allCharacters[randomIndex];
    }

    // Combine mandatory and remaining characters, then shuffle
    let newPassword = (mandatoryCharacters + remainingCharacters)
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    // Update the password state
    setPassword(newPassword);
    updatePasswordStrength(value); // Update strength after password is generated
  };

  const copyDisplay = () => {
    setCopyPassword(true);
    navigator.clipboard.writeText(password);
    setTimeout(() => setCopyPassword(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generatePassword();
  };

  return (
    <div className="xl:w-1/3 lg:w-1/2 md:w-1/2 w-5/6">
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
              src={GreenCopyIcon}
              alt="Green copy icon"
              className="absolute bottom-3 right-4 w-4 cursor-pointer opacity-100 group-hover:opacity-0"
            />
            <img
              src={WhiteCopyIcon}
              alt="White copy icon"
              className="absolute bottom-3 right-4 w-4 cursor-pointer opacity-0 group-hover:opacity-100"
              onClick={copyDisplay}
            />
          </div>
          {copyPassword && (
            <span className="text-neon-green absolute bottom-2.5 right-12 text-sm">
              COPIED
            </span>
          )}
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
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
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
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
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
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="accent-neon-green h-4 w-4"
              />
              <span className="pl-4 text-almost-white">Include Numbers</span>
            </label>
          </div>

          <div className="mb-8">
            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
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
                src={BlackArrow}
                alt=""
              />
              <img
                className="absolute left-2/3 transform -translate-x-2/3 bottom-[1.4rem] opacity-0 group-hover:opacity-100"
                src={GreenArrow}
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
