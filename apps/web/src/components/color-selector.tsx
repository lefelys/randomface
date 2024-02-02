import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export enum ColorPreset {
  Black = 'Black',
  White = 'White',
  Blue = 'Blue',
  Pink = 'Pink',
  Red = 'Red',
}

export interface Colors {
  foreground: `#${string}`;
  background: `#${string}`;
}

const presetToColor: Record<ColorPreset, Colors> = {
  [ColorPreset.Black]: { foreground: '#000000', background: '#ffffff' },
  [ColorPreset.White]: { foreground: '#ffffff', background: '#000000' },
  [ColorPreset.Blue]: { foreground: '#00539C', background: '#FFD662' },
  [ColorPreset.Pink]: { foreground: '#3C1053', background: '#DF6589' },
  [ColorPreset.Red]: { foreground: '#C91432', background: '#138636' },
};

interface ColorSelectorProps {
  callback?: (c: Colors) => void;
}

export function ColorSelector({ callback }: ColorSelectorProps) {
  const [toggleValue, setToggleValue] = useState(ColorPreset.Black);

  return (
    <ToggleGroup
      type='single'
      size='default'
      className='flex flex-wrap justify-start'
      value={toggleValue}
      onValueChange={(v: ColorPreset) => {
        // v CAN be undefined, type is wrong
        //
        // eslint-disable-next-line
        if (!v) return;
        setToggleValue(v);
        if (callback != undefined) callback(presetToColor[v]);
      }}
    >
      {Object.entries(presetToColor).map(([key, value]) => {
        return (
          <ToggleGroupItem
            value={String(key)}
            key={String(key)}
            className='p-1 w-9'
          >
            <CircleColors
              foreground={value.foreground}
              background={value.background}
            />
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}

function CircleColors({ foreground, background }: Colors) {
  return (
    <div
      className='rounded-sm h-6 w-6 relative border'
      style={{ backgroundColor: background }}
    >
      <div
        className='rounded-full h-3 w-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        style={{ backgroundColor: foreground }}
      />
    </div>
  );
}
