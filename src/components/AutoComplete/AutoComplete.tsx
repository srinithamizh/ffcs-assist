import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import './Autocomplete.css';

interface IAutocomplete {
  suggestions: string[];
  placeholder: string;
  setValue: (value: string) => void;
}

const Autocomplete: React.FC<IAutocomplete> = ({
  suggestions,
  placeholder,
  setValue,
}) => {
  const [query, setQuery] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setValue(suggestion);
  };

  const handleOnBlur = () => {
    setValue(query.toUpperCase());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === 'ArrowUp') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === 'Enter') {
      if (
        activeSuggestionIndex >= 0 &&
        activeSuggestionIndex < filteredSuggestions.length
      ) {
        setQuery(filteredSuggestions[activeSuggestionIndex]);
        setValue(filteredSuggestions[activeSuggestionIndex]);
        setShowSuggestions(false);
      }
    }
  };

  return (
    <div className="autocomplete-container" ref={dropdownRef}>
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        onBlur={handleOnBlur}
        ref={inputRef}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="list-group autocomplete-dropdown">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`list-group-item ${
                index === activeSuggestionIndex ? 'active' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
