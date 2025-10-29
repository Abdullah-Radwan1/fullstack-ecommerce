"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type dropDownTypes = {
  country_code: string;
  setCountryCode: (value: string) => void; // Ensure this matches the setter function
};

const countryCodes = [
  { code: "20", flag: "🇪🇬 +20" },
  { code: "965", flag: "🇰🇼 +965" },
  { code: "971", flag: "🇦🇪 +971" },
  { code: "966", flag: "🇸🇦 +966" },
  // Add more codes and flags as needed
];

export function DropdownMenuRadioGroupDemo({
  country_code,
  setCountryCode,
}: dropDownTypes) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button name="phone" variant="outline">
          <p dir="ltr">
            {countryCodes.findLast((code) => country_code == code.code)?.flag ||
              "🇪🇬 +20"}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-center w-fit">
        <DropdownMenuRadioGroup
          value={country_code}
          onValueChange={setCountryCode} // Update state on change
        >
          {countryCodes.map((code) => (
            <DropdownMenuRadioItem key={code.code} value={code.code}>
              <div className="flex justify-between gap-4">{code.flag}</div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
