'use client';

import Link from 'next/link';
import React, { Suspense, useRef, useState } from 'react';
import { Canvg, presets } from 'canvg';
import { redirect } from 'next/navigation';
import CryptoJS from 'crypto-js';
import {
  ArrowDownIcon,
  CaretSortIcon,
  CrossCircledIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import { RandomfaceSVG } from 'randomface-react';
import { Input } from '@/components/ui/input';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  type FileReaderChunked,
  readFileСhunked,
} from '@/lib/read-file-chunked';
import { type Colors, ColorSelector } from '@/components/color-selector';
import { useSearchParams } from 'next/navigation';

async function sha256FromText(str: string): Promise<string> {
  const buffer = new TextEncoder().encode(str);
  return crypto.subtle.digest('SHA-256', buffer).then(function (hash) {
    return hex(hash);
  });
}

async function sha256FromBase64(base64str: string): Promise<string> {
  const binaryData = Buffer.from(base64str, 'base64');

  return crypto.subtle.digest('SHA-256', binaryData).then(function (hash) {
    return hex(hash);
  });
}

function hex(buffer: ArrayBuffer): string {
  let digest = '';
  const view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    const value = view.getUint32(i);
    const stringValue = value.toString(16);
    const padding = '00000000';
    const paddedValue = (padding + stringValue).slice(-padding.length);
    digest += paddedValue;
  }

  return digest;
}

enum Head {
  None = 'None',
  Cat = 'Cat',
  Circle = 'Circle',
}

interface FaceCustomization {
  head: Head;
  colors: Colors;
  fill: boolean;
}

const sha256HexRegex = /^[a-fA-F0-9]{64}$/;
const base64Regex =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}={0,2}|[A-Za-z0-9+/]{3}=?)?$/;

export default function Home() {
  return (
    <div className='relative grid md:grid-cols-[4fr_6fr] gap-6 w-full'>
      <Description />
      <Suspense>
        <Generator />
      </Suspense>
    </div>
  );
}

function Generator() {
  const searchParams = useSearchParams();
  const hashParam = searchParams.get('hash');
  const hashParamValid =
    hashParam != undefined && sha256HexRegex.test(hashParam);

  const [hash, setHash] = useState(
    hashParamValid
      ? hashParam
      : 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  );

  const [faceCustomization, setFaceCustomization] = useState<FaceCustomization>(
    {
      head: Head.None,
      colors: { foreground: '#000000', background: '#ffffff' },
      fill: true,
    }
  );

  if (hashParam != undefined && !hashParamValid) {
    redirect('/');
  }

  return (
    <div className='relative grid md:grid-cols-2 gap-6 w-full'>
      <DataInput
        hashParam={hashParamValid ? hashParam : undefined}
        callback={setHash}
        faceCustomization={faceCustomization}
        setFaceCustomization={setFaceCustomization}
      />
      <Face hash={hash} faceCustomization={faceCustomization} />
    </div>
  );
}

