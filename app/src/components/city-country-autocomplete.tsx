import { useState, useRef, useCallback, useEffect } from "react"
import { citiesData, fuzzySearch } from "../data/cities"

interface CityCountryAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function CityCountryAutocomplete({
  value,
  onChange,
  placeholder = "City, Country",
  required = false,
  error,
}: CityCountryAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Debounce the input value for search (200ms)
  const debouncedInput = useDebounce(inputValue, 200)

  // Get suggestions based on debounced input
  const suggestions = debouncedInput.length >= 2 
    ? fuzzySearch(debouncedInput, citiesData)
    : []

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value)
  }, [value])

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
      const highlightedItem = listboxRef.current.children[highlightedIndex] as HTMLElement
      if (highlightedItem) {
        highlightedItem.scrollIntoView({ block: "nearest" })
      }
    }
  }, [highlightedIndex, isOpen])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange(newValue)
    setIsOpen(newValue.length >= 2)
    setHighlightedIndex(-1)
  }, [onChange])

  const handleSelect = useCallback((suggestion: string) => {
    setInputValue(suggestion)
    onChange(suggestion)
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }, [onChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      // Allow Enter to accept current value even without selection
      if (e.key === "Enter") {
        setIsOpen(false)
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0) {
          handleSelect(suggestions[highlightedIndex])
        } else {
          // Accept current input as manual entry
          setIsOpen(false)
        }
        break
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
      case "Tab":
        // Allow tab to move focus, but close dropdown
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
    }
  }, [isOpen, suggestions, highlightedIndex, handleSelect])

  const handleBlur = useCallback(() => {
    // Small delay to allow click on suggestion to work
    setTimeout(() => {
      setIsOpen(false)
      setHighlightedIndex(-1)
    }, 150)
  }, [])

  const inputId = "city-country-input"
  const listboxId = "city-country-listbox"

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => inputValue.length >= 2 && setIsOpen(true)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground/50"
        aria-autocomplete="list"
        aria-controls={isOpen ? listboxId : undefined}
        aria-expanded={isOpen}
        aria-activedescendant={
          isOpen && highlightedIndex >= 0 
            ? `${listboxId}-option-${highlightedIndex}` 
            : undefined
        }
        role="combobox"
        autoComplete="off"
      />
      
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-lg border border-border bg-card shadow-lg"
          aria-label="City and country suggestions"
        >
          {suggestions.map((suggestion, index) => {
            const isHighlighted = index === highlightedIndex
            const optionId = `${listboxId}-option-${index}`
            
            return (
              <li
                key={suggestion}
                id={optionId}
                role="option"
                aria-selected={isHighlighted}
                onClick={() => handleSelect(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`
                  px-4 py-2.5 cursor-pointer text-sm
                  transition-colors duration-150
                  ${isHighlighted 
                    ? "bg-accent/10 text-foreground" 
                    : "text-card-foreground hover:bg-muted"
                  }
                `}
              >
                {suggestion}
              </li>
            )
          })}
        </ul>
      )}

      {isOpen && debouncedInput.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 rounded-lg border border-border bg-card shadow-lg px-4 py-3 text-sm text-muted-foreground">
          No matches found. You can enter your location manually.
        </div>
      )}
    </div>
  )
}
