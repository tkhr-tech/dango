import { promises } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { join } from 'path';
import React, { ReactElement, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { CatImage } from '../components/CatImage';
import { Country, RandomCat } from '../lib/Types.js';

type Props = Readonly<{
  countries: Array<Country>;
}>;

const IndexPage: NextPage<Props> = ({ countries }: Props): ReactElement => {
  const [lft_hand_operand, set_lft_hand_operand] = useState<number>(0);
  const [rgt_hand_operand, set_rgt_hand_operand] = useState<number>(0);
  const [flag_decimal_point, set_flag_decimal_point] = useState<boolean>(false);
  const [float_point, set_float_point] = useState<number>(1);
  const [operator, set_op] = useState<string>('+');

  const [labourHours, setLabourHours] = useState<string>('0');
  const [catImage, setCatImage] = useState<null | RandomCat>(null);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search').then(async (res: Response) => {
      const json: Array<RandomCat> = await res.json() as Array<RandomCat>;

      setCatImage(json[0]!);
    });
  }, []);

  return (
    <>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <div className="mx-auto">
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{rgt_hand_operand}</span>
          </div>

          {/* １列目 */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                const button_num = 1;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">1</span>
            </Button>

            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                const button_num = 2;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">2</span>
            </Button>

            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                const button_num = 3;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">3</span>
            </Button>
            
            <Button
              className="py-2 bg-pink-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                set_rgt_hand_operand(rgt_hand_operand*10 + 3);
              }}
            >
              <span className="select-none text-xl">/</span>
            </Button>
          </div>

          {/* ２列目 */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                const button_num = 4;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">4</span>

            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                const button_num = 5;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">5</span>
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                const button_num = 6;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">6</span>
            </Button>
            
            <Button
              className="py-2 bg-pink-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                set_rgt_hand_operand(rgt_hand_operand*10 + 1);
              }}
            >
              <span className="select-none text-xl">*</span>
            </Button>
          </div>

          {/* ３列目 */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                const button_num = 7;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">7</span>
            </Button>

            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                const button_num = 8;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">8</span>
            </Button>

            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {

                console.log(rgt_hand_operand);

                const button_num = 9;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">9</span>
            </Button>
            
            <Button
              className="py-2 bg-pink-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);
              }}
            >
              <span className="select-none text-xl">-</span>
            </Button>
          </div>

          {/* ４列目 */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                set_decimal_point(true);
                set_float_point(0.1);
              }}
            >
              <span className="select-none text-xl">.</span>

            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                const button_num = 0;
                if(decimal_point){
                  set_rgt_hand_operand(rgt_hand_operand + float_point*button_num);
                  set_float_point(float_point/10);
                } else {
                  set_rgt_hand_operand(rgt_hand_operand*10 + button_num);
                }
              }}
            >
              <span className="select-none text-xl">0</span>
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {

              }}
            >
              <span className="select-none text-xl">=</span>
            </Button>
            
            <Button
              className="py-2 bg-pink-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {

              }}
            >
              <span className="select-none text-xl">+</span>
            </Button>
          </div>

          {/* ５列目 */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              className="py-2 bg-green-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(rgt_hand_operand);

                set_lft_hand_operand(0);
                set_rgt_hand_operand(0);
                set_op('+');
              }}
            >
              <span className="select-none text-xl">C</span>
            </Button>

          </div>

        </div>
      </div>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <div className="mx-auto">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-800 text-lg">勤務開始時間</span>
            <span className="text-gray-800 text-lg">勤務終了時間</span>
            <span className="text-gray-800 text-lg">労働時間</span>
            <input
              className="py-2 px-3 border-2 rounded border-gray-200 cursor-text"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value);

                setLabourHours(e.target.value);
              }}
            />
            <input
              className="py-2 px-3 border-2 rounded border-gray-200 cursor-text"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value);

                setLabourHours(e.target.value);
              }}
            />
            <span className="select-none text-xl font-mono text-gray-700 text-right">{labourHours}</span>
          </div>
        </div>
      </div>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <ul className="list-none">
          {countries.map((country: Country) => {
            return (
              <li key={country.alpha2} className="text-gray-800 even:bg-teal-100 text-lg">
                <div className="my-1">{country.jpnName}</div>
                <div className="my-1">{country.engName}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        フォームで使いそうなもの
        <ul className="list-none">
          <li className="text-gray-800 even:bg-teal-100 text-lg">
            <input
              className="py-2 px-3 border-2 rounded border-gray-200 cursor-text"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value);

                setLabourHours(e.target.value);
              }}
              placeholder="テキストボックスです"
            />
          </li>
          <li>
            <select
              className="cursor-pointer border rounded py-3 px-4"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                console.log(e.target.value);
              }}
              value={0}
            >
              <option value={0}>選択してください</option>
              <option value={1}>選択肢1</option>
              <option value={2}>選択肢2</option>
              <option value={3}>選択肢3</option>
            </select>
          </li>
        </ul>
      </div>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <CatImage cat={catImage} />
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