function Description() {
  return (
    <div className='md:mr-8 space-y-3'>
      <h2 className='font-semibold text-sm'>About</h2>
      <div className='text-sm'>
        <p>
          Randomface is a JS/React package for generating vector face-like
          figures from SHA-256 hash.
        </p>
      </div>
      <Accordion type='single' collapsible className=''>
        <AccordionItem value='why'>
          <AccordionTrigger className='text-sm font-semibold'>
            Why?
          </AccordionTrigger>
          <AccordionContent className='space-y-2'>
            <p>
              {`Although various random face/avatar generators have existed for a
              long time, none of them provide genuine randomness in face
              generation. Many rely on pre-defined images of facial features
              combined with repetitive patterns, which diminishes the uniqueness
              and individuality of generated faces.`}
            </p>
            <p>
              {`Randomface takes a different approach by keeping only the
              positions of facial features fixed while randomizing everything
              else. This results in a wide range of simple abstract
              facial expressions, making each face unique and easily
              distinguishable even in large groups.`}
            </p>
            <p>
              {`And it is lightweight - it
              doesn't have any external dependencies and outputs plain SVG.
              The only requirement is a SHA-256 hash for a face input, which
              should not be a problem to obtain on any modern platform.`}
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='how-works'>
          <AccordionTrigger className='text-sm font-semibold'>
            How it works?
          </AccordionTrigger>
          <AccordionContent className='space-y-2'>
            <p>
              The data is hashed using SHA-256 algorithm. The resulting hash, in
              decimal form, is split into pairs of two-digit numbers. These
              pairs are then plotted on a 100x100 square to form parts of the
              face.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='howto-use'>
          <AccordionTrigger className='text-sm font-semibold'>
            How to use it?
          </AccordionTrigger>
          <AccordionContent className='space-y-2'>
            <p>
              Refer to{' '}
              <Link
                href='https://github.com/lefelys/randomface/tree/main/packages/randomface#randomface'
                target='_blank'
                className='underline decoration-dotted decoration-muted-foreground'
              >
                JS/TS
              </Link>{' '}
              and{' '}
              <Link
                href='https://github.com/lefelys/randomface/tree/main/packages/randomface-react#randomface'
                target='_blank'
                className='underline decoration-dotted decoration-muted-foreground'
              >
                React
              </Link>{' '}
              packages documentation
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='whereto-use'>
          <AccordionTrigger className='text-sm font-semibold'>
            Where to use it?
          </AccordionTrigger>
          <AccordionContent className='space-y-2'>
            <p>
              Besides obvious use case of a random avatar generator, randomface
              was actually created as a variation of{' '}
              <Link
                href='https://en.wikipedia.org/wiki/Chernoff_face'
                target='_blank'
                className='underline decoration-dotted decoration-muted-foreground'
              >
                Chernoff face
              </Link>{' '}
              implementation.
            </p>
            <p>
              Our brains are exceptionally proficient in recognizing faces, yet
              the same aptitude does not apply when it comes to processing
              textual data. Verifying checksums, cryptographic keys,
              cryptocurrency addresses, UUIDs, bank accounts, etc., through
              visual inspection is cognitively demanding and prone to errors.
            </p>
            <p>
              By giving the data a face, we can leverage the innate and
              effective process of facial recognition (enchanced with emotion
              detection) to handle visual verification tasks.
            </p>
            <p>
              Check example in{' '}
              <Link
                target='_blank'
                href='https://github.com/lefelys/randomface?tab=readme-ov-file#where-to-use-it'
                className='underline decoration-dotted decoration-muted-foreground'
              >
                documentation
              </Link>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

enum InputType {
  Text = 'Text',
  File = 'File',
  Base64 = 'Base64',
  SHA256HEX = 'SHA-256 (hex)',
  SHA256Base64 = 'SHA-256 (base64)',
}

interface DataInputProps {
  hashParam?: string;
  callback: (data: any) => void;
  faceCustomization: FaceCustomization;
  setFaceCustomization: (
    f: (prevState: FaceCustomization) => FaceCustomization
  ) => void;
}

interface DataInputInputs {
  text?: string;
  filename?: string;
  base64?: string;
  sha256Hex?: string;
  sha256Base64?: string;
}

function DataInput({
  hashParam,
  callback,
  faceCustomization,
  setFaceCustomization,
}: DataInputProps) {
  const [inputs, setInputs] = useState<DataInputInputs>({
    text: '',
    filename: '',
    base64: '',
    sha256Hex: hashParam,
    sha256Base64: '',
  });

  const [openInputType, setOpenInputType] = useState(false);
  const [inputType, setInputType] = useState<InputType>(
    hashParam != undefined ? InputType.SHA256HEX : InputType.Text
  );
  const [fileReader, setFileReader] = useState<FileReaderChunked | undefined>(
    undefined
  );
  const [fileProgress, setFileProgress] = useState({
    active: false,
    progress: 0,
  });
  const [inputError, setInputError] = useState('');
  const [customizeIsOpen, setCustomizeIsOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className='space-y-3'>
      <div className='flex w-full items-center relative'>
        <h2 className='font-semibold text-sm px-1'>Input</h2>
        <div className='absolute right-0 flex'>
          <Select
            open={openInputType}
            onOpenChange={setOpenInputType}
            onValueChange={(value) => {
              setInputType(value as InputType);
              setOpenInputType(false);
              // setInputs({}); ???
              setInputError('');
            }}
          >
            <SelectTrigger className='w-[190px] border-none justify-end h-5 p-1 space-x-1 text-primary underline-offset-4 hover:underline focus:ring-0 focus-visible:ring-0 focus-visible:underline bone shadow-none'>
              <SelectValue
                className='font-medium text-sm '
                placeholder={inputType}
              />
            </SelectTrigger>
            <SelectContent
              onCloseAutoFocus={(e) => {
                // if (inputRef.current != null) {
                //   inputRef.current.value = '';
                // } ???
                e.preventDefault();
                setTimeout(() => {
                  if (inputRef.current != null) {
                    inputRef.current.focus();
                  }
                }, 10);
              }}
            >
              {Object.values(InputType).map((t) => (
                <SelectItem
                  className='text-xs'
                  key={t}
                  value={t}
                  onSelect={() => {
                    setInputType(t);
                    setOpenInputType(false);
                    setInputError('');
                  }}
                >
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {inputType == InputType.File ? (
        <div className='h-[5rem] md:h-[200px] flex items-center justify-center border bg-muted rounded-md'>
          <Input
            id='file'
            name='file'
            type='file'
            value=''
            className='hidden'
            onChange={(e) => {
              if (e.target.files != null && e.target.files.length > 0) {
                const SHA256 = CryptoJS.algo.SHA256.create();
                const fileReaderChunked = readFileСhunked(
                  e.target.files[0],
                  (chunk, progress) => {
                    const wordBuffer = CryptoJS.lib.WordArray.create(chunk);
                    SHA256.update(wordBuffer);
                    setFileProgress({ active: true, progress });
                  },
                  (error) => {
                    setInputError('File input error');
                    console.log(error);
                  },
                  () => {
                    setFileProgress({ active: false, progress: 0 });
                    callback(SHA256.finalize().toString());
                  }
                );
                setFileReader(fileReaderChunked);
                fileReaderChunked.start();
                setInputs({ filename: e.target.files[0].name });
              } else {
                sha256FromText('').then(
                  (data) => {
                    callback(data);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
                setInputs({});
                setInputError('');
              }
            }}
          />
          <label
            className='h-[3rem] md:h-[200px] text-sm flex items-center justify-center space-x-1 w-full'
            htmlFor='file'
          >
            {inputs.filename != undefined && inputs.filename != '' ? (
              <div>
                <div className='flex items-center justify-center'>
                  <p className='text-ellipsis overflow-hidden truncate'>
                    {inputs.filename.length > 25
                      ? `${inputs.filename.slice(
                          0,
                          10
                        )}...${inputs.filename.slice(
                          inputs.filename.length - 10
                        )}`
                      : inputs.filename}
                  </p>
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={(e) => {
                      e.preventDefault();
                      if (fileReader != undefined) {
                        fileReader.abort();
                      }
                      sha256FromText('').then(
                        (data) => {
                          callback(data);
                        },
                        (error) => {
                          console.log(error);
                        }
                      );
                      setInputs({});
                      setInputError('');
                    }}
                  >
                    <CrossCircledIcon />
                  </Button>
                </div>
                <div className='h-2'>
                  {fileProgress.active ? (
                    <Progress value={fileProgress.progress} />
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <UploadIcon />
                <p>Choose file</p>
              </>
            )}
          </label>
        </div>
      ) : inputType == InputType.Base64 ? (
        <Textarea
          key='inputBase64'
          ref={inputRef}
          className={cn(
            'h-[3rem] md:h-[200px] ',
            inputError != '' &&
              'bg-red-50 dark:bg-red-950 focus-visible:ring-red-600'
          )}
          placeholder='Base64 encoded data'
          onChange={(e) => {
            setInputs({ base64: e.target.value });
            if (!base64Regex.test(e.target.value)) {
              setInputError('Invalid base64');
              return;
            }

            setInputError('');

            sha256FromBase64(e.target.value).then(
              (data) => {
                callback(data);
              },
              (error) => {
                console.log(error);
              }
            );
          }}
          value={inputs.base64}
        />
      ) : inputType == InputType.SHA256HEX ? (
        <div className='flex items-center justify-center border bg-muted rounded-md h-[200px]'>
          <Textarea
            key='inputSHA256HEX'
            ref={inputRef}
            className={cn(
              'h-[9rem] w-[95px] p-2 overflow-hidden leading-4 tracking-wider resize-none bg-background font-mono',
              inputError != '' &&
                'bg-red-50 dark:bg-red-950 focus-visible:ring-red-600'
            )}
            placeholder='e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
            onChange={(e) => {
              setInputs({ sha256Hex: e.target.value });
              if (!sha256HexRegex.test(e.target.value)) {
                setInputError('Invalid SHA-256 hash');
                return;
              }

              setInputError('');
              callback(e.target.value);
            }}
            value={inputs.sha256Hex}
          />
        </div>
      ) : inputType == InputType.SHA256Base64 ? (
        <div className='flex items-center justify-center border bg-muted rounded-md h-[200px]'>
          <Textarea
            key='inputSHA256Base64'
            ref={inputRef}
            className={cn(
              'h-[5rem] w-[123px] p-2 overflow-hidden leading-4 tracking-wider resize-none bg-background font-mono',
              inputError != '' &&
                'bg-red-50 dark:bg-red-950 focus-visible:ring-red-600' //
            )}
            placeholder='47DEQpj8HBSa42TImW+5JCeuQeRkm5NMpJWZG3hSuFU='
            onChange={(e) => {
              setInputs({
                sha256Base64: e.target.value,
              });
              if (
                !base64Regex.test(e.target.value) ||
                Buffer.from(e.target.value, 'base64').toString('hex').length !=
                  64
              ) {
                setInputError('Invalid SHA-256 hash');
                return;
              }

              setInputError('');
              callback(Buffer.from(e.target.value, 'base64').toString('hex'));
            }}
            value={inputs.sha256Base64}
          />
        </div>
      ) : (
        <Textarea
          key='inputText'
          ref={inputRef}
          className='h-[100px] md:h-[200px] '
          placeholder='Type your data here.'
          onChange={(e) => {
            setInputs({ text: e.target.value });
            sha256FromText(e.target.value).then(
              (data) => {
                callback(data);
              },
              (error) => {
                console.log(error);
              }
            );
          }}
          value={inputs.text}
        />
      )}

      <div className='flex items-center w-full'>
        <Collapsible
          open={customizeIsOpen}
          onOpenChange={setCustomizeIsOpen}
          className=' space-y-2 w-full'
        >
          <div className='flex items-center justify-between space-x-4 w-full'>
            <CollapsibleTrigger asChild>
              <Button
                variant='link'
                className='space-x-2 font-medium text-sm p-1 h-5'
              >
                <span>Customize</span>
                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </CollapsibleTrigger>
            <p className='ml-auto text-sm text-red-600'>{inputError}</p>
          </div>
          <CollapsibleContent className='space-y-5 p-1'>
            <table>
              <tbody>
                <tr>
                  <td className='pr-10 py-2'>
                    <p className='text-xs w-15'>Fill</p>
                  </td>
                  <td className='py-2'>
                    <div className='flex items-center h-5'>
                      <Checkbox
                        id='terms'
                        checked={faceCustomization.fill}
                        onCheckedChange={(v) => {
                          setFaceCustomization(
                            (prevState): FaceCustomization => {
                              return {
                                ...prevState,
                                fill: v == true,
                              };
                            }
                          );
                        }}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='py-2'>
                    <p className='text-xs'>Head</p>
                  </td>
                  <td className='py-2'>
                    <Select
                      value={String(faceCustomization.head)}
                      onValueChange={(v) => {
                        setFaceCustomization((prevState): FaceCustomization => {
                          return {
                            ...prevState,
                            head: v as Head,
                          };
                        });
                      }}
                    >
                      <SelectTrigger className='w-[8rem] text-xs'>
                        <SelectValue placeholder='Select a head' />
                      </SelectTrigger>
                      <SelectContent className='' position='popper'>
                        <SelectGroup className=''>
                          {Object.keys(Head).map((h) => (
                            <SelectItem className='text-xs' value={h} key={h}>
                              {h}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className='py-2'>
                    <p className='text-xs'>Colors</p>
                  </td>
                  <td className='py-2'>
                    <div className='max-w-[300px]'>
                      <ColorSelector
                        callback={(colors) => {
                          setFaceCustomization(
                            (prevState): FaceCustomization => {
                              return {
                                ...prevState,
                                colors,
                              };
                            }
                          );
                        }}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

interface FaceProps {
  hash: string;
  faceCustomization: FaceCustomization;
}

function Face({ hash, faceCustomization }: FaceProps) {
  const [permalinkButtonCopied, setPermalinkButtonCopied] = useState(false);
  const [hashButtonCopied, setHashButtonCopied] = useState(false);

  return (
    <div className='space-y-3  md:'>
      <div className='flex items-center w-full'>
        <h2 className='font-semibold text-sm px-1'>Your face</h2>
        <p className='ml-auto font-mono text-xs text-muted-foreground px-1'>
          v0.1.0
        </p>
      </div>
      <div
        className='flex items-center justify-center w-full h-[150px] md:h-[200px] border bashed rounded-md '
        style={{ backgroundColor: faceCustomization.colors.background }}
      >
        <div className='h-[150px] w-[150px] flex items-center justify-center'>
          <svg
            width={140}
            height={140}
            style={{
              fill: faceCustomization.fill
                ? faceCustomization.colors.foreground
                : 'none',
              stroke: faceCustomization.colors.foreground,
            }}
            viewBox='0 0 140 140'
            preserveAspectRatio='xMinYMin meet'
            id='your-face'
          >
            <RandomfaceSVG
              sha256hash={hash}
              x='20'
              y='20'
              width={100}
              height={100}
              style={{
                fill: faceCustomization.fill
                  ? faceCustomization.colors.foreground
                  : 'none',
                stroke: faceCustomization.colors.foreground,
              }}
            />
            {faceCustomization.head == Head.Cat && (
              <svg
                viewBox='-2 -2 140 140'
                width={140}
                height={140}
                fill='transparent'
                strokeLinejoin='round'
                strokeLinecap='round'
                strokeWidth='4'
              >
                <path d='M 1 1 L 1 119 L 100 119 L 100 1 L 80 20 L 20 20 Z' />
              </svg>
            )}
            {faceCustomization.head == Head.Circle && (
              <svg
                viewBox='-2 -2 140 140'
                width={140}
                height={140}
                fill='transparent'
                strokeLinejoin='round'
                strokeLinecap='round'
                strokeWidth='4'
              >
                <circle cx='55' cy='70' r='55' />
              </svg>
            )}
          </svg>
        </div>
      </div>
      <div className='flex items-center  w-full'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='link'
              className='space-x-2 font-medium text-sm p-1 h-5'
            >
              <span>Export</span>
              <ArrowDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className='text-xs'
                onClick={() => {
                  const element = document.getElementById('your-face');
                  if (!element) {
                    return;
                  }
                  void SVG2PNG(element, function (canvas) {
                    canvas.convertToBlob().then(
                      (b) => {
                        generateLink(
                          `randomface-${hash.slice(0, 7)}.png`,
                          URL.createObjectURL(b)
                        ).click();
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
                  });
                }}
              >
                PNG
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-xs'
                onClick={() => {
                  const element = document.getElementById('your-face');
                  if (!element) {
                    return;
                  }
                  const serializer = new XMLSerializer();
                  let source = serializer.serializeToString(element);
                  source = `<?xml version="1.0" standalone="no"?>\r\n${source}`;
                  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                    source
                  )}`;

                  generateLink(
                    `randomface-${hash.slice(0, 7)}.svg`,
                    url
                  ).click();
                }}
              >
                SVG
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-xs'
              onClick={(e) => {
                e.preventDefault();
                void navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_HOST ?? ''}/?hash=${hash}`
                );
                setPermalinkButtonCopied(true);

                setTimeout(() => {
                  setPermalinkButtonCopied(false);
                }, 2000);
              }}
            >
              {permalinkButtonCopied ? 'Copied' : 'Copy Permalink'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant='ghost'
          title='Copy SHA-256 hash'
          onClick={() => {
            void navigator.clipboard.writeText(hash);
            setHashButtonCopied(true);

            setTimeout(() => {
              setHashButtonCopied(false);
            }, 2000); // 2s
          }}
          className='ml-auto p-1 h-5 w-[60px] font-mono text-xs text-muted-foreground'
        >
          {hashButtonCopied ? 'copied' : hash.slice(0, 7)}
        </Button>
      </div>
    </div>
  );
}

const preset = presets.offscreen();

async function SVG2PNG(
  svg: HTMLElement,
  callback: (x: OffscreenCanvas) => void
) {
  const canvas = new OffscreenCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  if (ctx == undefined) {
    console.log('2d context undefined');

    return;
  }

  const data = svg.outerHTML;
  const v = await Canvg.from(ctx, data, preset);
  v.resize(500, 500, 'xMidYMid meet');
  await v.render();

  callback(canvas);
}

function generateLink(fileName: string, data: string) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = data;
  return link;
}
