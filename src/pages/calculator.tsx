import { promises } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { join } from 'path';
import React, { ReactElement, useEffect, useState } from 'react';
import { Button } from '../components/Button';
//import { CatImage } from '../components/CatImage';
import { Country, RandomCat } from '../lib/Types.js';

type Props = Readonly<{
  countries: Array<Country>;
}>;


type NonEmpty<T extends string> = T extends "" ? never : T;
type IntegerPart = "0" | `${Exclude<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9", never>}${NonEmpty<`${number}`>}`;
type DecimalPart = `.${NonEmpty<`${number}`>}`;
type ValidNumberString = IntegerPart | `${IntegerPart}${DecimalPart}`;
function isValidNumberString(s: string): s is ValidNumberString {
  //return /^[1-9]\d*(\.\d+)?$|^0(\.\d+)?$/.test(s);
  return /^[1-9]\d*\.?(\d+)?$|^0\.?(\d+)?$/.test(s);
}

type OperatorStrings = "+" | "-" | "*" | "/" | "=";
function isValidOperatorString(s: string): s is OperatorStrings {
  return /^[\+\-\*\/\=]$/.test(s);
}

type CalculatorViewString = ValidNumberString | OperatorStrings | "C";


const IndexPage: NextPage<Props> = ({ countries }: Props): ReactElement => {
  const [display_string, set_display_string] = useState<CalculatorViewString>("0")

  const try_set_display_string = (new_string: string) => {
    if (isValidNumberString(new_string)) {
      set_display_string(new_string);
    } else {
      console.log("Invalid number string");
    }
  }
  const try_append_display_string = (new_string: string) => {
    const tying_string = display_string + new_string
    if (isValidNumberString(tying_string)) {
      set_display_string(tying_string);
    } else {
      console.log("Invalid number string");
    }
  }

  const numpad_onclick = (num_str: string) => () => {
    if (isValidOperatorString(display_string)){
      // TODO :: implement here // 

    } else if(isValidNumberString(display_string)){
      if (display_string === "0"){
        try_set_display_string(num_str);
      } else {
        try_append_display_string(num_str);
      }

    } else {
      // ??? //

    }
    return () => { }; // Do nothing
  }

  const create_button = (button_string: string) => {
    const helper_func = (color_class: string) => {
      return (<>
        <Button
          className={`py-2 ${color_class} text-white rounded border border-gray-200 cursor-pointer`}
          onClick={numpad_onclick(button_string)}
        >
          <span className="select-none text-xl">{button_string}</span>
        </Button>
      </>);
    }

    if (isValidNumberString(button_string)) {
      return helper_func("bg-cyan-600");
    } else if (isValidOperatorString(button_string)) {
      return helper_func("bg-green-600");
    } else { 
      return helper_func("bg-gray-600");
    }
  }

  return (
    <>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <div className="mx-auto">
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{display_string}</span>
          </div>

          {/* １列目 START */}
          <div className="grid grid-cols-10 gap-2">
            {create_button("0")}
            {create_button("1")}
            {create_button("2")}
            {create_button("3")}
            {create_button("4")}
            {create_button("5")}
            {create_button("6")}
            {create_button("7")}
            {create_button("8")}
            {create_button("9")}
          </div>
          {/* １列目 END */}

          {/* ２列目 START */}
          <div className="grid grid-cols-10 gap-2">
            {create_button(".")}
            {create_button("+")}
            {create_button("-")}
            {create_button("/")}
            {create_button("*")}
            {create_button("=")}
            {create_button(" ")}
            {create_button(" ")}
            {create_button(" ")}
            {create_button(" ")}
          </div>
          {/* ２列目 END */}

        </div>
      </div>

      {/* Calculator End */}
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buffer = await promises.readFile(join(process.cwd(), 'json', 'countries.json'));
  const str = buffer.toString();

  return {
    props: {
      countries: JSON.parse(str) as Array<Country>
    }
  };
};

// eslint-disable-next-line import/no-default-export
export default IndexPage;
