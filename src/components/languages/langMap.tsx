import { Link } from "react-router-dom";
import CountriesData from "./langlist";

interface Country {
  language: string;
  flag: string;
}

const CountryList: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg my-8 font-bold font-urbanist">
        Please select from the list of languages
      </h2>
      <div>
        {CountriesData.countries.map((country: Country, index: number) => (
          <Link
            to={`/info?language=${encodeURIComponent(country.language)}`}
            key={index}
          >
            <div className="flex items-center gap-6 py-2 px-12 border-2 hover:bg-slate-200 cursor-pointer">
              <span className="text-5xl"> {country.flag}</span>
              <span className="text-lg "> {country.language}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
