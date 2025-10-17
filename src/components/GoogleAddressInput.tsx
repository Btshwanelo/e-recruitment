import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface GoogleAddressInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  hasError?: boolean;
}

const GoogleAddressInput: React.FC<GoogleAddressInputProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = "Enter your street address",
  className = "",
  name,
  id,
  hasError = false,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  console.log("GoogleAddressInput - Field name:", name);
  console.log("GoogleAddressInput - Current field value:", value);

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (
        window.google &&
        window.google.maps &&
        window.google.maps.places &&
        inputRef.current
      ) {
        console.log("GoogleAddressInput - Creating autocomplete");

        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["address"],
            fields: ["formatted_address", "name", "place_id", "address_components"],
          }
        );

        // Method 1: Standard place_changed listener
        autocomplete.addListener("place_changed", () => {
          console.log("GoogleAddressInput - place_changed fired");
          handlePlaceSelect(autocomplete);
        });

        // Method 2: Direct Google Maps event listener
        window.google.maps.event.addListener(
          autocomplete,
          "place_changed",
          () => {
            console.log("GoogleAddressInput - Google Maps direct event fired");
            handlePlaceSelect(autocomplete);
          }
        );

        autocompleteRef.current = autocomplete;

        // Method 3: Listen for keydown events to detect when user presses Enter
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Enter") {
            console.log(
              "GoogleAddressInput - Enter key pressed, checking for place"
            );
            setTimeout(() => {
              handlePlaceSelect(autocomplete);
            }, 100);
          }
        };

        inputRef.current.addEventListener("keydown", handleKeyDown);

        // Method 4: Listen for blur events after a short delay
        const handleInputBlur = () => {
          console.log("GoogleAddressInput - Input blur detected");
          setTimeout(() => {
            handlePlaceSelect(autocomplete);
          }, 200);
        };

        inputRef.current.addEventListener("blur", handleInputBlur);

        return () => {
          console.log("GoogleAddressInput - Cleanup");
          if (autocompleteRef.current) {
            window.google.maps.event.clearInstanceListeners(
              autocompleteRef.current
            );
          }
          if (inputRef.current) {
            inputRef.current.removeEventListener("keydown", handleKeyDown);
            inputRef.current.removeEventListener("blur", handleInputBlur);
          }
        };
      }
    };

    // Wait for Google Maps to be available
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        initializeAutocomplete();
      } else {
        // Retry after a short delay
        setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const handlePlaceSelect = (autocomplete: google.maps.places.Autocomplete) => {
    try {
      const place = autocomplete.getPlace();
      console.log("GoogleAddressInput - Place object:", place);
      console.log("GoogleAddressInput - Place keys:", Object.keys(place || {}));

      if (place && (place.formatted_address || place.name)) {
        const address = place.formatted_address || place.name;
        console.log("GoogleAddressInput - Using address:", address);

        onChange(address);
        console.log("GoogleAddressInput - Field updated successfully");
        
        // Optional: You can also extract additional address components here
        if (place.address_components) {
          console.log("GoogleAddressInput - Address components:", place.address_components);
          // You could potentially update city, postal code, etc. here if needed
        }
      } else {
        console.log("GoogleAddressInput - No usable address found");
      }
    } catch (error) {
      console.error("GoogleAddressInput - Error getting place:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("GoogleAddressInput - Manual change:", e.target.value);
    onChange(e.target.value);
  };

  const handleBlur = () => {
    console.log("GoogleAddressInput - Manual blur");
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <Input
      ref={inputRef}
      name={name}
      id={id}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      type="text"
      placeholder={placeholder}
      className={`w-full placeholder:text-xs ${hasError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#0086C9]"} ${className}`}
      {...props}
    />
  );
};

export default GoogleAddressInput;
