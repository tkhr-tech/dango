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
  //return /^[1-9]\d*\.?(\d+)?$|^0\.?(\d+)?$/.test(s);
  //return /^[1-9]\d*\.?(\d+)?$|^0\.(\d+)?$|^0$/.test(s);
  return /^-?[1-9]\d*\.?(\d+)?$|^-?0\.(\d+)?$|^0$/.test(s);
}
// function isValidNumberString(s: string): s is ValidNumberString {
//   const num = Number(s);
//   return !Number.isNaN(num);
// }

type OperatorStrings = "+" | "-" | "*" | "/";
function isValidOperatorString(s: string): s is OperatorStrings {
  return /^[\+\-\*\/]$/.test(s);
}

type CalculatorViewString = ValidNumberString | OperatorStrings | "C" | "=";


const IndexPage: NextPage<Props> = ({ countries }: Props): ReactElement => {
  const [display_string, set_display_string] = useState<CalculatorViewString>("0")
  const [flag_eq_repeat, set_flag_eq_repeat] = useState<boolean>(false);
  const [flag_new_input, set_flag_new_input] = useState<boolean>(true);
  const [operand_lft, set_operand_lft] = useState<number | null>(null);
  const [operand_rgt, set_operand_rgt] = useState<number | null>(null);
  const [operator, set_operator] = useState<OperatorStrings | null>(null);

  const try_set_display_string = (new_string: string): boolean => {
    if (isValidNumberString(new_string)) {
      set_display_string(new_string);
      return true;
    } else {
      console.log("Invalid number string");
      return false;
    }
  };
  const try_append_display_string = (new_string: string): boolean => {
    const tying_string = display_string + new_string
    if (isValidNumberString(tying_string)) {
      set_display_string(tying_string);
      return true;
    } else {
      console.log("Invalid number string");
      return false;
    }
  };

  const do_calculation = (operand: number|null) => {
    const operand1 = operand_lft;
    const operand2 = operand || operand_rgt;
    
    set_operand_rgt(operand2);

    console.log("Do calculation");
    console.log(operand1);
    console.log(operand2);
    console.log(operator);

    const helper_func = (num: number) => {
      set_operand_lft(num);
      try_set_display_string(num.toString());
    }

    if (operand1 === null || operand2 === null || operator === null) {
      console.log("Invalid calculation");
      return;
    } else {
      if (operator === "+") {
        helper_func(operand1 + operand2);
      } else if (operator === "-") {
        helper_func(operand1 - operand2);
      } else if (operator === "*") {
        helper_func(operand1 * operand2);
      } else if (operator === "/") {
        helper_func(operand1 / operand2);
      } else {
        console.log("Invalid operator");
        return;
      }
    }
  }

  const numpad_onclick = (button_str: string) => () => {
    if (button_str === "C"){
      // Clear
      try_set_display_string("0");
      set_flag_eq_repeat(false);
      set_flag_new_input(true);
      set_operand_lft(null);
      set_operand_rgt(null);
      set_operator(null);

    } else if (button_str === "="){

      const display_number = parseFloat(display_string);
      if(flag_eq_repeat){
        do_calculation(null);
      } else {
        do_calculation(display_number);
      }
      set_flag_eq_repeat(true);
      set_flag_new_input(true);

    } else if(isValidOperatorString(button_str)){
      // Operator 

      const display_number = parseFloat(display_string);

      if (operand_lft === null) {
        set_operand_lft(display_number);
        set_operator(button_str);
        set_flag_new_input(true);
      } else if (!flag_new_input) {
        do_calculation(display_number);
        set_operator(button_str);
        set_flag_new_input(true);
      } else {
        set_operand_rgt(display_number)
        set_operator(button_str);
        set_flag_new_input(true);
      } 

    } else if(isValidNumberString(button_str) || button_str === "."){

      if(flag_new_input){
        if(try_set_display_string(button_str)){
          // OK
          set_operand_rgt(null);
        }
        set_flag_new_input(false);
      } else {

        if( try_append_display_string(button_str) ){
          // OK 
          set_operand_rgt(null);
        } else {
          if (display_string === "0") {
            if(try_set_display_string(button_str)){
              // OK
              set_operand_rgt(null);
            }
          } else {
            // たぶん、不正な操作
          }
        }
      }

      set_flag_eq_repeat(false);
    }

    return (_: any) => { 
      console.log("Do nothing"); // Do nothing
    }; 
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

    if (isValidNumberString(button_string) || button_string === ".") {
      return helper_func("bg-cyan-600");
    } else if (isValidOperatorString(button_string) || button_string === "=") {
      return helper_func("bg-green-600");
    } else if (button_string === "C") { 
      return helper_func("bg-pink-600");
    } else {
      return helper_func("bg-gray-600");
    }
  }

  const keybord_table = [
    ["7", "8", "9", "+"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "*"],
    [".", "0", "=", "/"],
    ["C", " ", " ", " "]
  ];

  const keybord_render = keybord_table.map((row, index1) => {
    return (
        <div key={index1} className={`grid grid-cols-${row.length} gap-2`}>
          {row.map((button_string, index2) => {
            return (<React.Fragment key={`${index1}-${index2}`}>
              {create_button(button_string)}
              </React.Fragment>
            );
          })}
        </div>
      );
  });

  return (
    <>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <div className="mx-auto">
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{operand_lft || "___"}</span>
          </div>
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{operator || "___"}</span>
          </div>
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{operand_rgt || "___"}</span>
          </div>
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{flag_eq_repeat ? "eq_repating" : "___"}</span>
          </div>
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{flag_new_input ? "new_input" : "___"}</span>
          </div>
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{display_string}</span>
          </div>
          {keybord_render}
        </div>
      </div>
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
