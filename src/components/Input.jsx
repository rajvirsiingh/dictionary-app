import { useState } from "react";
import axios from "axios";
export default function Input() {
  const [word, setWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [wordObject, setWordObject] = useState([]);
  function handleChange(e) {
    console.log(e.target.value);
    setWord(e.target.value);
  }

  async function handleSearch() {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setWordObject(res.data[0]);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }
  const meaning = wordObject.meanings?.map((meaning) => {
    return (
      <div className="meaning" key={meaning.partOfSpeech}>
        <h3 className="partOfSpeech">{meaning.partOfSpeech}</h3>
        <ol>
          {meaning.definitions.map((def) => {
            return (
              <>
                <li className="def" key={def.definition}>
                  {def.definition}
                </li>
                <ul>
                  {def.example && (
                    <li className="example" key={def.example}>
                      <span>example:</span> {def.example}
                    </li>
                  )}
                </ul>
              </>
            );
          })}
        </ol>
        {meaning.synonyms.length > 0 ? (
          <p className="synonyms">
            <span>synonyms:</span> {meaning.synonyms.join(", ")}
          </p>
        ) : null}
        {meaning.antonyms.length > 0 ? (
          <p className="synonyms">
            <span>antonyms:</span> {meaning.antonyms.join(", ")}
          </p>
        ) : null}
      </div>
    );
  });
  return (
    <main className="dictionary">
      <form>
        <input
          type="text"
          placeholder="Type here"
          value={word}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={(e) => {
            handleSearch();
            e.preventDefault();
          }}
        >
          search
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <h2 className="word">{wordObject.word.toUpperCase()}</h2>
      <p className="phonetic">{wordObject.phonetic}</p>
      {meaning}
    </main>
  );
}
