import { useEffect, useState } from "react";
import CountriesData from "../components/languages/langlist";// Update the path accordingly

export default function Testing() {
  const [language, setLanguage] = useState<string | null>(null);
  const [isoCode, setIsoCode] = useState<string | null>(null);

  useEffect(() => {
    // Assuming you have the language value set elsewhere
    const languageToSearch = "malay"; // Change this to the language you want to search for
    setLanguage(languageToSearch);
  }, []);

  useEffect(() => {
    if (language) {
      const country = CountriesData.countries.find(
        (country) => country.language === language
      );
      if (country) {
        setIsoCode(country.iso);
      } else {
        setIsoCode(null);
      }
    }
  }, [language]);

  return (
    <div>
      <p>Language: {language}</p>
      <p>ISO Code: {isoCode}</p>
    </div>
  );
}
