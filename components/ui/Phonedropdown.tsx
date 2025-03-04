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
  { code: "973", flag: "🇧🇭 +973" },
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
        <Button variant="outline">
          <p dir="ltr">
            {countryCodes.findLast((code) => country_code == code.code)?.flag ||
              "🇧🇭 +973"}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-center w-fit">
        {/* <DropdownMenuLabel>
     {lang === "ar" ? "رمز البلد" : "Country Code"}
    </DropdownMenuLabel>
    <DropdownMenuSeparator /> */}
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
import { dir } from "console";
